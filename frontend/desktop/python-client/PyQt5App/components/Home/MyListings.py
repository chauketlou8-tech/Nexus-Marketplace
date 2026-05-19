from PyQt5.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QListWidget, QListWidgetItem, QFrame, QPushButton, QMessageBox, QProgressBar
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont
from PyQt5 import QtCore
from PyQt5App.utils.UserListingsWorker import UserListingsWorker
from PyQt5App.utils.DeleteListingWorker import DeleteListingWorker
from PyQt5App.utils.ImageLoadWorker import ImageLoadWorker
from PyQt5App.utils.ProductDetailDialog import ProductDetailDialog
from PyQt5App.api.services.getService import GetService
from PyQt5App.api.products.getProduct import GetProduct


class MyListings(QWidget):
    def __init__(self, user_data=None):
        super().__init__()
        self.user_data = user_data
        self.listings = []
        self.items_data = {}
        self.image_workers = []
        self.listing_image_labels = {}
        self.initUI()
        self.load_data()

    def initUI(self):
        layout = QVBoxLayout()
        layout.setContentsMargins(24, 24, 24, 24)
        layout.setSpacing(16)

        header = QLabel("My Listings")
        header.setFont(QFont("Segoe UI", 24, QFont.Bold))
        header.setStyleSheet("color: #1e293b;")
        layout.addWidget(header)

        subtitle = QLabel("Manage your products for sale")
        subtitle.setFont(QFont("Segoe UI", 12))
        subtitle.setStyleSheet("color: #666;")
        layout.addWidget(subtitle)

        self.count_label = QLabel("")
        self.count_label.setStyleSheet("color: #666; font-size: 12px; margin-top: 10px;")
        layout.addWidget(self.count_label)

        self.loading_label = QLabel("Loading your listings...")
        self.loading_label.setAlignment(Qt.AlignCenter)
        self.loading_label.setStyleSheet("color: #666; padding: 40px;")
        layout.addWidget(self.loading_label)

        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        self.progress_bar.setFixedHeight(8)
        self.progress_bar.setTextVisible(False)
        layout.addWidget(self.progress_bar)

        self.listings_list = QListWidget()
        self.listings_list.setVisible(False)
        self.listings_list.setIconSize(QtCore.QSize(60, 60))
        self.listings_list.setSpacing(10)
        self.listings_list.itemDoubleClicked.connect(self.on_listing_clicked)
        layout.addWidget(self.listings_list)

        self.setLayout(layout)

    def load_data(self):
        self.loading_label.setText("Loading your listings...")
        self.loading_label.setVisible(True)
        self.listings_list.setVisible(False)

        self.worker = UserListingsWorker()
        self.worker.finished.connect(self.on_listings_loaded)
        self.worker.error.connect(self.on_listings_error)
        self.worker.start()

    def on_listings_loaded(self, listings):
        self.listings = listings if listings else []
        self.progress_bar.setVisible(True)
        self.progress_bar.setMaximum(len(self.listings))
        self.current_index = 0
        self.fetch_next_item()

    def fetch_next_item(self):
        if self.current_index >= len(self.listings):
            self.progress_bar.setVisible(False)
            self.loading_label.setVisible(False)
            self.listings_list.setVisible(True)
            self.update_count()
            self.display_listings()
            return

        listing = self.listings[self.current_index]
        listing_id = listing.get('_id')
        item_id = listing.get('itemId')
        item_type = listing.get('itemType')

        try:
            if item_type == 'Service':
                get_service = GetService(item_id)
                item_data = get_service.getService()
            else:
                get_product = GetProduct(item_id)
                item_data = get_product.getProduct()

            self.items_data[listing_id] = item_data
        except Exception as e:
            self.items_data[listing_id] = {}
            print(f"Failed to fetch item {item_id}: {e}")

        self.current_index += 1
        self.progress_bar.setValue(self.current_index)
        self.loading_label.setText(f"Loading item details... ({self.current_index}/{len(self.listings)})")

        from PyQt5.QtCore import QTimer
        QTimer.singleShot(5, self.fetch_next_item)

    def on_listings_error(self, error_message):
        self.loading_label.setText(f"Failed to load listings: {error_message}")
        self.loading_label.setStyleSheet("color: #dc2626; padding: 40px;")
        self.loading_label.setVisible(True)
        self.listings_list.setVisible(False)

    def update_count(self):
        count = len(self.listings)
        self.count_label.setText(f"{count} active listing{'s' if count != 1 else ''}")

    def cleanup_workers(self):
        for worker in self.image_workers:
            if worker.isRunning():
                worker.quit()
                worker.wait()
        self.image_workers.clear()

    def start_image_load(self, listing_id, url, label):
        worker = ImageLoadWorker(listing_id, url)
        worker.finished.connect(self.on_image_loaded)
        self.image_workers.append(worker)
        self.listing_image_labels[listing_id] = label
        worker.start()

    def on_image_loaded(self, listing_id, pixmap):
        label = self.listing_image_labels.get(listing_id)
        if label:
            if pixmap and not pixmap.isNull():
                scaled = pixmap.scaled(60, 60, Qt.KeepAspectRatio, Qt.SmoothTransformation)
                label.setPixmap(scaled)
            else:
                label.setText("X")

    def delete_listing(self, listing_id, product_id):
        reply = QMessageBox.question(self, "Delete Listing",
                                     "Are you sure you want to delete this listing?",
                                     QMessageBox.Yes | QMessageBox.No)

        if reply == QMessageBox.Yes:
            self.delete_worker = DeleteListingWorker(listing_id, product_id)
            self.delete_worker.finished.connect(self.on_delete_finished)
            self.delete_worker.error.connect(self.on_delete_error)
            self.delete_worker.start()

            self.loading_label.setText("Deleting...")
            self.loading_label.setVisible(True)
            self.listings_list.setVisible(False)

    def on_delete_finished(self, success):
        self.loading_label.setVisible(False)
        self.listings_list.setVisible(True)
        if success:
            QMessageBox.information(self, "Success", "Listing deleted successfully")
            self.items_data.clear()
            self.load_data()
        else:
            QMessageBox.warning(self, "Error", "Failed to delete listing")

    def on_delete_error(self, error_message):
        self.loading_label.setVisible(False)
        self.listings_list.setVisible(True)
        QMessageBox.warning(self, "Error", f"Failed to delete: {error_message}")

    def display_listings(self):
        self.cleanup_workers()
        self.listings_list.clear()
        self.listing_image_labels.clear()

        if not self.listings:
            empty_item = QListWidgetItem("No listings found")
            empty_item.setTextAlignment(Qt.AlignCenter)
            empty_item.setForeground(QtCore.Qt.gray)
            self.listings_list.addItem(empty_item)
            return

        for listing in self.listings:
            listing_id = listing.get('_id')
            item_data = self.items_data.get(listing_id, {})
            title = item_data.get('title', 'Untitled')
            price = listing.get('price', 0)
            condition = item_data.get('condition', 'Unknown')
            images = item_data.get('images', [])
            description = item_data.get('description', '')
            status = listing.get('status', 'active')
            created_at = listing.get('createdAt', '')
            product_id = listing.get('itemId')

            list_item = QListWidgetItem()

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
                self.start_image_load(listing_id, images[0], image_label)

            card_layout.addWidget(image_label)

            text_layout = QVBoxLayout()
            text_layout.setSpacing(4)

            title_label = QLabel(title)
            title_label.setFont(QFont("Segoe UI", 14, QFont.Bold))
            title_label.setStyleSheet("color: #1e293b; border: none;")

            status_label = QLabel(f"Status: {status}")
            status_label.setStyleSheet(f"color: {'#10b981' if status == 'active' else '#ef4444'}; font-size: 10px; border: none;")

            desc_label = QLabel(description[:80] + "..." if len(description) > 80 else description)
            desc_label.setStyleSheet("color: #666; font-size: 11px; border: none;")

            price_label = QLabel(f"R{price}")
            price_label.setFont(QFont("Segoe UI", 12))
            price_label.setStyleSheet("color: #3b82f6; border: none;")

            condition_label = QLabel(f"Condition: {condition}")
            condition_label.setStyleSheet("color: #666; font-size: 10px; border: none;")

            date_label = QLabel(f"Listed: {created_at[:10] if created_at else 'Unknown'}")
            date_label.setStyleSheet("color: #666; font-size: 10px; border: none;")

            text_layout.addWidget(title_label)
            text_layout.addWidget(status_label)
            text_layout.addWidget(desc_label)
            text_layout.addWidget(price_label)
            text_layout.addWidget(condition_label)
            text_layout.addWidget(date_label)

            button_layout = QVBoxLayout()

            delete_btn = QPushButton("Delete")
            delete_btn.setCursor(Qt.PointingHandCursor)
            delete_btn.setFixedWidth(80)
            delete_btn.setStyleSheet("""
                QPushButton {
                    background-color: #ef4444;
                    color: white;
                    padding: 6px;
                    border-radius: 4px;
                }
                QPushButton:hover {
                    background-color: #dc2626;
                }
            """)
            delete_btn.clicked.connect(lambda checked, lid=listing_id, pid=product_id: self.delete_listing(lid, pid))

            button_layout.addWidget(delete_btn)
            button_layout.addStretch()

            card_layout.addLayout(text_layout)
            card_layout.addLayout(button_layout)

            card.setLayout(card_layout)

            list_item.setSizeHint(card.sizeHint())
            list_item.setData(Qt.UserRole, item_data)
            self.listings_list.addItem(list_item)
            self.listings_list.setItemWidget(list_item, card)

    def on_listing_clicked(self, item):
        product = item.data(Qt.UserRole)
        dialog = ProductDetailDialog(product, self)
        dialog.exec_()