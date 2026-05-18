import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class CreateProduct:
    def __init__(self, product):
        self.session = SessionManager()
        self.address = address()
        self.product = product
        self.token = self.session.get_token()

    def createProduct(self):
        requests.post(
            f"{self.address}/api/products",
            json={
                "product": self.product
            },
            headers={
                "Authorization": f"Bearer {self.token}"
            }
        )