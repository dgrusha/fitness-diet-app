import csv
import requests
import os
from dotenv import load_dotenv

csv_file = 'trainingMode.csv'
load_dotenv("../.env")
api_url = os.getenv("training_mode_add_url")
bearer_token = os.getenv("bearer_token")

if __name__ == '__main__':
    try:
        password = os.getenv("pass_edit")
        with open(csv_file, newline='', mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            for row in reader:
                csv_row = row[0]
                if csv_row and csv_row != "":
                    data = {
                        "name": csv_row
                    }
                    params = {
                        "passEdit": str(password)
                    }
                    headers = {
                        "Authorization": f"Bearer {bearer_token}"
                    }
                    response = requests.post(api_url, json=data, params=params, headers=headers, verify=False)
                    if response.status_code == 200:
                        print("POST request was successful!")
                        print("Response:", response.text)
                    else:
                        print("POST request failed with status code:", response.status_code)
                        print("Response:", response.text)
    except FileNotFoundError:
        print(f"The file '{csv_file}' was not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")