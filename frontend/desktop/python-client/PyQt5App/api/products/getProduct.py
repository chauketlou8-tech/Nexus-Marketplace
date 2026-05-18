import requests
from PyQt5App.utils.Adress import address
from PyQt5App.utils.SessionManager import SessionManager

class GetProduct:
    def __init__(self, id_):
        self.session = SessionManager()
        self.address = address()
        self.token = self.session.get_token()
        self.id = id_

    def getProduct(self):
        response = requests.get(
            f"{self.address}/products/{self.id}",
            headers={"Authorization": f"Bearer {self.token}"},
        )

        data = response.json()
        return data["product"]