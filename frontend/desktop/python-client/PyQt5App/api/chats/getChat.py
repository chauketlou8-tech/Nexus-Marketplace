import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetChat:
    def __init__(self, chat_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.chat_id = chat_id

    def getChat(self):
        response = requests.get(
            f"{self.address}/api/chats/{self.chat_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("chat", {})