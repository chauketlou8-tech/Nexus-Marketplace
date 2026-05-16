from tkinter import Tk, Frame
from ..components.Authentication.LoginPage import LoginPage
from ..components.Authentication.SignUpPage import SignUpPage


class Authentication(Tk):
    def __init__(self):
        super().__init__()
        self.title("Nexus Marketplace")
        self.geometry("1000x600")
        self.resizable(False, False)

        self.container = Frame(self)
        self.container.pack(fill="both", expand=True)

        self.frames = {}

        for F in (LoginPage, SignUpPage):
            page_name = F.__name__
            frame = F(self.container, self)
            self.frames[page_name] = frame
            frame.grid(row=0, column=0, sticky="nsew")

        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(0, weight=1)

        self.show_frame("LoginPage")

    def show_frame(self, page_name):
        frame = self.frames[page_name]
        frame.tkraise()


def main():
    app = Authentication()
    app.mainloop()


if __name__ == "__main__":
    main()