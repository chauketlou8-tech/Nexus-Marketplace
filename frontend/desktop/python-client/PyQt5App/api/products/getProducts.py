import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetProducts:
    def __init__(self):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()

    def getProducts(self):
        response = requests.get(
            f"{self.address}/api/products",
            headers={
                "Authorization": f"{self.token}",
            }
        )

        data = response.json()
        products = data["products"]

        return products