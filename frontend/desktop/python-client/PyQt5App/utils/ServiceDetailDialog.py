from PyQt5.QtWidgets import QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QScrollArea, QWidget
from PyQt5.QtCore import Qt, QThreadPool
from PyQt5.QtGui import QFont, QPixmap
from PyQt5App.utils.ImageLoadRunnable import ImageLoadRunnable


class ServiceDetailDialog(QDialog):
    def __init__(self, service, provider_name, parent=None):
        super().__init__(parent)
        self.service = service
        self.provider_name = provider_name
        self.images = service.get('images', [])
        self.current_image_index = 0
        self.threadpool = QThreadPool()
        self.setWindowTitle("Service Details")
        self.setModal(True)
        self.resize(550, 700)
        self.initUI()

    def initUI(self):
        layout = QVBoxLayout()
        layout.setContentsMargins(20, 20, 20, 20)
        layout.setSpacing(15)

        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("border: none;")

        content = QWidget()
        content_layout = QVBoxLayout()
        content_layout.setSpacing(15)

        if self.images:
            self.image_label = QLabel()
            self.image_label.setAlignment(Qt.AlignCenter)
            self.image_label.setFixedHeight(300)
            self.image_label.setText("Loading image...")
            self.image_label.setStyleSheet("border: 1px solid #ddd; border-radius: 8px; background-color: #f0f0f0;")

            nav_layout = QHBoxLayout()
            self.prev_btn = QPushButton("Previous")
            self.prev_btn.setFixedWidth(100)
            self.prev_btn.clicked.connect(self.prev_image)
            self.prev_btn.setEnabled(False)

            self.next_btn = QPushButton("Next")
            self.next_btn.setFixedWidth(100)
            self.next_btn.clicked.connect(self.next_image)
            if len(self.images) <= 1:
                self.next_btn.setEnabled(False)

            nav_layout.addStretch()
            nav_layout.addWidget(self.prev_btn)
            nav_layout.addWidget(self.next_btn)
            nav_layout.addStretch()

            content_layout.addWidget(self.image_label)
            content_layout.addLayout(nav_layout)

            self.load_image()
        else:
            no_image_label = QLabel("No images available")
            no_image_label.setAlignment(Qt.AlignCenter)
            no_image_label.setFixedHeight(300)
            no_image_label.setStyleSheet("border: 1px solid #ddd; border-radius: 8px; background-color: #f0f0f0;")
            content_layout.addWidget(no_image_label)

        title_label = QLabel(self.service.get('title', 'Untitled'))
        title_label.setFont(QFont("Segoe UI", 18, QFont.Bold))
        title_label.setStyleSheet("color: #1e293b;")
        content_layout.addWidget(title_label)

        type_label = QLabel(self.service.get('serviceType', 'Unknown'))
        type_label.setStyleSheet("""
            background-color: #e5e7eb;
            color: #374151;
            font-size: 11px;
            padding: 4px 12px;
            border-radius: 4px;
        """)
        content_layout.addWidget(type_label)

        provider_label = QLabel(f"Provider: {self.provider_name}")
        provider_label.setFont(QFont("Segoe UI", 12))
        provider_label.setStyleSheet("color: #666;")
        content_layout.addWidget(provider_label)

        pricing = self.service.get('pricing', {})
        amount = pricing.get('amount', 0) if pricing else 0
        unit = pricing.get('unit', '') if pricing else ''
        price_label = QLabel(f"Price: R{amount} / {unit}" if unit else f"Price: R{amount}")
        price_label.setFont(QFont("Segoe UI", 14))
        price_label.setStyleSheet("color: #3b82f6;")
        content_layout.addWidget(price_label)

        availability_label = QLabel(f"Availability: {self.service.get('availability', 'Not specified')}")
        availability_label.setStyleSheet("color: #666; font-size: 12px;")
        content_layout.addWidget(availability_label)

        description_label = QLabel("Description")
        description_label.setFont(QFont("Segoe UI", 12, QFont.Bold))
        description_label.setStyleSheet("color: #1e293b; margin-top: 10px;")
        content_layout.addWidget(description_label)

        desc_text = self.service.get('description', 'No description available')
        desc_label = QLabel(desc_text)
        desc_label.setWordWrap(True)
        desc_label.setStyleSheet("color: #666; font-size: 12px;")
        content_layout.addWidget(desc_label)

        courses = self.service.get('courses', [])
        if courses:
            courses_label = QLabel("Courses")
            courses_label.setFont(QFont("Segoe UI", 12, QFont.Bold))
            courses_label.setStyleSheet("color: #1e293b; margin-top: 10px;")
            content_layout.addWidget(courses_label)

            courses_text = ", ".join(courses)
            courses_value = QLabel(courses_text)
            courses_value.setWordWrap(True)
            courses_value.setStyleSheet("color: #666; font-size: 12px;")
            content_layout.addWidget(courses_value)

        skills = self.service.get('skills', [])
        if skills:
            skills_label = QLabel("Skills")
            skills_label.setFont(QFont("Segoe UI", 12, QFont.Bold))
            skills_label.setStyleSheet("color: #1e293b; margin-top: 10px;")
            content_layout.addWidget(skills_label)

            skills_text = ", ".join(skills)
            skills_value = QLabel(skills_text)
            skills_value.setWordWrap(True)
            skills_value.setStyleSheet("color: #666; font-size: 12px;")
            content_layout.addWidget(skills_value)

        close_btn = QPushButton("Close")
        close_btn.setFixedHeight(35)
        close_btn.clicked.connect(self.close)
        content_layout.addWidget(close_btn)

        content.setLayout(content_layout)
        scroll.setWidget(content)
        layout.addWidget(scroll)

        self.setLayout(layout)

    def load_image(self):
        if not self.images:
            return

        runnable = ImageLoadRunnable(self.images[self.current_image_index])
        runnable.signals.finished.connect(self.on_image_loaded)
        self.threadpool.start(runnable)

    def on_image_loaded(self, pixmap):
        if pixmap and not pixmap.isNull():
            scaled = pixmap.scaled(400, 300, Qt.KeepAspectRatio, Qt.SmoothTransformation)
            self.image_label.setPixmap(scaled)
        else:
            self.image_label.setText("Image not available")

    def prev_image(self):
        if self.current_image_index > 0:
            self.current_image_index -= 1
            self.load_image()
            self.next_btn.setEnabled(True)
            if self.current_image_index == 0:
                self.prev_btn.setEnabled(False)

    def next_image(self):
        if self.current_image_index < len(self.images) - 1:
            self.current_image_index += 1
            self.load_image()
            self.prev_btn.setEnabled(True)
            if self.current_image_index == len(self.images) - 1:
                self.next_btn.setEnabled(False)