import sys
from PyQt5.QtWidgets import QApplication, QMainWindow

class AuthenticationPage(QMainWindow):
    def __init__(self):
        super().__init__()

def main():
    app = QApplication(sys.argv)
    window = AuthenticationPage()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()