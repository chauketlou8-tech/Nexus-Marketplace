import requests
from PyQt5App.utils.Address import address
from PyQt5App.utils.sessionManager import SessionManager

class GetCourse:
    def __init__(self, course_id):
        self.address = address()
        self.sessionManager = SessionManager()
        self.token = self.sessionManager.get_token()
        self.course_id = course_id

    def getCourse(self):
        response = requests.get(
            f"{self.address}/api/courses/{self.course_id}",
            headers={
                "Authorization": f"{self.token}",
            }
        )
        data = response.json()
        return data.get("course")