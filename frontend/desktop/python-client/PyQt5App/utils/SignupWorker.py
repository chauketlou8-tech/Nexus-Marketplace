from PyQt5.QtCore import Thread, pyqtSignal
from PyQt5App.api.auth.createUser import CreateUser

class SignupWorker(QThread):
    finished = pyqtSignal(str)
    error = pyqtSignal(str)

    def __init__(self, name, email, password, year):
        super().__init__()
        self.name = name
        self.email = email
        self.password = password
        self.year = year

    def run(self):
        try:
            create_user = CreateUser(self.name, self.email, self.password, self.year)
            user = create_user.create()
            self.finished.emit(user)
        except Exception as e:
            self.error.emit(str(e))