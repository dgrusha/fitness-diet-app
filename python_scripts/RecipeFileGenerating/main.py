from generate_file import generate_file_recipes
import mail_handler

if __name__ == '__main__':
    senders_files = generate_file_recipes()
    for sender in senders_files:
        mail_handler.send_mail_xlsx(
            send_from="eatrain@serwer2317506.home.pl",
            send_to=sender,
            file=senders_files[sender],
            subject="Recipe file",
            text="""
            We are sending to you a file with recipes that you ordered in your diet page. We hope you will enjoy it :) 
            """
        )
