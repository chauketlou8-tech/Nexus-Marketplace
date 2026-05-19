from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.products.getProducts import GetProducts

class FetchProductsWorker(QThread):
    finished = pyqtSignal(list)
    error = pyqtSignal(str)

    def run(self):
        try:
            get_products = GetProducts()
            products = get_products.getProducts()
            self.finished.emit(products)
        except Exception as e:
            self.error.emit(str(e))