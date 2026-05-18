import requests
from PyQt5App.utils.sessionManager import SessionManager
from PyQt5App.utils.Address import address

class GetServices:
    def __init__(self):
        self.session = SessionManager()
        self.token = self.session.get_token()
        self.address = address()

    def getService(self):
        response = requests.get(
            f"{self.address}/api/services",
            headers={"Authorization": f"Bearer {self.token}"}
        )

        data = response.json()
        return data["services"]