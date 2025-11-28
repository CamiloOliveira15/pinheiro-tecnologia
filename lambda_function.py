import json
import boto3
import uuid
import datetime
import time
import os
from decimal import Decimal
from botocore.exceptions import ClientError

# Inicializa clientes AWS
dynamodb = boto3.resource('dynamodb')
ses = boto3.client('ses')

# CONFIGURAÇÕES (Apenas tabelas de contato e rate limit)
CONTACTS_TABLE_NAME = os.environ.get('TABLE_CONTACTS', "PinheiroContacts")
RATE_LIMIT_TABLE_NAME = os.environ.get('TABLE_RATE', "PinheiroRateLimit")

# E-MAILS (Substitua pelos seus ou use variáveis de ambiente)
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', "camilo@pinheirotecnologia.com")
RECEIVER_EMAIL = os.environ.get('RECEIVER_EMAIL', "camilo@pinheirotecnologia.com")

# LIMITES DE SEGURANÇA
MAX_DAILY_SUBMISSIONS = 3
MAX_OPEN_TICKETS = 5
MAX_MESSAGE_LENGTH = 2000 

def lambda_handler(event, context):
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", # Em produção, configure isso no API Gateway ou aqui
        "Access-Control-Allow-Methods": "POST, OPTIONS", # Apenas POST é necessário agora
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept"
    }

    # Tratamento CORS Pre-flight (OPTIONS)
    if event.get('httpMethod') == 'OPTIONS' or (event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS'):
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps('')}

    try:
        # Normalização do Path
        path = event.get('rawPath') or event.get('path')
        
        # Normalização do Método e IP
        request_context = event.get('requestContext', {})
        if request_context.get('http'):
             method = request_context['http']['method']
             source_ip = request_context['http']['sourceIp']
        else:
             method = event.get('httpMethod')
             source_ip = request_context.get('identity', {}).get('sourceIp', 'unknown')

        # Parse do Body
        request_json = {}
        if event.get('body'):
            try:
                request_json = json.loads(event['body'])
            except json.JSONDecodeError:
                print(f"Erro de Parse JSON do IP {source_ip}")
                return {
                    'statusCode': 400, 
                    'body': json.dumps({"error": "Dados inválidos"}), 
                    'headers': headers
                }

        # ==========================================
        # ROTA ÚNICA: POST /contact
        # ==========================================
        if path == "/contact" and method == "POST":
            contacts_table = dynamodb.Table(CONTACTS_TABLE_NAME)

            # 1. Validação e Sanitização
            name = str(request_json.get('name', 'Anônimo'))[:100]
            email = str(request_json.get('email', '')).lower().strip()[:100]
            subject = str(request_json.get('subject', 'Sem assunto'))[:150]
            message = str(request_json.get('message', ''))[:MAX_MESSAGE_LENGTH]

            if not email or "@" not in email:
                return {
                    'statusCode': 400,
                    'body': json.dumps({"error": "E-mail inválido"}),
                    'headers': headers
                }

            # 2. Rate Limit Técnico (IP) - Leitura
            today_str = datetime.datetime.utcnow().strftime('%Y-%m-%d')
            rate_key = f"{source_ip}#{today_str}"
            
            if get_current_usage(rate_key) >= MAX_DAILY_SUBMISSIONS:
                return {
                    'statusCode': 429,
                    'body': json.dumps({
                        "error": "Limite excedido", 
                        "message": "Limite diário de envios atingido. Tente novamente amanhã."
                    }),
                    'headers': headers
                }

            # 3. Verificação de Negócio (Histórico do E-mail)
            open_count = count_open_messages(email, contacts_table)
            if open_count >= MAX_OPEN_TICKETS:
                return {
                    'statusCode': 429,
                    'body': json.dumps({
                        "error": "Muitas mensagens",
                        "message": f"Você possui {open_count} mensagens pendentes. Aguarde nosso retorno."
                    }),
                    'headers': headers
                }

            # 4. Processamento (Salvar + E-mail)
            try:
                contact_id = str(uuid.uuid4())
                timestamp = datetime.datetime.utcnow().isoformat()
                
                contact_item = {
                    'id': contact_id,
                    'createdAt': timestamp,
                    'name': name,
                    'email': email,
                    'subject': subject,
                    'message': message,
                    'status': "NEW",
                    'ip': source_ip
                }
                contacts_table.put_item(Item=contact_item)

                # Envio de E-mail
                email_status = "Não enviado"
                try:
                    send_email_notification(name, email, subject, message, open_count + 1)
                    email_status = "Enviado"
                except ClientError as e:
                    print(f"Erro SES: {e}")
                    email_status = "Erro interno no envio"

                # SUCESSO: Incrementa contador
                increment_usage(rate_key)

                return {
                    'statusCode': 200,
                    'body': json.dumps({
                        "message": "Mensagem recebida com sucesso!", 
                        "id": contact_id
                    }),
                    'headers': headers
                }

            except Exception as e:
                print(f"Erro ao salvar contato: {e}")
                return {
                    'statusCode': 500,
                    'body': json.dumps({"error": "Erro ao processar sua mensagem. Tente novamente."}),
                    'headers': headers
                }
        
        else:
            # Qualquer outra rota ou método retorna 404
            return {
                'statusCode': 404,
                'body': json.dumps({"error": "Rota não encontrada"}),
                'headers': headers
            }

    except Exception as e:
        print(f"CRITICAL ERROR: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({"error": "Erro interno do servidor"}),
            'headers': headers
        }

# --- FUNÇÕES AUXILIARES ---

def get_current_usage(rate_key):
    """Lê o contador atual sem incrementar"""
    table = dynamodb.Table(RATE_LIMIT_TABLE_NAME)
    try:
        response = table.get_item(Key={'ip_date': rate_key})
        if 'Item' in response:
            return int(response['Item'].get('submission_count', 0))
        return 0
    except ClientError:
        return 0

def increment_usage(rate_key):
    """Incrementa o contador (Chamado apenas após sucesso)"""
    table = dynamodb.Table(RATE_LIMIT_TABLE_NAME)
    try:
        table.update_item(
            Key={'ip_date': rate_key},
            UpdateExpression="SET #count = if_not_exists(#count, :start) + :inc, #exp = :ttl",
            ExpressionAttributeNames={'#count': 'submission_count', '#exp': 'expire_at'},
            ExpressionAttributeValues={':inc': 1, ':start': 0, ':ttl': int(time.time()) + 86400}
        )
    except ClientError as e:
        print(f"Erro ao incrementar rate limit: {e}")

def count_open_messages(email, table):
    if not email: return 0
    try:
        # Requer GSI 'EmailStatusIndex' na tabela PinheiroContacts
        from boto3.dynamodb.conditions import Key
        response = table.query(
            IndexName='EmailStatusIndex',
            KeyConditionExpression=Key('email').eq(email) & Key('status').eq('NEW'),
            Select='COUNT'
        )
        return response['Count']
    except ClientError:
        return 0

def send_email_notification(name, email, subject, message, count):
    email_body = f"""
    Nova mensagem recebida!
    ----------------------------------------
    Nome: {name}
    E-mail: {email}
    Assunto: {subject}
    Histórico: {count}ª mensagem em aberto deste usuário.
    ----------------------------------------
    Mensagem:
    {message}
    """
    ses.send_email(
        Source=SENDER_EMAIL,
        Destination={'ToAddresses': [RECEIVER_EMAIL]},
        Message={
            'Subject': {'Data': f"Contato: {subject}", 'Charset': 'UTF-8'},
            'Body': {'Text': {'Data': email_body, 'Charset': 'UTF-8'}}
        }
    )