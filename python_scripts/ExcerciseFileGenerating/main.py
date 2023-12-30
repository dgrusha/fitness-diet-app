from generate_file import generate_file_exercises
import mail_handler

if __name__ == '__main__':
    senders_files = generate_file_exercises()
    for sender in senders_files:
        mail_handler.send_mail_xlsx(
            send_from="eatrain@serwer2317506.home.pl",
            send_to=sender,
            file=senders_files[sender],
            subject="Exercise file",
            text="""
            We are sending to you a file with exercises that you ordered in your training page. We hope you will enjoy it :) 
            """
        )
