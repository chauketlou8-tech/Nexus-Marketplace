import sys
from PyQt5.QtWidgets import QApplication, QWidget, QStackedWidget, QVBoxLayout
from PyQt5.QtCore import Qt, pyqtSignal
from PyQt5App.components.Authentication.LoginPage import LoginPage
from PyQt5App.components.Authentication.SignUpPage import SignUpPage

class AuthenticationPage(QWidget):
    login_successful = pyqtSignal(object)

    def __init__(self):
        super().__init__()

        layout = QVBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        self.stacked_widget = QStackedWidget()
        self.stacked_widget.setContentsMargins(0, 0, 0, 0)

        layout.addWidget(self.stacked_widget)
        self.setLayout(layout)

        self.login_page = LoginPage()
        self.signup_page = SignUpPage()

        self.login_page.setWindowFlags(Qt.Widget)
        self.signup_page.setWindowFlags(Qt.Widget)

        self.login_page.signup_clicked.connect(self.switch_to_signup)
        self.login_page.login_successful.connect(self.on_login_success)
        self.signup_page.login_clicked.connect(self.switch_to_login)
        self.signup_page.signup_successful.connect(lambda user_data: self.login_successful.emit(user_data))

        self.stacked_widget.addWidget(self.login_page)
        self.stacked_widget.addWidget(self.signup_page)

        self.current_page = "login"
        self.stacked_widget.setCurrentWidget(self.login_page)

    def on_login_success(self, user_data):
        self.login_successful.emit(user_data)

    def switch_to_login(self):
        self.stacked_widget.setCurrentWidget(self.login_page)
        self.current_page = "login"

    def switch_to_signup(self):
        self.stacked_widget.setCurrentWidget(self.signup_page)
        self.current_page = "signup"