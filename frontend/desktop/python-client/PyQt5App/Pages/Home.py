import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout
from PyQt5.QtCore import Qt


class HomePage(QWidget):
    def __init__(self):
        super().__init__()
        self.setStyleSheet("background-color: #f0f2f5;")

        layout = QVBoxLayout()
        layout.setAlignment(Qt.AlignCenter)

        welcome_label = QLabel("Welcome to Nexus Marketplace!")
        welcome_label.setStyleSheet("font-size: 32px; font-weight: bold; color: #1e40af;")
        welcome_label.setAlignment(Qt.AlignCenter)

        subtitle = QLabel("You have successfully logged in")
        subtitle.setStyleSheet("font-size: 16px; color: #6b7280;")
        subtitle.setAlignment(Qt.AlignCenter)

        layout.addWidget(welcome_label)
        layout.addWidget(subtitle)

        self.setLayout(layout)