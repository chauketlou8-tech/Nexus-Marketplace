import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class DeleteListing:
    def __init__(self, listing_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.listing_id = listing_id

    def deleteListing(self):
        response = requests.delete(
            f"{self.address}/api/listings/{self.listing_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        return response.status_code == 200