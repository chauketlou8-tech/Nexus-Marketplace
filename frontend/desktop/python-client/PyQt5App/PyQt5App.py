import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QStackedWidget, QVBoxLayout, QWidget
from PyQt5.QtCore import Qt
from PyQt5App.Pages.Authentication import AuthenticationPage
from PyQt5App.Pages.Home import HomePage


class NexusMarketplaceWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Nexus Marketplace App")
        self.setGeometry(600, 250, 1000, 700)
        self.setFixedSize(1000, 700)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)

        layout = QVBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)
        central_widget.setLayout(layout)

        self.stacked_widget = QStackedWidget()
        layout.addWidget(self.stacked_widget)

        self.authentication_page = AuthenticationPage()
        self.home_page = None
        self.user_data = None

        self.stacked_widget.addWidget(self.authentication_page)

        self.stacked_widget.setCurrentWidget(self.authentication_page)

        self.authentication_page.login_successful.connect(self.create_and_switch_to_home)

    def create_and_switch_to_home(self, user_data=None):
        self.user_data = user_data
        if self.home_page is None:
            self.home_page = HomePage(self.user_data)
            self.stacked_widget.addWidget(self.home_page)
        self.stacked_widget.setCurrentWidget(self.home_page)


def main():
    app = QApplication(sys.argv)
    window = NexusMarketplaceWindow()
    window.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()