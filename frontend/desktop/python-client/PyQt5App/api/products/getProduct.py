import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetProduct:
    def __init__(self, product_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.product_id = product_id

    def getProduct(self):
        response = requests.get(
            f"{self.address}/api/products/{self.product_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        print(data)
        return data.get("data", {})