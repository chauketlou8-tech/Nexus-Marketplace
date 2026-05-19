import requests
from PyQt5App.utils.Address import address

class GetCategory:
    def __init__(self, category_id):
        self.address = address()
        self.category_id = category_id

    def getCategory(self):
        response = requests.get(f"{self.address}/api/category/{self.category_id}")
        data = response.json()
        return data.get("slug")