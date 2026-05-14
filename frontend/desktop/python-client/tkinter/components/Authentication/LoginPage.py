from tkinter import Tk

class LoginPage(Tk):
    def __init__(self):
        super().__init__()
        self.title("Nexus Marketplace")
        self.geometry("900x600")

def main():
    window = LoginPage()
    window.mainloop()

if __name__ == '__main__':
    main()