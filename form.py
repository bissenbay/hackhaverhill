from flask import Flask, request, render_template
from twilio.rest import Client

app = Flask(__name__)

account_sid = 'AC91103abac589e38ec084c51367b2315a'
auth_token = 'e124d98906ceff8273073ac85bb92c41'
client = Client(account_sid, auth_token)

@app.route('/')
def my_form():
    return render_template('my-form.html')

@app.route('/', methods=['POST'])
def my_form_post():
    client.messages.create(
        body = request.form['text'],
        from_ = '5155002738',
        to = '9784831084'
    )
    return 'nice'

if __name__ == '__main__':
    app.run(debug=True)