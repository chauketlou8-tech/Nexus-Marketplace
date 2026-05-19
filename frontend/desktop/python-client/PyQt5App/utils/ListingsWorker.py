from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.listings.getListings import GetListings

class ListingsWorker(QThread):
    finished = pyqtSignal(dict)
    error = pyqtSignal(str)

    def run(self):
        try:
            get_listings = GetListings()
            listings = get_listings.getListings()
            listings_dict = {}
            for listing in listings:
                item_id = listing.get('itemId')
                if item_id:
                    listings_dict[item_id] = listing.get('createdAt')
            self.finished.emit(listings_dict)
        except Exception as e:
            self.error.emit(str(e))