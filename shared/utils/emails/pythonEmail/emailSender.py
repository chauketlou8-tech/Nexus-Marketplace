import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "../../../../.env"))

msg = EmailMessage()
msg["Subject"] = "Test Email"
msg["From"] = os.getenv("EMAIL_USER")
msg["To"] = "chktlo003@myuct.ac.za"
msg.set_content("This is a test pythonEmail from Python.")

with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
    server.send_message(msg)

print("Email sent!")