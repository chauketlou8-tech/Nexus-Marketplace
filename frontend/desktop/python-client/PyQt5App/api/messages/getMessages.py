import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetMessages:
    def __init__(self, chat_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.chat_id = chat_id

    def getMessages(self):
        response = requests.get(
            f"{self.address}/api/messages/{self.chat_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("messages", [])