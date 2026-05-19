import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetUser:
    def __init__(self, user_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.user_id = user_id

    def getUser(self):
        response = requests.get(
            f"{self.address}/api/users/{self.user_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("user")