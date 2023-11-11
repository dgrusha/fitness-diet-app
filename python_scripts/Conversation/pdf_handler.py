import pyodbc
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import subprocess
import glob


load_dotenv("../.env")

server = os.getenv("server")
database = os.getenv("database")
conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'


def run_pdf_handler():
    try:
        conversation_reports = []
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()

        current_datetime = datetime.now()
        threshold_datetime = current_datetime - timedelta(days=2)

        files = glob.glob('./pdfs/*')
        for f in files:
            os.remove(f)

        query = f"SELECT * FROM Conversations WHERE TimeCreated < ?"
        cursor.execute(query, threshold_datetime)
        conversations = cursor.fetchall()

        for conversation in conversations:
            markdown_filename = f"./pdfs/conversation_report_{conversation.Id}.md"
            with open(markdown_filename, 'w') as markdown_file:
                conversation_id = conversation.Id

                senders_query = f"SELECT DISTINCT(SenderId) FROM Messages WHERE ConversationId = ?"
                cursor.execute(senders_query, conversation_id)
                senders = cursor.fetchall()
                senders_dict = {}
                for item in senders:
                    email_query = f"SELECT DISTINCT(email) FROM Users WHERE Id = ?"
                    cursor.execute(email_query, item[0])
                    email = cursor.fetchall()
                    senders_dict[item[0]] = email[0][0]

                print(senders_dict)
                message_query = f"SELECT * FROM Messages WHERE ConversationId = ? ORDER BY TimeSent"
                cursor.execute(message_query, conversation_id)
                messages = cursor.fetchall()

                markdown_file.write(f"# Conversation Report\n\n")
                markdown_file.write(f"## Conversation ID: {conversation_id}\n")
                markdown_file.write(f"## **Time Created:** {conversation.TimeCreated}\n\n")
                markdown_file.write(f"### **Messages**:\n")

                for message in messages:
                    markdown_file.write(f'- **{message.TimeSent.strftime("%Y-%m-%d %H:%M:%S")} |'
                                        f'{senders_dict[message.SenderId]}**: {message.Text}\n')

            markdown_filename = f'./pdfs/conversation_report_{conversation.Id}.md'
            output_pdf = f'./pdfs/conversation_report_{conversation.Id}.pdf'

            subprocess.run(['mdpdf', '-o', output_pdf, markdown_filename])

            conversation_info = {
                'senders': list(senders_dict.values()),
                'file': f'conversation_report_{conversation.Id}.pdf'
            }
            conversation_reports.append(conversation_info)

        query = f"DELETE FROM Conversations WHERE TimeCreated < ?"
        cursor.execute(query, threshold_datetime)
        cursor.commit()

        cursor.close()
        conn.close()

        return conversation_reports
    except Exception as e:
        print(str(e))
        print(f"ERROR IN GENERATING PDFS HAPPENED {datetime.now()}")
        return []






