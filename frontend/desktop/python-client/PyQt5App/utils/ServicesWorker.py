from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.services.getServices import GetServices

class ServicesWorker(QThread):
    finished = pyqtSignal(list)
    error = pyqtSignal(str)

    def run(self):
        try:
            get_services = GetServices()
            services = get_services.getServices()
            self.finished.emit(services)
        except Exception as e:
            self.error.emit(str(e))