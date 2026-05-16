import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QLineEdit, QPushButton, QVBoxLayout, QHBoxLayout, QFrame, QScrollArea
from PyQt5.QtCore import Qt, pyqtSignal


class SignUpPage(QWidget):
    login_clicked = pyqtSignal()

    def __init__(self):
        super().__init__()
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
            QScrollArea {
                border: none;
                background-color: transparent;
            }
            QScrollBar:vertical {
                border: none;
                background: #f0f2f5;
                width: 8px;
                margin: 0px;
            }
            QScrollBar::handle:vertical {
                background: #cbd5e1;
                border-radius: 4px;
                min-height: 20px;
            }
            QScrollBar::handle:vertical:hover {
                background: #94a3b8;
            }
        """)

        self.card_style = """
            QFrame {
                background-color: white;
                border: none;
            }
        """

        self.title_style = """
            font-size: 28px;
            font-weight: 600;
            color: #111827;
            border: none;
        """

        self.subtitle_style = """
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 24px;
            border: none;
        """

        self.field_label_style = """
            font-size: 12px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 4px;
            border: none;
        """

        self.input_style = """
            QLineEdit {
                padding: 8px 12px;
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

        self.secondary_button_style = """
            QPushButton {
                padding: 8px 16px;
                font-size: 14px;
                font-weight: 500;
                border-radius: 4px;
                background-color: transparent;
                color: #3b82f6;
                border: none;
            }
            QPushButton:hover {
                background-color: #eff6ff;
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

        brand_desc = QLabel("Join the Community")
        brand_desc.setStyleSheet("font-size: 14px; color: #bfdbfe; margin-top: 5px; margin-bottom: 50px; border: none;")

        info_text = QLabel("Create your account to start buying and selling within the UCT community")
        info_text.setStyleSheet("font-size: 13px; color: #e0e7ff; line-height: 1.5; margin-top: 40px; border: none;")
        info_text.setWordWrap(True)

        features = QLabel("• Verified UCT community\n• Secure transactions\n• Student marketplace")
        features.setStyleSheet("font-size: 12px; color: #e0e7ff; margin-top: 30px; line-height: 1.8; border: none;")

        branding_layout.addWidget(brand_name)
        branding_layout.addWidget(brand_desc)
        branding_layout.addStretch()
        branding_layout.addWidget(info_text)
        branding_layout.addWidget(features)
        branding_widget.setLayout(branding_layout)

        scroll_area = QScrollArea()
        scroll_area.setWidgetResizable(True)
        scroll_area.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)

        card = QFrame()
        card.setStyleSheet(self.card_style)
        card_layout = QVBoxLayout()
        card_layout.setContentsMargins(50, 40, 50, 40)
        card_layout.setSpacing(12)

        self.join_label = QLabel("Create an account")
        self.join_label.setStyleSheet(self.title_style)

        self.create_label = QLabel("Sign up with your UCT email to get started")
        self.create_label.setStyleSheet(self.subtitle_style)

        name_label = QLabel("FULL NAME")
        name_label.setStyleSheet(self.field_label_style)

        self.name_input = QLineEdit()
        self.name_input.setPlaceholderText("Thabo Mokoena")
        self.name_input.setStyleSheet(self.input_style)

        email_label = QLabel("UCT EMAIL")
        email_label.setStyleSheet(self.field_label_style)

        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("student@uct.ac.za")
        self.email_input.setStyleSheet(self.input_style)

        course_label = QLabel("COURSE")
        course_label.setStyleSheet(self.field_label_style)

        self.course_input = QLineEdit()
        self.course_input.setPlaceholderText("Computer Science")
        self.course_input.setStyleSheet(self.input_style)

        year_label = QLabel("YEAR")
        year_label.setStyleSheet(self.field_label_style)

        self.year_input = QLineEdit()
        self.year_input.setPlaceholderText("1")
        self.year_input.setStyleSheet(self.input_style)

        password_label = QLabel("PASSWORD")
        password_label.setStyleSheet(self.field_label_style)

        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("Create a strong password")
        self.password_input.setEchoMode(QLineEdit.Password)
        self.password_input.setStyleSheet(self.input_style)

        course_year_layout = QHBoxLayout()
        course_year_layout.setSpacing(15)

        course_container = QVBoxLayout()
        course_container.addWidget(course_label)
        course_container.addWidget(self.course_input)

        year_container = QVBoxLayout()
        year_container.addWidget(year_label)
        year_container.addWidget(self.year_input)

        course_year_layout.addLayout(course_container, 70)
        course_year_layout.addLayout(year_container, 30)

        self.sign_up_button = QPushButton("Sign Up")
        self.sign_up_button.setCursor(Qt.PointingHandCursor)
        self.sign_up_button.setStyleSheet(self.button_style)

        line = QFrame()
        line.setFrameShape(QFrame.HLine)
        line.setStyleSheet("background-color: #e5e7eb; max-height: 1px; margin: 15px 0; border: none;")

        account_row = QHBoxLayout()
        account_row.setAlignment(Qt.AlignCenter)

        self.account_label = QLabel("Already have an account?")
        self.account_label.setStyleSheet("color: #6b7280; font-size: 13px; border: none;")

        self.account_btn = QPushButton("Sign in")
        self.account_btn.setCursor(Qt.PointingHandCursor)
        self.account_btn.setStyleSheet(self.secondary_button_style)
        self.account_btn.clicked.connect(self.login_clicked.emit)

        account_row.addWidget(self.account_label)
        account_row.addSpacing(4)
        account_row.addWidget(self.account_btn)

        card_layout.addWidget(self.join_label)
        card_layout.addWidget(self.create_label)
        card_layout.addWidget(name_label)
        card_layout.addWidget(self.name_input)
        card_layout.addWidget(email_label)
        card_layout.addWidget(self.email_input)
        card_layout.addLayout(course_year_layout)
        card_layout.addWidget(password_label)
        card_layout.addWidget(self.password_input)
        card_layout.addWidget(self.sign_up_button)
        card_layout.addWidget(line)
        card_layout.addStretch()
        card_layout.addLayout(account_row)

        card.setLayout(card_layout)
        scroll_area.setWidget(card)

        main_layout.addWidget(branding_widget, 35)
        main_layout.addWidget(scroll_area, 65)

        self.setLayout(main_layout)