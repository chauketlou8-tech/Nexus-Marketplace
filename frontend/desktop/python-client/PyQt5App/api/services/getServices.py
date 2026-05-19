import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetServices:
    def __init__(self):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()

    def getServices(self):
        response = requests.get(
            f"{self.address}/api/services",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("services", [])