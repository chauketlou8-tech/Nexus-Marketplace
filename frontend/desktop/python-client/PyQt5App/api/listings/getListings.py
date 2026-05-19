import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetListings:
    def __init__(self):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()

    def getListings(self):
        response = requests.get(
            f"{self.address}/api/listings",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("listings", [])