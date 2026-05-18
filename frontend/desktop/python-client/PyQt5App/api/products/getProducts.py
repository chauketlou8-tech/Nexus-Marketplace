import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import sessionManager

class GetProducts:
    def __init__(self):
        self.address = address()
        self.sessionManager = sessionManager()
        self.token = self.sessionManager.get_token()

    def getProducts(self):
        response = requests.get(
            f"{self.address.address}/api/products",
            headers={
                "Authorization": f"{self.token}",
            }
        )

        data = response.json()
        products = data["products"]

        return products