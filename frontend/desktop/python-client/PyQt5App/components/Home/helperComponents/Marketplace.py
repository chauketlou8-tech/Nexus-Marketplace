import sys
from PyQt5.QtWidgets import QApplication, QWidget
from PyQt5App.api.products.getProducts import GetProducts

class Marketplace(QWidget):
    def __init__(self):
        super().__init__()
        self.productsEngine = GetProducts()
        self.products = self.productsEngine.getProducts()

    def initUI(self):
        pass