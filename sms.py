from twilio.rest import Client

# Your Account SID from twilio.com/console
account_sid = "AC81d02543e6fda0c44a977753c167e811"
# Your Auth Token from twilio.com/console
auth_token  = "b3fdab5ec0024c7807e243237f8572a4"

client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+13168064172",
    from_="+15012004626", 
    body="Michael has just redeemed his haricut. \n Thank you for improving Michael's hygeine.")

print(message.sid)