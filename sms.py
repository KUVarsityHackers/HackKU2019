from twilio.rest import Client


client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+13168064172",
    from_="+15012004626", 
    body="Michael has just redeemed his haricut. \n Thank you for improving Michael's hygeine.")

print(message.sid)
