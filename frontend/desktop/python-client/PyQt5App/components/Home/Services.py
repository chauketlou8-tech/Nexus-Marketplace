from PyQt5.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QComboBox, QListWidget, QListWidgetItem, QFrame, QPushButton, QProgressBar
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QFont, QPixmap
from PyQt5 import QtCore
from PyQt5App.utils.ServicesWorker import ServicesWorker
from PyQt5App.utils.CategoriesWorker import CategoriesWorker
from PyQt5App.utils.ImageLoadWorker import ImageLoadWorker
from PyQt5App.utils.UserWorker import UserWorker
from PyQt5App.utils.ServiceDetailDialog import ServiceDetailDialog
from PyQt5App.api.categories.getCategory import GetCategory


class Services(QWidget):
    def __init__(self, user_data=None, search_input=None):
        super().__init__()
        self.user_data = user_data
        self.search_input = search_input
        self.services = []
        self.filtered_services = []
        self.categories = []
        self.providers = {}
        self.active_filter = "All Services"
        self.image_workers = []
        self.user_workers = []
        self.service_image_labels = {}
        self.initUI()
        self.load_data()

        if self.search_input:
            self.search_input.textChanged.connect(self.filter_services)

    def initUI(self):
        layout = QVBoxLayout()
        layout.setContentsMargins(24, 24, 24, 24)
        layout.setSpacing(16)

        header = QLabel("Student Services")
        header.setFont(QFont("Segoe UI", 24, QFont.Bold))
        header.setStyleSheet("color: #1e293b;")
        layout.addWidget(header)

        subtitle = QLabel("Connect with skilled students for tutoring and services")
        subtitle.setFont(QFont("Segoe UI", 12))
        subtitle.setStyleSheet("color: #666;")
        layout.addWidget(subtitle)

        self.count_label = QLabel("")
        self.count_label.setStyleSheet("color: #666; font-size: 12px; margin-top: 10px;")
        layout.addWidget(self.count_label)

        filter_layout = QHBoxLayout()

        filter_layout.addWidget(QLabel("Category:"))
        self.category_combo = QComboBox()
        self.category_combo.addItem("All Services")
        self.category_combo.currentTextChanged.connect(self.filter_services)
        filter_layout.addWidget(self.category_combo)
        filter_layout.addStretch()

        layout.addLayout(filter_layout)

        self.loading_label = QLabel("Loading services...")
        self.loading_label.setAlignment(Qt.AlignCenter)
        self.loading_label.setStyleSheet("color: #666; padding: 40px;")
        layout.addWidget(self.loading_label)

        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        self.progress_bar.setFixedHeight(8)
        self.progress_bar.setTextVisible(False)
        layout.addWidget(self.progress_bar)

        self.services_list = QListWidget()
        self.services_list.setVisible(False)
        self.services_list.setIconSize(QtCore.QSize(80, 80))
        self.services_list.setSpacing(10)
        self.services_list.itemDoubleClicked.connect(self.on_service_clicked)
        layout.addWidget(self.services_list)

        self.setLayout(layout)

    def cleanup_workers(self):
        for worker in self.image_workers:
            if worker.isRunning():
                worker.quit()
                worker.wait()
        self.image_workers.clear()

        for worker in self.user_workers:
            if worker.isRunning():
                worker.quit()
                worker.wait()
        self.user_workers.clear()

    def load_data(self):
        self.loading_label.setText("Loading services...")

        self.services_worker = ServicesWorker()
        self.services_worker.finished.connect(self.on_services_loaded)
        self.services_worker.error.connect(self.on_services_error)
        self.services_worker.start()

        self.categories_worker = CategoriesWorker()
        self.categories_worker.finished.connect(self.on_categories_loaded)
        self.categories_worker.error.connect(self.on_categories_error)
        self.categories_worker.start()

    def on_services_loaded(self, services):
        self.services = services
        self.filtered_services = services.copy()
        self.load_providers()

    def on_categories_loaded(self, categories):
        self.categories = categories
        self.category_combo.clear()
        self.category_combo.addItem("All Services")
        for category in self.categories:
            self.category_combo.addItem(category.get('slug'))

    def on_categories_error(self, error_message):
        print(f"Failed to load categories: {error_message}")

    def load_providers(self):
        if not self.services:
            self.finish_loading()
            return

        self.progress_bar.setVisible(True)
        self.progress_bar.setMaximum(len(self.services))
        self.current_service_index = 0
        self.process_next_provider()

    def process_next_provider(self):
        if self.current_service_index >= len(self.services):
            self.finish_loading()
            return

        service = self.services[self.current_service_index]
        service_id = service.get('_id')
        provider_id = service.get('providerId')

        if provider_id:
            user_worker = UserWorker(service_id, provider_id)
            user_worker.finished.connect(self.on_provider_loaded)
            self.user_workers.append(user_worker)
            user_worker.start()

        self.current_service_index += 1
        self.progress_bar.setValue(self.current_service_index)
        QTimer.singleShot(5, self.process_next_provider)

    def on_provider_loaded(self, service_id, provider_name):
        self.providers[service_id] = provider_name

    def finish_loading(self):
        self.progress_bar.setVisible(False)
        self.loading_label.setVisible(False)
        self.services_list.setVisible(True)
        self.update_count()
        self.display_services()

    def on_services_error(self, error_message):
        self.loading_label.setText(f"Failed to load services: {error_message}")
        self.loading_label.setStyleSheet("color: #dc2626; padding: 40px;")

    def update_count(self):
        count = len(self.filtered_services)
        self.count_label.setText(f"{count} service{'s' if count != 1 else ''} available")

    def filter_services(self):
        search_text = self.search_input.text().lower() if self.search_input else ""
        category_filter = self.category_combo.currentText()

        filtered = self.services.copy()

        if search_text:
            filtered = [s for s in filtered if
                        search_text in s.get('title', '').lower() or
                        search_text in s.get('description', '').lower()]

        if category_filter != "All Services":
            temp_filtered = []
            for service in filtered:
                category_id = service.get('categoryId')
                if category_id:
                    try:
                        get_category = GetCategory(category_id)
                        slug = get_category.getCategory()
                        if slug == category_filter:
                            temp_filtered.append(service)
                    except:
                        pass
            filtered = temp_filtered

        self.filtered_services = filtered
        self.update_count()
        self.display_services()

    def start_image_load(self, service_id, url, label):
        worker = ImageLoadWorker(service_id, url)
        worker.finished.connect(self.on_image_loaded)
        self.image_workers.append(worker)
        self.service_image_labels[service_id] = label
        worker.start()

    def on_image_loaded(self, service_id, pixmap):
        label = self.service_image_labels.get(service_id)
        if label:
            if pixmap and not pixmap.isNull():
                scaled = pixmap.scaled(80, 80, Qt.KeepAspectRatio, Qt.SmoothTransformation)
                label.setPixmap(scaled)
            else:
                label.setText("No image")

    def display_services(self):
        self.cleanup_workers()
        self.services_list.clear()
        self.service_image_labels.clear()

        if not self.filtered_services:
            empty_item = QListWidgetItem("No services found")
            empty_item.setTextAlignment(Qt.AlignCenter)
            empty_item.setForeground(QtCore.Qt.gray)
            self.services_list.addItem(empty_item)
            return

        for service in self.filtered_services:
            service_id = service.get('_id')
            title = service.get('title', 'Untitled')
            description = service.get('description', '')
            service_type = service.get('serviceType', '')
            availability = service.get('availability', '')
            pricing = service.get('pricing', {})
            amount = pricing.get('amount', 0) if pricing else 0
            unit = pricing.get('unit', '') if pricing else ''
            images = service.get('images', [])
            courses = service.get('courses', [])
            skills = service.get('skills', [])
            provider_name = self.providers.get(service_id, 'Loading...')

            item = QListWidgetItem()

            card = QFrame()
            card.setFrameShape(QFrame.Box)
            card.setStyleSheet("""
                QFrame {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: white;
                    margin: 4px;
                }
                QFrame:hover {
                    border: 1px solid #3b82f6;
                    background-color: #f8fafc;
                }
            """)

            card_layout = QHBoxLayout()
            card_layout.setContentsMargins(12, 12, 12, 12)
            card_layout.setSpacing(12)

            image_label = QLabel()
            image_label.setFixedSize(80, 80)
            image_label.setStyleSheet("border: none; background-color: #f0f0f0; border-radius: 8px;")
            image_label.setText("...")

            if images and len(images) > 0:
                self.start_image_load(service_id, images[0], image_label)

            card_layout.addWidget(image_label)

            text_layout = QVBoxLayout()
            text_layout.setSpacing(4)

            title_layout = QHBoxLayout()
            title_label = QLabel(title)
            title_label.setFont(QFont("Segoe UI", 14, QFont.Bold))
            title_label.setStyleSheet("color: #1e293b; border: none;")

            type_label = QLabel(service_type)
            type_label.setStyleSheet("""
                background-color: #e5e7eb;
                color: #374151;
                font-size: 10px;
                padding: 2px 8px;
                border-radius: 4px;
            """)

            title_layout.addWidget(title_label)
            title_layout.addWidget(type_label)
            title_layout.addStretch()
            text_layout.addLayout(title_layout)

            provider_label = QLabel(f"Provider: {provider_name}")
            provider_label.setStyleSheet("color: #666; font-size: 10px; border: none;")
            text_layout.addWidget(provider_label)

            desc_label = QLabel(description[:100] + "..." if len(description) > 100 else description)
            desc_label.setStyleSheet("color: #666; font-size: 11px; border: none;")
            text_layout.addWidget(desc_label)

            if courses and len(courses) > 0:
                course_text = "Courses: " + ", ".join(courses[:3])
                if len(courses) > 3:
                    course_text += "..."
                course_label = QLabel(course_text)
                course_label.setStyleSheet("color: #666; font-size: 10px; border: none;")
                text_layout.addWidget(course_label)

            if skills and len(skills) > 0:
                skill_text = "Skills: " + ", ".join(skills[:3])
                if len(skills) > 3:
                    skill_text += "..."
                skill_label = QLabel(skill_text)
                skill_label.setStyleSheet("color: #666; font-size: 10px; border: none;")
                text_layout.addWidget(skill_label)

            availability_label = QLabel(f"Availability: {availability}")
            availability_label.setStyleSheet("color: #666; font-size: 10px; border: none;")
            text_layout.addWidget(availability_label)

            price_label = QLabel(f"R{amount} / {unit}" if unit else f"R{amount}")
            price_label.setFont(QFont("Segoe UI", 12))
            price_label.setStyleSheet("color: #3b82f6; border: none;")
            text_layout.addWidget(price_label)

            contact_btn = QPushButton("Contact")
            contact_btn.setCursor(Qt.PointingHandCursor)
            contact_btn.setFixedWidth(100)
            contact_btn.setEnabled(False)
            contact_btn.setToolTip("Coming soon")

            card_layout.addLayout(text_layout)
            card_layout.addWidget(contact_btn)

            card.setLayout(card_layout)

            item.setSizeHint(card.sizeHint())
            item.setData(Qt.UserRole, service)
            self.services_list.addItem(item)
            self.services_list.setItemWidget(item, card)

    def on_service_clicked(self, item):
        service = item.data(Qt.UserRole)
        service_id = service.get('_id')
        provider_name = self.providers.get(service_id, 'Unknown')
        dialog = ServiceDetailDialog(service, provider_name, self)
        dialog.exec_()