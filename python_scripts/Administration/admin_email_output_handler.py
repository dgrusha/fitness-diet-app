import pyodbc
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import json


load_dotenv("../.env")

server = os.getenv("server")
database = os.getenv("database")
conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;'


def run_admin_handler():
    try:
        current_datetime = datetime.now()
        threshold_datetime = current_datetime - timedelta(days=1)
        admin_outputs = []
        conn = pyodbc.connect(conn_str)
        cursor = conn.cursor()

        # Feedbacks
        query = f"SELECT * FROM Ratings WHERE TimeSent < ? and TimeSent > ?"
        cursor.execute(query, current_datetime, threshold_datetime)
        feedbacks = cursor.fetchall()
        result_feedback = [{'IdFeedback': item[0], 'Rating': item[1], 'TextFeedback': item[2]} for item in feedbacks]
        admin_outputs.append(result_feedback)

        # Coaches not verified
        query = f"SELECT * FROM Coaches WHERE IsVerified = 0"
        cursor.execute(query)
        coaches = cursor.fetchall()
        result_coaches = [{'UserID': item[3], 'CV': item[2]} for item in coaches]
        admin_outputs.append(result_coaches)

        query = f"SELECT * FROM Users WHERE IsAdmin=1"
        cursor.execute(query)
        admins = cursor.fetchall()
        result_admins = [item[3] for item in admins]
        json_data = json.dumps(admin_outputs, indent=2)

        cursor.close()
        conn.close()

        return result_admins, json_data

    except Exception as e:
        print(str(e))
        print(f"ERROR IN GENERATING ADMIN OUTPUT HAPPENED {datetime.now()}")
        return None, None