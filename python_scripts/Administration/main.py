from Common import mail_handler
import admin_email_output_handler

if __name__ == '__main__':
    admins, result = admin_email_output_handler.run_admin_handler()
    if admins:
        mail_handler.send_mail(
            send_from="eatrain@serwer2317506.home.pl",
            send_to=admins,
            subject="Everyday feedback/coach update",
            text=result
        )
