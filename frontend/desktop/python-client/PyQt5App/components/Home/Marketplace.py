from PyQt5.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QComboBox, QListWidget, QListWidgetItem, QFrame, QPushButton, QProgressBar
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QFont, QPixmap
from PyQt5 import QtCore
from PyQt5App.utils.ProductWorker import FetchProductsWorker
from PyQt5App.utils.CategoriesWorker import CategoriesWorker
from PyQt5App.utils.CoursesWorker import CoursesWorker
from PyQt5App.utils.ProductDetailDialog import ProductDetailDialog
from PyQt5App.utils.ImageLoadWorker import ImageLoadWorker
from PyQt5App.utils.UserWorker import UserWorker
from PyQt5App.utils.ListingsWorker import ListingsWorker
from PyQt5App.api.categories.getCategory import GetCategory
from PyQt5App.api.courses.getCourse import GetCourse


class Marketplace(QWidget):
    def __init__(self, user_data=None):
        super().__init__()
        self.user_data = user_data
        self.products = []
        self.textbooks = []
        self.items = []
        self.filtered_textbooks = []
        self.filtered_items = []
        self.categories = []
        self.courses = []
        self.product_categories = {}
        self.product_courses = {}
        self.product_sellers = {}
        self.listings = {}
        self.active_tab = "textbooks"
        self.current_product_index = 0
        self.image_workers = []
        self.user_workers = []
        self.product_image_labels = {}
        self.initUI()
        self.load_data()

    def initUI(self):
        layout = QVBoxLayout()
        layout.setContentsMargins(24, 24, 24, 24)
        layout.setSpacing(16)

        header = QLabel("Marketplace")
        header.setFont(QFont("Segoe UI", 24, QFont.Bold))
        header.setStyleSheet("color: #1e293b;")
        layout.addWidget(header)

        tab_layout = QHBoxLayout()
        tab_layout.setSpacing(10)

        self.textbooks_tab = QPushButton("Textbooks")
        self.textbooks_tab.setCursor(Qt.PointingHandCursor)
        self.textbooks_tab.setFixedHeight(35)
        self.textbooks_tab.clicked.connect(lambda: self.switch_tab("textbooks"))

        self.items_tab = QPushButton("Items")
        self.items_tab.setCursor(Qt.PointingHandCursor)
        self.items_tab.setFixedHeight(35)
        self.items_tab.clicked.connect(lambda: self.switch_tab("items"))

        tab_layout.addWidget(self.textbooks_tab)
        tab_layout.addWidget(self.items_tab)
        tab_layout.addStretch()

        layout.addLayout(tab_layout)

        self.count_label = QLabel("")
        self.count_label.setStyleSheet("color: #666; font-size: 12px;")
        layout.addWidget(self.count_label)

        self.search_input = QLineEdit()
        self.search_input.setPlaceholderText("Search products...")
        self.search_input.setFixedHeight(40)
        self.search_input.textChanged.connect(self.filter_products)
        layout.addWidget(self.search_input)

        filter_layout = QHBoxLayout()

        self.course_combo = QComboBox()
        self.course_combo.addItem("All Courses")
        self.course_combo.currentTextChanged.connect(self.filter_products)

        self.category_combo = QComboBox()
        self.category_combo.addItem("All Categories")
        self.category_combo.currentTextChanged.connect(self.filter_products)

        self.sort_combo = QComboBox()
        self.sort_combo.addItems(["Recently Listed", "Price: Low to High", "Price: High to Low"])
        self.sort_combo.currentTextChanged.connect(self.filter_products)

        filter_layout.addWidget(self.course_combo)
        filter_layout.addWidget(self.category_combo)
        filter_layout.addWidget(self.sort_combo)
        filter_layout.addStretch()

        layout.addLayout(filter_layout)

        self.loading_label = QLabel("Loading products...")
        self.loading_label.setAlignment(Qt.AlignCenter)
        self.loading_label.setStyleSheet("color: #666; padding: 40px;")
        layout.addWidget(self.loading_label)

        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        self.progress_bar.setFixedHeight(8)
        self.progress_bar.setTextVisible(False)
        layout.addWidget(self.progress_bar)

        self.products_list = QListWidget()
        self.products_list.setVisible(False)
        self.products_list.setIconSize(QtCore.QSize(60, 60))
        self.products_list.setSpacing(10)
        self.products_list.itemDoubleClicked.connect(self.on_product_clicked)
        layout.addWidget(self.products_list)

        self.setLayout(layout)
        self.switch_tab("textbooks")

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

    def switch_tab(self, tab):
        self.cleanup_workers()
        self.active_tab = tab

        if tab == "textbooks":
            self.textbooks_tab.setStyleSheet("""
                QPushButton {
                    background-color: #3b82f6;
                    color: white;
                    border-radius: 6px;
                    padding: 8px 20px;
                }
            """)
            self.items_tab.setStyleSheet("""
                QPushButton {
                    background-color: #e5e7eb;
                    color: #374151;
                    border-radius: 6px;
                    padding: 8px 20px;
                }
                QPushButton:hover {
                    background-color: #d1d5db;
                }
            """)
            self.category_combo.setVisible(False)
            self.course_combo.setVisible(True)
            self.update_count()

            if hasattr(self, 'filtered_textbooks'):
                self.display_products()
            else:
                self.products_list.clear()
                empty_item = QListWidgetItem("Loading textbooks...")
                empty_item.setTextAlignment(Qt.AlignCenter)
                self.products_list.addItem(empty_item)
        else:
            self.textbooks_tab.setStyleSheet("""
                QPushButton {
                    background-color: #e5e7eb;
                    color: #374151;
                    border-radius: 6px;
                    padding: 8px 20px;
                }
                QPushButton:hover {
                    background-color: #d1d5db;
                }
            """)
            self.items_tab.setStyleSheet("""
                QPushButton {
                    background-color: #3b82f6;
                    color: white;
                    border-radius: 6px;
                    padding: 8px 20px;
                }
            """)
            self.category_combo.setVisible(True)
            self.course_combo.setVisible(False)
            self.update_count()

            if hasattr(self, 'filtered_items'):
                self.display_products()
            else:
                self.products_list.clear()
                empty_item = QListWidgetItem("Loading items...")
                empty_item.setTextAlignment(Qt.AlignCenter)
                self.products_list.addItem(empty_item)

    def update_count(self):
        if self.active_tab == "textbooks":
            count = len(self.filtered_textbooks) if hasattr(self, 'filtered_textbooks') else 0
            self.count_label.setText(f"{count} textbook{'s' if count != 1 else ''} available")
        else:
            count = len(self.filtered_items) if hasattr(self, 'filtered_items') else 0
            self.count_label.setText(f"{count} item{'s' if count != 1 else ''} available")

    def load_data(self):
        self.loading_label.setText("Loading products...")

        self.products_worker = FetchProductsWorker()
        self.products_worker.finished.connect(self.on_products_loaded)
        self.products_worker.error.connect(self.on_products_error)
        self.products_worker.start()

        self.listings_worker = ListingsWorker()
        self.listings_worker.finished.connect(self.on_listings_loaded)
        self.listings_worker.error.connect(self.on_listings_error)
        self.listings_worker.start()

    def on_listings_loaded(self, listings_dict):
        self.listings = listings_dict

    def on_listings_error(self, error_message):
        print(f"Failed to load listings: {error_message}")

    def on_products_loaded(self, products):
        self.products = products
        self.loading_label.setText("Loading categories...")

        self.categories_worker = CategoriesWorker()
        self.categories_worker.finished.connect(self.on_categories_loaded)
        self.categories_worker.error.connect(self.on_categories_error)
        self.categories_worker.start()

    def on_categories_loaded(self, categories):
        self.categories = categories

        self.category_combo.clear()
        self.category_combo.addItem("All Categories")
        for category in self.categories:
            if category.get('slug') != "books":
                self.category_combo.addItem(category.get('slug'))

        self.loading_label.setText("Loading courses...")

        self.courses_worker = CoursesWorker()
        self.courses_worker.finished.connect(self.on_courses_loaded)
        self.courses_worker.error.connect(self.on_courses_error)
        self.courses_worker.start()

    def on_courses_loaded(self, courses):
        self.courses = courses

        self.course_combo.clear()
        self.course_combo.addItem("All Courses")
        for course in self.courses:
            self.course_combo.addItem(course.get('name'))

        self.loading_label.setText("Processing products...")
        self.progress_bar.setVisible(True)
        self.progress_bar.setMaximum(len(self.products))
        self.current_product_index = 0
        self.process_next_product()

    def process_next_product(self):
        if self.current_product_index >= len(self.products):
            self.progress_bar.setVisible(False)
            self.separate_products()
            return

        product = self.products[self.current_product_index]
        product_id = product.get('_id')
        category_id = product.get('categoryId')
        course_ids = product.get('courseIds', [])
        seller_id = product.get('sellerId')

        try:
            get_category = GetCategory(category_id)
            slug = get_category.getCategory()
            self.product_categories[product_id] = slug
        except Exception:
            self.product_categories[product_id] = ""

        course_names = []
        for course_id in course_ids:
            try:
                get_course = GetCourse(course_id)
                course = get_course.getCourse()
                if course:
                    course_names.append(course.get('name'))
            except Exception:
                pass

        self.product_courses[product_id] = course_names

        if seller_id:
            user_worker = UserWorker(product_id, seller_id)
            user_worker.finished.connect(self.on_seller_loaded)
            self.user_workers.append(user_worker)
            user_worker.start()
        else:
            self.product_sellers[product_id] = 'Unknown'

        self.current_product_index += 1
        self.progress_bar.setValue(self.current_product_index)
        self.loading_label.setText(f"Processing products... ({self.current_product_index}/{len(self.products)})")

        QTimer.singleShot(5, self.process_next_product)

    def on_seller_loaded(self, product_id, seller_name):
        self.product_sellers[product_id] = seller_name

    def on_categories_error(self, error_message):
        self.loading_label.setText(f"Failed to load categories: {error_message}")
        self.loading_label.setStyleSheet("color: #dc2626; padding: 40px;")

    def on_courses_error(self, error_message):
        self.loading_label.setText(f"Failed to load courses: {error_message}")
        self.loading_label.setStyleSheet("color: #dc2626; padding: 40px;")

    def on_products_error(self, error_message):
        self.loading_label.setText(f"Failed to load products: {error_message}")
        self.loading_label.setStyleSheet("color: #dc2626; padding: 40px;")

    def separate_products(self):
        self.textbooks = []
        self.items = []

        for product in self.products:
            product_id = product.get('_id')
            slug = self.product_categories.get(product_id, "")

            if slug == "books":
                self.textbooks.append(product)
            else:
                self.items.append(product)

        self.filtered_textbooks = self.textbooks.copy()
        self.filtered_items = self.items.copy()

        self.loading_label.setVisible(False)
        self.products_list.setVisible(True)
        self.update_count()
        self.display_products()

    def filter_products(self):
        if not hasattr(self, 'textbooks') or not hasattr(self, 'items'):
            return

        search_text = self.search_input.text().lower()
        course_filter = self.course_combo.currentText()
        category_filter = self.category_combo.currentText()
        sort_by = self.sort_combo.currentText()

        if self.active_tab == "textbooks":
            filtered = self.textbooks.copy()

            if search_text:
                filtered = [p for p in filtered if
                            search_text in p.get('title', '').lower() or
                            search_text in p.get('description', '').lower()]

            if course_filter != "All Courses":
                filtered = [p for p in filtered if course_filter in self.product_courses.get(p.get('_id'), [])]

            if sort_by == "Recently Listed":
                filtered.sort(key=lambda x: self.listings.get(x.get('_id'), ''), reverse=True)
            elif sort_by == "Price: Low to High":
                filtered.sort(key=lambda x: x.get('price', 0))
            elif sort_by == "Price: High to Low":
                filtered.sort(key=lambda x: x.get('price', 0), reverse=True)

            self.filtered_textbooks = filtered
        else:
            filtered = self.items.copy()

            if search_text:
                filtered = [p for p in filtered if
                            search_text in p.get('title', '').lower() or
                            search_text in p.get('description', '').lower()]

            if category_filter != "All Categories":
                filtered = [p for p in filtered if self.product_categories.get(p.get('_id'), "") == category_filter]

            if sort_by == "Recently Listed":
                filtered.sort(key=lambda x: self.listings.get(x.get('_id'), ''), reverse=True)
            elif sort_by == "Price: Low to High":
                filtered.sort(key=lambda x: x.get('price', 0))
            elif sort_by == "Price: High to Low":
                filtered.sort(key=lambda x: x.get('price', 0), reverse=True)

            self.filtered_items = filtered

        self.update_count()
        self.display_products()

    def start_image_load(self, product_id, url, label):
        worker = ImageLoadWorker(product_id, url)
        worker.finished.connect(self.on_image_loaded)
        self.image_workers.append(worker)
        self.product_image_labels[product_id] = label
        worker.start()

    def on_image_loaded(self, product_id, pixmap):
        label = self.product_image_labels.get(product_id)
        if label:
            if pixmap and not pixmap.isNull():
                scaled = pixmap.scaled(60, 60, Qt.KeepAspectRatio, Qt.SmoothTransformation)
                label.setPixmap(scaled)
            else:
                label.setText("X")

    def display_products(self):
        self.cleanup_workers()
        self.products_list.clear()
        self.product_image_labels.clear()

        if self.active_tab == "textbooks":
            if not hasattr(self, 'filtered_textbooks') or not self.filtered_textbooks:
                empty_item = QListWidgetItem("No textbooks found")
                empty_item.setTextAlignment(Qt.AlignCenter)
                empty_item.setForeground(QtCore.Qt.gray)
                self.products_list.addItem(empty_item)
                return
            products_to_display = self.filtered_textbooks
        else:
            if not hasattr(self, 'filtered_items') or not self.filtered_items:
                empty_item = QListWidgetItem("No items found")
                empty_item.setTextAlignment(Qt.AlignCenter)
                empty_item.setForeground(QtCore.Qt.gray)
                self.products_list.addItem(empty_item)
                return
            products_to_display = self.filtered_items

        for product in products_to_display:
            product_id = product.get('_id')
            title = product.get('title', 'Untitled')
            price = product.get('price', 0)
            condition = product.get('condition', 'Unknown')
            images = product.get('images', [])
            description = product.get('description', '')
            course_names = self.product_courses.get(product_id, [])
            seller_name = self.product_sellers.get(product_id, 'Loading...')

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
            image_label.setFixedSize(60, 60)
            image_label.setStyleSheet("border: none; background-color: #f0f0f0; border-radius: 8px;")
            image_label.setText("...")

            if images and len(images) > 0:
                self.start_image_load(product_id, images[0], image_label)

            card_layout.addWidget(image_label)

            text_layout = QVBoxLayout()
            text_layout.setSpacing(4)

            title_label = QLabel(title)
            title_label.setFont(QFont("Segoe UI", 14, QFont.Bold))
            title_label.setStyleSheet("color: #1e293b; border: none;")

            seller_label = QLabel(f"Seller: {seller_name}")
            seller_label.setStyleSheet("color: #666; font-size: 10px; border: none;")

            product_id_label = QLabel(f"ID: {product_id}")
            product_id_label.setStyleSheet("color: #666; font-size: 10px; border: none;")

            desc_label = QLabel(description[:80] + "..." if len(description) > 80 else description)
            desc_label.setStyleSheet("color: #666; font-size: 11px; border: none;")

            if course_names and self.active_tab == "textbooks":
                course_text = ", ".join(course_names[:2])
                if len(course_names) > 2:
                    course_text += "..."
                course_label = QLabel(f"Courses: {course_text}")
                course_label.setStyleSheet("color: #666; font-size: 10px; border: none;")
                text_layout.addWidget(course_label)

            price_label = QLabel(f"R{price}")
            price_label.setFont(QFont("Segoe UI", 12))
            price_label.setStyleSheet("color: #3b82f6; border: none;")

            condition_label = QLabel(condition)
            condition_label.setStyleSheet("""
                background-color: #e5e7eb;
                color: #374151;
                font-size: 10px;
                padding: 2px 8px;
                border-radius: 4px;
            """)

            text_layout.addWidget(title_label)
            text_layout.addWidget(seller_label)
            text_layout.addWidget(product_id_label)
            text_layout.addWidget(desc_label)
            text_layout.addWidget(price_label)
            text_layout.addWidget(condition_label)

            contact_btn = QPushButton("Contact")
            contact_btn.setCursor(Qt.PointingHandCursor)
            contact_btn.setFixedWidth(100)
            contact_btn.setEnabled(False)
            contact_btn.setToolTip("Coming soon")

            card_layout.addLayout(text_layout)
            card_layout.addWidget(contact_btn)

            card.setLayout(card_layout)

            item.setSizeHint(card.sizeHint())
            item.setData(Qt.UserRole, product)
            self.products_list.addItem(item)
            self.products_list.setItemWidget(item, card)

    def on_product_clicked(self, item):
        product = item.data(Qt.UserRole)
        dialog = ProductDetailDialog(product, self)
        dialog.exec_()