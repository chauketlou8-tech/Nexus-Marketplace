from tkinter import Frame
from tkinterApp.components.Authentication.LoginPage import LoginPage
from tkinterApp.components.Authentication.SignupPage import SignUpPage


class AuthenticationPage(Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.login_page = LoginPage(self, controller)
        self.signup_page = SignUpPage(self, controller)

        self.login_page.place(x=0, y=0, width=1100, height=700)
        self.signup_page.place(x=0, y=0, width=1100, height=700)

        self.login_page.tkraise()

        self.login_page.signup_clicked = self.show_signup
        self.signup_page.login_clicked = self.show_login

    def show_login(self):
        self.login_page.tkraise()

    def show_signup(self):
        self.signup_page.tkraise()