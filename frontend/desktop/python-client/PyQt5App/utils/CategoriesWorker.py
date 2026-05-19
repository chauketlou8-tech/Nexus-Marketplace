from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.categories.getCategories import GetCategories

class CategoriesWorker(QThread):
    finished = pyqtSignal(list)
    error = pyqtSignal(str)

    def run(self):
        try:
            get_categories = GetCategories()
            categories = get_categories.getCategories()
            self.finished.emit(categories)
        except Exception as e:
            self.error.emit(str(e))