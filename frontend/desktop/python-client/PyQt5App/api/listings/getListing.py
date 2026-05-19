import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetListing:
    def __init__(self, listing_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.listing_id = listing_id

    def getListing(self):
        response = requests.get(
            f"{self.address}/api/listings/{self.listing_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("listing")