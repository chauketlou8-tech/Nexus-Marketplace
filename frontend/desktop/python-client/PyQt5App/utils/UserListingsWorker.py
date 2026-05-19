from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.listings.getUserListings import GetUserListings

class UserListingsWorker(QThread):
    finished = pyqtSignal(list)
    error = pyqtSignal(str)

    def run(self):
        try:
            get_listings = GetUserListings()
            listings = get_listings.getUserListings()
            self.finished.emit(listings)
        except Exception as e:
            self.error.emit(str(e))