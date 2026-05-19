from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5.QtGui import QPixmap
import requests


class ImageLoadWorker(QThread):
    finished = pyqtSignal(object, object)

    def __init__(self, product_id, url):
        super().__init__()
        self.product_id = product_id
        self.url = url

    def run(self):
        try:
            response = requests.get(self.url, timeout=5)
            if response.status_code == 200:
                pixmap = QPixmap()
                pixmap.loadFromData(response.content)
                self.finished.emit(self.product_id, pixmap)
            else:
                self.finished.emit(self.product_id, None)
        except:
            self.finished.emit(self.product_id, None)