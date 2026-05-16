from PyQt5.QtCore import Thread, pyqtSignal

class SignupWorker(QThread):
    result_label = pyqtSignal(str)