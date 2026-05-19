from PyQt5.QtGui import QPixmap
from PyQt5.QtCore import QThread, pyqtSignal
import requests

class ImageLoader(QThread):
    finished = pyqtSignal(object)

    def __init__(self, url):
        super().__init__()
        self.url = url

    def run(self):
        try:
            print(f"Loading image: {self.url}")
            response = requests.get(self.url, timeout=5)
            print(f"Response status: {response.status_code}")
            if response.status_code == 200:
                pixmap = QPixmap()
                pixmap.loadFromData(response.content)
                self.finished.emit(pixmap)
            else:
                self.finished.emit(None)
        except Exception as e:
            print(f"Image load error: {e}")
            self.finished.emit(None)