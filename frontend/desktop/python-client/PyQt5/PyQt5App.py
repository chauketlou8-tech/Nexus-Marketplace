import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel

class NexusMarketplaceWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Nexus Marketplace App")
        self.setGeometry(600, 250, 900, 600)
        self.initUI()

    def initUI(self):
        welcome_label = QLabel("Welcome to the Nexus Marketplace python PyQt5 desktop App.", self)
        welcome_label.setGeometry(250, 100, 500, 100)

def main():
    app = QApplication(sys.argv)
    window = NexusMarketplaceWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()