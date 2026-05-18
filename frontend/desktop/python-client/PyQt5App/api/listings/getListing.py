import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetListing:
    def __init__(self):
        self.session = SessionManager()
        self.address = address()
        self.token = self.session.get_token()