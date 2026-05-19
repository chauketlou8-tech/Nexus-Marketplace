from PyQt5.QtWidgets import QWidget, QVBoxLayout, QHBoxLayout, QLabel, QListWidget, QListWidgetItem, QFrame, QPushButton, QTextEdit, QScrollArea, QMessageBox
from PyQt5.QtCore import Qt, pyqtSignal, QTimer
from PyQt5.QtGui import QFont
from PyQt5 import QtCore
from PyQt5App.api.chats.getChats import GetChats
from PyQt5App.api.messages.getMessages import GetMessages
from PyQt5App.api.messages.createMessage import CreateMessage
from PyQt5App.api.user.getUser import GetUser


class Messages(QWidget):
    def __init__(self, user_data=None):
        super().__init__()
        self.user_data = user_data
        self.chats = []
        self.messages = []
        self.other_users = {}
        self.current_chat = None
        self.current_chat_id = None
        self.initUI()
        self.load_data()
        self.refresh_timer = QTimer()
        self.refresh_timer.timeout.connect(self.refresh_messages)
        self.refresh_timer.start(3000)

    def initUI(self):
        layout = QHBoxLayout()
        layout.setContentsMargins(24, 24, 24, 24)
        layout.setSpacing(20)

        left_panel = QFrame()
        left_panel.setFixedWidth(350)
        left_panel.setStyleSheet("""
            QFrame {
                background-color: white;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
            }
        """)
        left_layout = QVBoxLayout()
        left_layout.setContentsMargins(0, 0, 0, 0)
        left_layout.setSpacing(0)

        header = QFrame()
        header.setFixedHeight(60)
        header.setStyleSheet("border-bottom: 1px solid #e5e7eb;")
        header_layout = QHBoxLayout()
        header_layout.setContentsMargins(16, 0, 16, 0)

        title = QLabel("Messages")
        title.setFont(QFont("Segoe UI", 16, QFont.Bold))
        title.setStyleSheet("color: #1e293b;")
        header_layout.addWidget(title)
        header_layout.addStretch()
        header.setLayout(header_layout)
        left_layout.addWidget(header)

        self.chats_list = QListWidget()
        self.chats_list.setStyleSheet("""
            QListWidget {
                border: none;
                background-color: white;
            }
            QListWidget::item {
                padding: 0px;
            }
        """)
        self.chats_list.itemClicked.connect(self.on_chat_selected)
        left_layout.addWidget(self.chats_list)

        left_panel.setLayout(left_layout)

        right_panel = QFrame()
        right_panel.setStyleSheet("""
            QFrame {
                background-color: white;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
            }
        """)
        right_layout = QVBoxLayout()
        right_layout.setContentsMargins(0, 0, 0, 0)
        right_layout.setSpacing(0)

        self.chat_header = QFrame()
        self.chat_header.setFixedHeight(70)
        self.chat_header.setStyleSheet("border-bottom: 1px solid #e5e7eb;")
        self.chat_header.hide()
        chat_header_layout = QHBoxLayout()
        chat_header_layout.setContentsMargins(16, 0, 16, 0)

        self.chat_title = QLabel("")
        self.chat_title.setFont(QFont("Segoe UI", 14, QFont.Bold))
        self.chat_title.setStyleSheet("color: #1e293b;")
        chat_header_layout.addWidget(self.chat_title)
        chat_header_layout.addStretch()
        self.chat_header.setLayout(chat_header_layout)
        right_layout.addWidget(self.chat_header)

        self.messages_area = QScrollArea()
        self.messages_area.setWidgetResizable(True)
        self.messages_area.setStyleSheet("border: none; background-color: #f9fafb;")

        self.messages_container = QWidget()
        self.messages_layout = QVBoxLayout()
        self.messages_layout.setContentsMargins(16, 16, 16, 16)
        self.messages_layout.setSpacing(12)
        self.messages_layout.addStretch()
        self.messages_container.setLayout(self.messages_layout)
        self.messages_area.setWidget(self.messages_container)
        right_layout.addWidget(self.messages_area)

        input_frame = QFrame()
        input_frame.setFixedHeight(100)
        input_frame.setStyleSheet("border-top: 1px solid #e5e7eb; background-color: white;")
        input_layout = QHBoxLayout()
        input_layout.setContentsMargins(16, 16, 16, 16)

        self.message_input = QTextEdit()
        self.message_input.setPlaceholderText("Type your message...")
        self.message_input.setMaximumHeight(60)
        self.message_input.setStyleSheet("""
            QTextEdit {
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                padding: 8px 16px;
                background-color: white;
                font-size: 13px;
            }
        """)

        self.send_btn = QPushButton("Send")
        self.send_btn.setFixedWidth(70)
        self.send_btn.setCursor(Qt.PointingHandCursor)
        self.send_btn.setStyleSheet("""
            QPushButton {
                background-color: #3b82f6;
                color: white;
                border-radius: 20px;
                padding: 8px 16px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #2563eb;
            }
        """)
        self.send_btn.clicked.connect(self.send_message)

        input_layout.addWidget(self.message_input)
        input_layout.addWidget(self.send_btn)
        input_frame.setLayout(input_layout)
        right_layout.addWidget(input_frame)

        right_panel.setLayout(right_layout)

        layout.addWidget(left_panel)
        layout.addWidget(right_panel, 1)

        self.setLayout(layout)

        self.no_chat_label = QLabel("Select a conversation to start messaging")
        self.no_chat_label.setAlignment(Qt.AlignCenter)
        self.no_chat_label.setStyleSheet("color: #9ca3af; font-size: 14px;")
        right_layout.insertWidget(1, self.no_chat_label)
        self.messages_area.hide()
        self.chat_header.hide()
        input_frame.hide()

    def load_data(self):
        try:
            get_chats = GetChats()
            self.chats = get_chats.getChats()
            self.load_other_users()
        except Exception as e:
            print(f"Failed to load chats: {e}")

    def load_other_users(self):
        for chat in self.chats:
            participants = chat.get('participants', [])
            for p in participants:
                if str(p) != str(self.user_data.get('id')):
                    try:
                        get_user = GetUser(p)
                        user = get_user.getUser()
                        self.other_users[chat.get('_id')] = user
                    except:
                        self.other_users[chat.get('_id')] = {'name': 'Unknown'}
        self.display_chats()

    def display_chats(self):
        self.chats_list.clear()

        if not self.chats:
            empty_item = QListWidgetItem("No conversations yet")
            empty_item.setTextAlignment(Qt.AlignCenter)
            empty_item.setForeground(QtCore.Qt.gray)
            self.chats_list.addItem(empty_item)
            return

        for chat in self.chats:
            chat_id = chat.get('_id')
            other_user = self.other_users.get(chat_id, {})
            name = other_user.get('name', 'Unknown')
            last_message = chat.get('lastMessage', 'No messages yet')
            updated_at = chat.get('updatedAt', '')

            item_widget = QWidget()
            item_layout = QHBoxLayout()
            item_layout.setContentsMargins(12, 12, 12, 12)

            name_label = QLabel(name)
            name_label.setFont(QFont("Segoe UI", 13, QFont.Bold))
            name_label.setStyleSheet("color: #1e293b;")

            msg_label = QLabel(last_message[:50])
            msg_label.setStyleSheet("color: #6b7280; font-size: 11px;")

            text_layout = QVBoxLayout()
            text_layout.addWidget(name_label)
            text_layout.addWidget(msg_label)

            item_layout.addLayout(text_layout)
            item_layout.addStretch()

            if updated_at:
                date_label = QLabel(updated_at[:10])
                date_label.setStyleSheet("color: #9ca3af; font-size: 10px;")
                item_layout.addWidget(date_label)

            item_widget.setLayout(item_layout)

            item = QListWidgetItem()
            item.setSizeHint(item_widget.sizeHint())
            item.setData(Qt.UserRole, chat)
            self.chats_list.addItem(item)
            self.chats_list.setItemWidget(item, item_widget)

    def on_chat_selected(self, item):
        self.current_chat = item.data(Qt.UserRole)
        self.current_chat_id = self.current_chat.get('_id')

        other_user = self.other_users.get(self.current_chat_id, {})
        name = other_user.get('name', 'Unknown')
        self.chat_title.setText(name)

        self.no_chat_label.hide()
        self.messages_area.show()
        self.chat_header.show()
        self.send_btn.parent().parent().show()

        self.load_messages()

    def load_messages(self):
        try:
            get_msgs = GetMessages(self.current_chat_id)
            self.messages = get_msgs.getMessages()
            self.display_messages()
        except Exception as e:
            print(f"Failed to load messages: {e}")

    def refresh_messages(self):
        if self.current_chat_id:
            self.load_messages()

    def display_messages(self):
        for i in reversed(range(self.messages_layout.count())):
            widget = self.messages_layout.itemAt(i).widget()
            if widget:
                widget.deleteLater()

        self.messages_layout.addStretch()

        for msg in self.messages:
            sender_id = msg.get('senderId')
            message_text = msg.get('message', '')
            is_own = str(sender_id) == str(self.user_data.get('id'))

            msg_widget = QWidget()
            msg_layout = QHBoxLayout()
            msg_layout.setContentsMargins(0, 4, 0, 4)

            bubble = QFrame()
            if is_own:
                bubble.setStyleSheet("""
                    QFrame {
                        background-color: #3b82f6;
                        border-radius: 18px;
                        padding: 8px 16px;
                    }
                """)
                bubble_layout = QHBoxLayout()
                msg_label = QLabel(message_text)
                msg_label.setStyleSheet("color: white; font-size: 13px;")
                msg_label.setWordWrap(True)
                bubble_layout.addWidget(msg_label)
                bubble.setLayout(bubble_layout)
                msg_layout.addStretch()
                msg_layout.addWidget(bubble)
            else:
                bubble.setStyleSheet("""
                    QFrame {
                        background-color: #f3f4f6;
                        border-radius: 18px;
                        padding: 8px 16px;
                    }
                """)
                bubble_layout = QHBoxLayout()
                msg_label = QLabel(message_text)
                msg_label.setStyleSheet("color: #1f2937; font-size: 13px;")
                msg_label.setWordWrap(True)
                bubble_layout.addWidget(msg_label)
                bubble.setLayout(bubble_layout)
                msg_layout.addWidget(bubble)
                msg_layout.addStretch()

            msg_widget.setLayout(msg_layout)
            self.messages_layout.insertWidget(self.messages_layout.count() - 1, msg_widget)

        self.scroll_to_bottom()

    def scroll_to_bottom(self):
        QTimer.singleShot(100, lambda: self.messages_area.verticalScrollBar().setValue(
            self.messages_area.verticalScrollBar().maximum()
        ))

    def send_message(self):
        message_text = self.message_input.toPlainText().strip()
        if not message_text or not self.current_chat_id:
            return

        try:
            create_msg = CreateMessage(message_text, self.current_chat_id)
            new_msg = create_msg.createMessage()
            self.messages.append(new_msg)
            self.display_messages()
            self.message_input.clear()
        except Exception as e:
            QMessageBox.warning(self, "Error", f"Failed to send message: {e}")

    def closeEvent(self, event):
        self.refresh_timer.stop()
        event.accept()