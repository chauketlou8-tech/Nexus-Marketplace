import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout, QHBoxLayout, QFrame
from PyQt5.QtCore import Qt, pyqtSignal, QTimer
from ...utils.LoginWorker import LoginWorker
import keyboard

class LoginPage(QWidget):
    signup_clicked = pyqtSignal()
    login_successful = pyqtSignal(object)

    def __init__(self):
        super().__init__()
        self.login_worker = None
        self.error_timer = QTimer()
        self.error_timer.setSingleShot(True)
        self.error_timer.timeout.connect(self.clear_message)
        self.applyStyles()
        self.initUI()

    def applyStyles(self):
        self.setStyleSheet("""
            QWidget {
                background-color: #f0f2f5;
                font-family: 'Segoe UI', 'Arial', sans-serif;
            }
            QLabel {
                border: none;
                outline: none;
            }
        """)

        self.card_style = """
            QFrame {
                background-color: white;
                border: none;
            }
        """

        self.title_style = """
            font-size: 30px;
            font-weight: 600;
            color: #111827;
            border: none;
        """

        self.subtitle_style = """
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 30px;
            border: none;
        """

        self.field_label_style = """
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 6px;
            border: none;
        """

        self.input_style = """
            QLineEdit {
                padding: 10px 12px;
                font-size: 14px;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                background-color: white;
                color: #111827;
            }
            QLineEdit:focus {
                border: 1px solid #3b82f6;
            }
        """

        self.button_style = """
            QPushButton {
                padding: 10px 16px;
                font-size: 14px;
                font-weight: 500;
                border-radius: 4px;
                background-color: #3b82f6;
                color: white;
                border: none;
            }
            QPushButton:hover {
                background-color: #2563eb;
            }
        """

        self.link_style = """
            color: #3b82f6;
            font-size: 13px;
            border: none;
        """

    def initUI(self):
        main_layout = QHBoxLayout()
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        branding_widget = QFrame()
        branding_widget.setStyleSheet("background-color: #1e40af; border: none;")
        branding_layout = QVBoxLayout()
        branding_layout.setContentsMargins(50, 60, 50, 60)

        brand_name = QLabel("Nexus Marketplace")
        brand_name.setStyleSheet("font-size: 28px; font-weight: 700; color: white; border: none;")

        brand_desc = QLabel("Enterprise Platform")
        brand_desc.setStyleSheet("font-size: 14px; color: #bfdbfe; margin-top: 5px; margin-bottom: 50px; border: none;")

        info_text = QLabel("Secure marketplace solution for UCT community")
        info_text.setStyleSheet("font-size: 13px; color: #e0e7ff; line-height: 1.5; margin-top: 40px; border: none;")
        info_text.setWordWrap(True)

        features = QLabel("• Secure authentication\n• Role-based access\n• Real-time analytics")
        features.setStyleSheet("font-size: 12px; color: #e0e7ff; margin-top: 30px; line-height: 1.8; border: none;")

        branding_layout.addWidget(brand_name)
        branding_layout.addWidget(brand_desc)
        branding_layout.addStretch()
        branding_layout.addWidget(info_text)
        branding_layout.addWidget(features)
        branding_widget.setLayout(branding_layout)

        card = QFrame()
        card.setStyleSheet(self.card_style)
        card_layout = QVBoxLayout()
        card_layout.setContentsMargins(50, 60, 50, 60)
        card_layout.setSpacing(16)

        self.login_label = QLabel("Sign in")
        self.login_label.setStyleSheet(self.title_style)

        subtitle = QLabel("Access your Nexus Marketplace account")
        subtitle.setStyleSheet(self.subtitle_style)

        email_label = QLabel("UCT EMAIL")
        email_label.setStyleSheet(self.field_label_style)

        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("student@myuct.ac.za")
        self.email_input.setStyleSheet(self.input_style)

        password_label = QLabel("PASSWORD")
        password_label.setStyleSheet(self.field_label_style)

        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("Enter your password")
        self.password_input.setEchoMode(QLineEdit.Password)
        self.password_input.setStyleSheet(self.input_style)

        self.result_label = QLabel()
        self.result_label.setVisible(False)

        self.login_button = QPushButton("Sign in")
        self.login_button.setCursor(Qt.PointingHandCursor)
        self.login_button.setStyleSheet(self.button_style)
        self.login_button.clicked.connect(self.login)

        if keyboard.is_pressed("enter"):
            self.login()

        line = QFrame()
        line.setFrameShape(QFrame.HLine)
        line.setStyleSheet("background-color: #e5e7eb; max-height: 1px; margin: 16px 0; border: none;")

        signup_row = QHBoxLayout()
        signup_row.setAlignment(Qt.AlignCenter)
        no_account = QLabel("Don't have an account?")
        no_account.setStyleSheet("color: #6b7280; font-size: 13px; border: none;")
        signup_link = QLabel("Sign up")
        signup_link.setStyleSheet(self.link_style)
        signup_link.setCursor(Qt.PointingHandCursor)
        signup_link.mousePressEvent = lambda event: self.signup_clicked.emit()
        signup_row.addWidget(no_account)
        signup_row.addSpacing(4)
        signup_row.addWidget(signup_link)

        card_layout.addWidget(self.login_label)
        card_layout.addWidget(subtitle)
        card_layout.addSpacing(16)
        card_layout.addWidget(email_label)
        card_layout.addWidget(self.email_input)
        card_layout.addWidget(password_label)
        card_layout.addWidget(self.password_input)
        card_layout.addWidget(self.result_label)
        card_layout.addWidget(self.login_button)
        card_layout.addWidget(line)
        card_layout.addStretch()
        card_layout.addLayout(signup_row)

        card.setLayout(card_layout)

        main_layout.addWidget(branding_widget, 35)
        main_layout.addWidget(card, 65)

        self.setLayout(main_layout)

    def clear_message(self):
        self.result_label.setText("")
        self.result_label.setVisible(False)

    def login(self):
        email = self.email_input.text().strip()
        password = self.password_input.text().strip()

        self.email_input.clear()
        self.password_input.clear()

        if not email or not password:
            self.result_label.setText("Please enter email and password")
            self.result_label.setVisible(True)
            self.result_label.setStyleSheet("color: #dc2626; font-size: 13px;")
            self.error_timer.start(2500)
            return

        self.login_button.setEnabled(False)
        self.login_button.setText("Signing in...")
        self.login_button.setStyleSheet("""
            QPushButton {
                padding: 10px 16px;
                font-size: 14px;
                font-weight: 500;
                border-radius: 4px;
                background-color: #9ca3af;
                color: white;
                border: none;
            }
        """)

        self.result_label.setVisible(False)

        self.login_worker = LoginWorker(email, password)
        self.login_worker.finished.connect(self.on_login_success)
        self.login_worker.error.connect(self.on_login_error)
        self.login_worker.start()

    def on_login_success(self, user_data):
        self.login_button.setEnabled(True)
        self.login_button.setText("Sign in")
        self.login_button.setStyleSheet(self.button_style)
        self.login_successful.emit(user_data)

    def on_login_error(self, error_message):
        if error_message == "HTTPConnectionPool(host='localhost', port=3002): Max retries exceeded with url: /api/auth/login (Caused by NewConnectionError(\"HTTPConnection(host='localhost', port=3002): Failed to establish a new connection: [WinError 10061] No connection could be made because the target machine actively refused it\"))":
            error_message = "server error."

        self.login_button.setEnabled(True)
        self.login_button.setText("Sign in")
        self.login_button.setStyleSheet(self.button_style)

        self.result_label.setText(f"Login failed: {error_message}")
        self.result_label.setVisible(True)
        self.result_label.setStyleSheet("color: #dc2626; font-size: 13px;")
        print("Error: ", error_message)
        self.error_timer.start(2500)