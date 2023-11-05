import smtplib
import ssl
import time
from datetime import datetime
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_email_yahoo(subject, message_body,
                     my_email, my_email_pass,
                     target_emails, private_or_group,
                     attachment,
                     attachment_file, attachment_assign_name):
    notification_email_date = datetime.now().strftime(' %d.%m.%Y %H-%M-%S')
    context = ssl.create_default_context()

    if private_or_group == 'private':
        for target_email in target_emails:
            with smtplib.SMTP_SSL("smtp.mail.yahoo.com", 465, context=context) as server:
                server.starttls(context=context)
                server.login(my_email, my_email_pass)
                message = MIMEMultipart("alternative")
                message["Subject"] = subject
                message["From"] = my_email
                message["To"] = target_email
                part = MIMEText(message_body, "plain")
                message.attach(part)

                if attachment:
                    part = MIMEBase('application', "octet-stream")
                    part.set_payload(open(attachment_file, "rb").read())
                    encoders.encode_base64(part)
                    part.add_header('Content-Disposition', 'attachment; filename=%s' % (attachment_assign_name))
                    message.attach(part)

                server.sendmail(my_email, target_email, message.as_string())
                server.quit()
                print('private email sent to', message["To"])
                time.sleep(2)

    elif private_or_group == 'group':
        with smtplib.SMTP_SSL("smtp.mail.yahoo.com", 465, context=context) as server:
            server.login(my_email, my_email_pass)
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = my_email
            message["To"] = ', '.join(target_emails)
            part = MIMEText(message_body, "plain")
            message.attach(part)

            if attachment:
                part = MIMEBase('application', "octet-stream")
                part.set_payload(open(attachment_file, "rb").read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', 'attachment; filename=%s' % (attachment_assign_name))
                message.attach(part)

            server.sendmail(my_email, target_emails, message.as_string())
            server.quit()
            print('group email sent to', message["To"])
            time.sleep(2)
