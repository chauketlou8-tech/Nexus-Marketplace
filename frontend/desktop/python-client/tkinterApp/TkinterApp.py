from tkinter import Tk, Frame
from tkinterApp.Pages.Authentication import AuthenticationPage
from tkinterApp.Pages.Home import HomePage


class NexusMarketplaceApp(Tk):
    def __init__(self):
        super().__init__()
        self.title("Nexus Marketplace")
        self.geometry("1100x700")
        self.resizable(False, False)

        self.container = Frame(self)
        self.container.pack(fill="both", expand=True)

        self.frames = {}

        for Page in (AuthenticationPage, HomePage):
            page_name = Page.__name__
            frame = Page(self.container, self)
            self.frames[page_name] = frame
            frame.grid(row=0, column=0, sticky="nsew")

        self.container.grid_rowconfigure(0, weight=1)
        self.container.grid_columnconfigure(0, weight=1)

        self.show_frame("AuthenticationPage")

    def show_frame(self, page_name):
        frame = self.frames[page_name]
        frame.tkraise()


def main():
    app = NexusMarketplaceApp()
    app.mainloop()


if __name__ == "__main__":
    main()