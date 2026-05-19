import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class CreateMessage:
    def __init__(self, message, chat_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.message = message
        self.chat_id = chat_id

    def createMessage(self):
        response = requests.post(
            f"{self.address}/api/messages",
            json={
                "message": self.message,
                "chatId": self.chat_id
            },
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("message", {})