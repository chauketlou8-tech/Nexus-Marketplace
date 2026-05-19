import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetCourses:
    def __init__(self):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()

    def getCourses(self):
        response = requests.get(
            f"{self.address}/api/courses",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("courses", [])