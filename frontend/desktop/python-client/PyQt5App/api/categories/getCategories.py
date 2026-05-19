import requests
from PyQt5App.utils.Address import address

class GetCategories:
    def __init__(self):
        self.address = address()

    def getCategories(self):
        response = requests.get(f"{self.address}/api/category")
        data = response.json()
        return data.get("categories", [])