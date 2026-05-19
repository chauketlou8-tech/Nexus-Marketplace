import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetService:
    def __init__(self, service_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.service_id = service_id

    def getService(self):
        response = requests.get(
            f"{self.address}/api/services/{self.service_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("service", {})