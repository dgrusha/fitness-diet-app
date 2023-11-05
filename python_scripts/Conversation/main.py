import email_handler

if __name__ == '__main__':
    subject = 'Email Subject'

    message_body = """\
    Dear Mr. Ms. 
    Email body line 1.
    Email body line 2.
    Best regards
    Mr. X
    ."""

    private_or_group = 'group'  # 'group 'or 'private'

    attachment = True
    attachment_file = "./mdpdf.log"
    attachment_assign_name = 'mdpdf.log'

    my_email = 'ceatrain@yahoo.com'
    my_email_pass = 'password'

    target_emails = ['dima23grushevskiy@gmail.com']

    email_handler.send_email_yahoo(subject, message_body,
                     my_email, my_email_pass,
                     target_emails, private_or_group,
                     attachment,
                     attachment_file, attachment_assign_name)