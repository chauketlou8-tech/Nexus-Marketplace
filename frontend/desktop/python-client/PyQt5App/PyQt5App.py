import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QStackedWidget, QVBoxLayout, QWidget
from PyQt5.QtCore import Qt
from PyQt5App.Pages.Authentication import AuthenticationPage
from PyQt5App.Pages.Home import HomePage


class NexusMarketplaceWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Nexus Marketplace App")
        self.setGeometry(600, 250, 900, 600)
        self.setFixedSize(900, 600)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        layout = QVBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)
        central_widget.setLayout(layout)

        self.stacked_widget = QStackedWidget()
        layout.addWidget(self.stacked_widget)

        self.authentication_page = AuthenticationPage()
        self.home_page = HomePage()

        self.stacked_widget.addWidget(self.authentication_page)
        self.stacked_widget.addWidget(self.home_page)

        self.stacked_widget.setCurrentWidget(self.authentication_page)

        self.authentication_page.login_successful.connect(self.switch_to_home)

    def switch_to_home(self):
        self.stacked_widget.setCurrentWidget(self.home_page)


def main():
    app = QApplication(sys.argv)
    window = NexusMarketplaceWindow()
    window.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()