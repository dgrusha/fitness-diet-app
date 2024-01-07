import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formatdate
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv("../.env")
password_email = os.getenv("password_email")


def send_mail(
        send_from,
        send_to,
        subject,
        text,
        file=None,
        server="serwer2317506.home.pl",
        port=465,
        username="eatrain@serwer2317506.home.pl",
        password=password_email
):
    to_repondents = ",".join(send_to)
    msg = MIMEMultipart()
    msg["From"] = send_from
    msg["To"] = to_repondents
    msg["Date"] = formatdate(localtime=True)
    msg["Subject"] = subject
    msg.attach(MIMEText(text))

    if file:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(open(file, "rb").read())
        encoders.encode_base64(part)
        now = datetime.now()
        current_date = now.strftime("%Y_%m_%d")
        part.add_header("Content-Disposition", f'attachment; filename="{current_date}_{to_repondents}.pdf"')
        msg.attach(part)

    smtp = smtplib.SMTP_SSL(server, port)

    smtp.ehlo()

    smtp.login(username, password)
    smtp.sendmail("eatrain@serwer2317506.home.pl", send_to, msg.as_string())
    smtp.close()


def send_mail_xlsx(
        send_from,
        send_to,
        subject,
        text,
        file=None,
        server="serwer2317506.home.pl",
        port=465,
        username="eatrain@serwer2317506.home.pl",
        password=password_email
):
    msg = MIMEMultipart()
    msg["From"] = send_from
    msg["To"] = send_to
    msg["Date"] = formatdate(localtime=True)
    msg["Subject"] = subject
    msg.attach(MIMEText(text))
    if file:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(open(file, "rb").read())
        encoders.encode_base64(part)
        now = datetime.now()
        current_date = now.strftime("%Y_%m_%d")
        part.add_header("Content-Disposition", f'attachment; filename="{current_date}_recipe_file.xlsx"')
        msg.attach(part)

    smtp = smtplib.SMTP_SSL(server, port)

    smtp.ehlo()

    smtp.login(username, password)
    smtp.sendmail("eatrain@serwer2317506.home.pl", send_to, msg.as_string())
    smtp.close()