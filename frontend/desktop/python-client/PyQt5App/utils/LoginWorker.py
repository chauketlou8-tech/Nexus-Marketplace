from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.auth.loginUser import LoginUser


class LoginWorker(QThread):
    finished = pyqtSignal(dict)
    error = pyqtSignal(str)

    def __init__(self, email, password):
        super().__init__()
        self.email = email
        self.password = password

    def run(self):
        try:
            login_user = LoginUser(self.email, self.password)
            user = login_user.login()
            self.finished.emit(user)
        except Exception as e:
            self.error.emit(str(e))