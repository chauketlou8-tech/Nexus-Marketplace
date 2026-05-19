from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.user.getUser import GetUser

class UserWorker(QThread):
    finished = pyqtSignal(str, str)

    def __init__(self, product_id, seller_id):
        super().__init__()
        self.product_id = product_id
        self.seller_id = seller_id

    def run(self):
        try:
            get_user = GetUser(self.seller_id)
            user = get_user.getUser()
            name = user.get('name', 'Unknown') if user else 'Unknown'
            self.finished.emit(self.product_id, name)
        except Exception:
            self.finished.emit(self.product_id, 'Unknown')