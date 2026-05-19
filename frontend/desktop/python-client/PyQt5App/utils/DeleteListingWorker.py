from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.listings.deleteListing import DeleteListing
from PyQt5App.api.products.deleteProduct import DeleteProduct

class DeleteListingWorker(QThread):
    finished = pyqtSignal(bool)
    error = pyqtSignal(str)

    def __init__(self, listing_id, product_id):
        super().__init__()
        self.listing_id = listing_id
        self.product_id = product_id

    def run(self):
        try:
            delete_listing = DeleteListing(self.listing_id)
            listing_deleted = delete_listing.deleteListing()

            if listing_deleted and self.product_id:
                delete_product = DeleteProduct(self.product_id)
                delete_product.deleteProduct()

            self.finished.emit(True)
        except Exception as e:
            self.error.emit(str(e))