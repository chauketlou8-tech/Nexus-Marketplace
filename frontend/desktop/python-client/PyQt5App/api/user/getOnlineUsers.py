import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.SessionManager import SessionManager

class GetOnlineUsers:
    def __init__(self):
        self.address = address()
        self.session = SessionManager()
        self.token = self.session.get_token()