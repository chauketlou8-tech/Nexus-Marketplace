from tkinter import Frame, Label, Entry, Button, Canvas


class LoginPage(Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self.signup_clicked = None

        self.configure(bg="#0a0e27")

        canvas = Canvas(self, bg="#0a0e27", highlightthickness=0)
        canvas.pack(fill="both", expand=True)

        canvas.create_rectangle(0, 0, 550, 700, fill="#060b19", outline="")

        canvas.create_text(275, 120, text="NEXUS", font=("Montserrat", 42, "bold"),
                           fill="#00d4ff", anchor="center")

        canvas.create_text(275, 170, text="Marketplace", font=("Montserrat", 24),
                           fill="#ffffff", anchor="center")

        canvas.create_text(275, 240, text="Connect · Trade · Grow", font=("Inter", 12),
                           fill="#6b7280", anchor="center")

        features = ["✓ Secure Authentication", "✓ Real-time Analytics", "✓ Student Verified"]
        y = 300
        for f in features:
            canvas.create_text(275, y, text=f, font=("Inter", 11),
                               fill="#9ca3af", anchor="center")
            y += 30

        card = Frame(self, bg="#111827", relief="flat")
        card.place(x=600, y=100, width=420, height=500)

        Label(card, text="Sign in", font=("Montserrat", 28, "bold"),
              bg="#111827", fg="#ffffff").pack(anchor="w", padx=35, pady=(40, 5))

        Label(card, text="Welcome back to Nexus", font=("Inter", 12),
              bg="#111827", fg="#6b7280").pack(anchor="w", padx=35, pady=(0, 30))

        Label(card, text="EMAIL", font=("Inter", 11, "bold"),
              bg="#111827", fg="#9ca3af").pack(anchor="w", padx=35, pady=(10, 5))

        self.email_entry = Entry(card, font=("Inter", 12), bg="#1f2937",
                                 fg="#ffffff", relief="flat", insertbackground="#00d4ff")
        self.email_entry.pack(fill="x", padx=35, pady=(0, 20), ipady=10)

        Label(card, text="PASSWORD", font=("Inter", 11, "bold"),
              bg="#111827", fg="#9ca3af").pack(anchor="w", padx=35, pady=(5, 5))

        self.password_entry = Entry(card, font=("Inter", 12), show="•",
                                    bg="#1f2937", fg="#ffffff", relief="flat", insertbackground="#00d4ff")
        self.password_entry.pack(fill="x", padx=35, pady=(0, 30), ipady=10)

        self.login_btn = Button(card, text="Sign In", font=("Inter", 12, "bold"),
                                bg="#00d4ff", fg="#060b19", bd=0, cursor="hand2",
                                activebackground="#00b8e6", command=self.login)
        self.login_btn.pack(fill="x", padx=35, pady=(0, 20), ipady=10)

        separator = Frame(card, height=1, bg="#2a2a2a")
        separator.pack(fill="x", padx=35, pady=20)

        signup_frame = Frame(card, bg="#111827")
        signup_frame.pack(pady=15)

        Label(signup_frame, text="New to Nexus?", font=("Inter", 11),
              bg="#111827", fg="#6b7280").pack(side="left")

        self.signup_btn = Label(signup_frame, text="Create Account", font=("Inter", 11, "bold"),
                                bg="#111827", fg="#00d4ff", cursor="hand2")
        self.signup_btn.pack(side="left", padx=(8, 0))
        self.signup_btn.bind("<Button-1>", lambda e: self.signup_clicked() if self.signup_clicked else None)

        self.error_label = Label(card, text="", font=("Inter", 10),
                                 bg="#111827", fg="#ff3366")
        self.error_label.pack(pady=(10, 0))

    def login(self):
        email = self.email_entry.get().strip()
        password = self.password_entry.get().strip()

        if not email or not password:
            self.error_label.config(text="Please fill in all fields")
            return

        if "@uct.ac.za" in email and password:
            self.error_label.config(text="")
            self.controller.show_frame("HomePage")
        else:
            self.error_label.config(text="Invalid email or password")