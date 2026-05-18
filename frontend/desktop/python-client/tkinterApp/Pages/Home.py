from tkinter import Frame, Label, Button, Canvas, Tk


class HomePage(Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self.configure(bg="#0a0e27")

        top_bar = Frame(self, bg="#060b19", height=80)
        top_bar.pack(fill="x")
        top_bar.pack_propagate(False)

        logo = Label(top_bar, text="⚡ NEXUS", font=("Montserrat", 20, "bold"),
                     bg="#060b19", fg="#00d4ff")
        logo.pack(side="left", padx=40, pady=25)

        logout_btn = Button(top_bar, text="Exit", font=("Inter", 11),
                            bg="#ff3366", fg="white", bd=0, cursor="hand2",
                            activebackground="#cc0033", command=self.logout,
                            padx=20, pady=5)
        logout_btn.pack(side="right", padx=40, pady=22)

        main_area = Frame(self, bg="#0a0e27")
        main_area.pack(fill="both", expand=True, padx=50, pady=40)

        welcome = Label(main_area, text="Welcome back,", font=("Inter", 18),
                        bg="#0a0e27", fg="#6b7280")
        welcome.pack(anchor="w")

        name = Label(main_area, text="Thabo Mokoena", font=("Montserrat", 32, "bold"),
                     bg="#0a0e27", fg="#ffffff")
        name.pack(anchor="w")

        stats_frame = Frame(main_area, bg="#0a0e27")
        stats_frame.pack(fill="x", pady=40)

        stats = [
            ("📦 Active Listings", "12", "+3 this week"),
            ("💰 Total Earnings", "R4,250", "+18%"),
            ("⭐ Rating", "4.8", "from 45 reviews"),
            ("💬 Messages", "8", "3 unread")
        ]

        for i, (title, value, trend) in enumerate(stats):
            card = Frame(stats_frame, bg="#111827", relief="flat", bd=0)
            card.grid(row=0, column=i, padx=10, sticky="nsew")
            stats_frame.grid_columnconfigure(i, weight=1)

            Label(card, text=title, font=("Inter", 12), bg="#111827", fg="#9ca3af").pack(anchor="w", padx=20,
                                                                                         pady=(20, 5))
            Label(card, text=value, font=("Montserrat", 28, "bold"), bg="#111827", fg="#00d4ff").pack(anchor="w",
                                                                                                      padx=20)
            Label(card, text=trend, font=("Inter", 10), bg="#111827", fg="#10b981").pack(anchor="w", padx=20,
                                                                                         pady=(5, 20))

        recent_title = Label(main_area, text="Recent Activity", font=("Inter", 16, "bold"),
                             bg="#0a0e27", fg="#ffffff")
        recent_title.pack(anchor="w", pady=(30, 15))

        activities = [
            ("🛒", "Item sold: Gaming Mouse", "2 hours ago", "#00d4ff"),
            ("⭐", "New review on your listing", "5 hours ago", "#ffa500"),
            ("💬", "Message from buyer", "1 day ago", "#ff3366")
        ]

        for icon, text, time, color in activities:
            activity_card = Frame(main_area, bg="#111827", height=50)
            activity_card.pack(fill="x", pady=5)
            activity_card.pack_propagate(False)

            Label(activity_card, text=icon, font=("Segoe UI", 16), bg="#111827", fg=color).pack(side="left", padx=15,
                                                                                                pady=12)
            Label(activity_card, text=text, font=("Inter", 12), bg="#111827", fg="#d1d5db").pack(side="left", padx=10)
            Label(activity_card, text=time, font=("Inter", 10), bg="#111827", fg="#6b7280").pack(side="right", padx=15)

    def logout(self):
        self.controller.show_frame("AuthenticationPage")