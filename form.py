from flask import Flask, request, render_template
from twilio.rest import Client

app = Flask(__name__)

account_sid = 'account_sid'
auth_token = 'auth_token'
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