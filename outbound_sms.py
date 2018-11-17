from twilio.rest import Client

# account sid
account_sid = 'AC91103abac589e38ec084c51367b2315a'
# auth token
auth_token = 'e124d98906ceff8273073ac85bb92c41'
client = Client(account_sid, auth_token)

message = client.messages.create(
     # text body
     body='MESSAGE',
     # twilio number
     from_='5155002738',
     # receiver number
     to='9784831084'
)

print(message.sid)