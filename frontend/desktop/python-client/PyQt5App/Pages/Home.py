from PyQt5.QtWidgets import QWidget, QHBoxLayout, QVBoxLayout, QPushButton, QStackedWidget, QFrame, QLabel, QLineEdit
from PyQt5.QtCore import Qt, pyqtSignal
from PyQt5.QtGui import QFont
from PyQt5App.components.Home.Marketplace import Marketplace
from PyQt5App.components.Home.Services import Services
from PyQt5App.components.Home.MyListings import MyListings
from PyQt5App.components.Home.Messages import Messages


class HomePage(QWidget):
    logout_clicked = pyqtSignal()

    def __init__(self, user_data=None):
        super().__init__()
        self.user_data = user_data
        self.pages = {}
        self.applyStyles()
        self.initUI()

    def applyStyles(self):
        self.setStyleSheet("""
            QWidget {
                background-color: #f5f5f5;
                font-family: 'Segoe UI', sans-serif;
            }
            QPushButton {
                border: none;
                padding: 8px 16px;
                font-weight: normal;
                font-size: 13px;
                border-radius: 6px;
            }
            QPushButton:hover {
                background-color: #e0e0e0;
            }
            QLineEdit {
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 8px 16px;
                font-size: 13px;
                background-color: white;
            }
            QLineEdit:focus {
                border: 1px solid #3b82f6;
            }
        """)

        self.sidebar_style = """
            QFrame {
                background-color: white;
                border-right: 1px solid #ddd;
            }
        """

        self.nav_button_style = """
            QPushButton {
                text-align: left;
                padding: 12px 16px;
                background-color: transparent;
                color: #555;
                border-radius: 0;
            }
            QPushButton:hover {
                background-color: #f0f0f0;
            }
        """

        self.nav_button_active_style = """
            QPushButton {
                text-align: left;
                padding: 12px 16px;
                background-color: #e0e0e0;
                color: #000;
                font-weight: bold;
                border-radius: 0;
            }
        """

        self.logout_button_style = """
            QPushButton {
                color: #dc2626;
                padding: 12px 16px;
                margin-top: 10px;
                text-align: left;
                border-radius: 0;
            }
        """

    def initUI(self):
        layout = QHBoxLayout()
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        sidebar = QFrame()
        sidebar.setFixedWidth(200)
        sidebar.setStyleSheet(self.sidebar_style)
        sidebar_layout = QVBoxLayout()
        sidebar_layout.setContentsMargins(0, 20, 0, 20)
        sidebar_layout.setSpacing(0)

        logo = QLabel("Nexus")
        logo.setFont(QFont("Segoe UI", 16, QFont.Bold))
        logo.setStyleSheet("padding: 16px; color: #333;")
        sidebar_layout.addWidget(logo)

        self.nav_buttons = {}
        nav_items = ["Marketplace", "Services", "My Listings", "Messages", "Profile"]

        for item in nav_items:
            btn = QPushButton(item)
            btn.setCursor(Qt.PointingHandCursor)
            btn.setStyleSheet(self.nav_button_style)
            btn.clicked.connect(lambda checked, x=item: self.switch_content(x))
            sidebar_layout.addWidget(btn)
            self.nav_buttons[item] = btn

        sidebar_layout.addStretch()

        logout_btn = QPushButton("Logout")
        logout_btn.setCursor(Qt.PointingHandCursor)
        logout_btn.setStyleSheet(self.logout_button_style)
        logout_btn.clicked.connect(self.logout_clicked.emit)
        sidebar_layout.addWidget(logout_btn)

        sidebar.setLayout(sidebar_layout)

        right_area = QWidget()
        right_area.setStyleSheet("background-color: #f5f5f5;")
        right_layout = QVBoxLayout()
        right_layout.setContentsMargins(0, 0, 0, 0)
        right_layout.setSpacing(0)

        header = QFrame()
        header.setFixedHeight(70)
        header.setStyleSheet("background-color: white; border-bottom: 1px solid #ddd;")
        header_layout = QHBoxLayout()
        header_layout.setContentsMargins(24, 0, 24, 0)

        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search textbooks, items, services...")
        self.search_input.setFixedWidth(400)

        user_label = QLabel(f"Welcome, {self.user_data.get('name', 'User') if self.user_data else 'User'}")
        user_label.setStyleSheet("color: #333; font-size: 13px;")

        header_layout.addWidget(self.search_input)
        header_layout.addStretch()
        header_layout.addWidget(user_label)

        header.setLayout(header_layout)

        self.content_stack = QStackedWidget()
        self.content_stack.setStyleSheet("background-color: #f5f5f5;")

        for item in nav_items:
            if item == "Marketplace":
                page = Marketplace(self.user_data)
            elif item == "Services":
                page = Services(self.user_data, self.search_input)
            elif item == "My Listings":
                page = MyListings(self.user_data)
            elif item == "Messages":
                page = Messages(self.user_data)
            else:
                page = QWidget()
                page_layout = QVBoxLayout()
                label = QLabel(item)
                label.setFont(QFont("Segoe UI", 24))
                label.setStyleSheet("color: #333;")
                label.setAlignment(Qt.AlignCenter)
                page_layout.addWidget(label)
                page.setLayout(page_layout)

            self.content_stack.addWidget(page)
            self.pages[item] = page

        right_layout.addWidget(header)
        right_layout.addWidget(self.content_stack, 1)
        right_area.setLayout(right_layout)

        layout.addWidget(sidebar)
        layout.addWidget(right_area, 1)

        self.setLayout(layout)

        self.switch_content("Marketplace")

    def switch_content(self, content_name):
        for name, btn in self.nav_buttons.items():
            if name == content_name:
                btn.setStyleSheet(self.nav_button_active_style)
            else:
                btn.setStyleSheet(self.nav_button_style)

        if content_name in self.pages:
            self.content_stack.setCurrentWidget(self.pages[content_name])