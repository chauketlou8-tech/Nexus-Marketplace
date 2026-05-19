import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class DeleteProduct:
    def __init__(self, product_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.product_id = product_id

    def deleteProduct(self):
        response = requests.delete(
            f"{self.address}/api/products/{self.product_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        return response.status_code == 200