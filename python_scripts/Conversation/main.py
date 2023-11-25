from Common import mail_handler
import pdf_handler

if __name__ == '__main__':
    reports = pdf_handler.run_pdf_handler()
    for report in reports:
        mail_handler.send_mail(
            send_from="eatrain@serwer2317506.home.pl",
            send_to=report["senders"],
            file="./pdfs/"+report["file"],
            subject="Conversation report",
            text="""
            We are sending to you conversation report that was expired according to our expiration policy. 
            You can find expiration policy on the chat page.
            """
        )
