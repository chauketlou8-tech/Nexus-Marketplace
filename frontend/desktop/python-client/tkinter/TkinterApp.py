from tkinter import Tk, Label

class NexusMarketplaceWindow(Tk):
    def __init__(self):
        super().__init__()
        self.title("Nexus Marketplace")
        self.geometry("900x600")
        welcome_label = Label(self, text="Welcome to the Nexus Marketplace python tkinter desktop App")
        welcome_label.pack()

def main():
    window = NexusMarketplaceWindow()
    window.mainloop()

if __name__ == '__main__':
    main()