from PyQt5.QtCore import QRunnable, QMetaObject, Qt, pyqtSignal, QObject
from PyQt5.QtGui import QPixmap
import requests


class ImageLoadSignals(QObject):
    finished = pyqtSignal(object)


class ImageLoadRunnable(QRunnable):
    def __init__(self, url):
        super().__init__()
        self.url = url
        self.signals = ImageLoadSignals()

    def run(self):
        try:
            response = requests.get(self.url, timeout=5)
            if response.status_code == 200:
                pixmap = QPixmap()
                pixmap.loadFromData(response.content)
                self.signals.finished.emit(pixmap)
            else:
                self.signals.finished.emit(None)
        except:
            self.signals.finished.emit(None)