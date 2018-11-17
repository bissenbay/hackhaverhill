from twilio.rest import Client

# account sid
account_sid = 'ACCOUNT_SID'
# auth token
auth_token = 'AUTH_TOKEN'
client = Client(account_sid, auth_token)

message = client.messages.create(
     # text body
     body='MESSAGE',
     # trello number
     from_='TRELLO_NUMBER',
     # receiver number
     to='RECEIVER_NUMBER'
)

print(message.sid)