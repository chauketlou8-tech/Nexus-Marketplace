from tkinter import Frame, Label, Entry, Button, Canvas, Tk
from tkinter import ttk


class SignUpPage(Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller
        self.login_clicked = None

        self.configure(bg="#0a0e27")

        canvas = Canvas(self, bg="#0a0e27", highlightthickness=0)
        canvas.pack(fill="both", expand=True)

        canvas.create_rectangle(0, 0, 550, 700, fill="#060b19", outline="")

        canvas.create_text(275, 100, text="Join the", font=("Montserrat", 36, "bold"),
                           fill="#ffffff", anchor="center")

        canvas.create_text(275, 145, text="Community", font=("Montserrat", 36, "bold"),
                           fill="#00d4ff", anchor="center")

        canvas.create_text(275, 210, text="Start your journey with us", font=("Inter", 13),
                           fill="#6b7280", anchor="center")

        features = ["✓ Verified UCT Students", "✓ Secure Transactions", "✓ 24/7 Support"]
        y = 270
        for f in features:
            canvas.create_text(275, y, text=f, font=("Inter", 11),
                               fill="#9ca3af", anchor="center")
            y += 30

        scroll_canvas = Canvas(self, bg="#111827", highlightthickness=0)
        scroll_canvas.place(x=600, y=80, width=420, height=580)

        scrollbar = ttk.Scrollbar(self, orient="vertical", command=scroll_canvas.yview)
        scrollbar.place(x=1005, y=80, height=580)
        scroll_canvas.configure(yscrollcommand=scrollbar.set)

        scrollable = Frame(scroll_canvas, bg="#111827")
        scroll_canvas.create_window((0, 0), window=scrollable, anchor="nw", width=418)

        Label(scrollable, text="Create Account", font=("Montserrat", 24, "bold"),
              bg="#111827", fg="#ffffff").pack(anchor="w", padx=30, pady=(30, 5))

        Label(scrollable, text="Get started in seconds", font=("Inter", 12),
              bg="#111827", fg="#6b7280").pack(anchor="w", padx=30, pady=(0, 30))

        fields = [
            ("Full Name", "Thabo Mokoena"),
            ("UCT Email", "student@uct.ac.za"),
            ("Course", "Computer Science"),
            ("Year", "1st Year"),
            ("Password", "Create a strong password")
        ]

        self.entries = {}

        for label, placeholder in fields:
            Label(scrollable, text=label.upper(), font=("Inter", 10, "bold"),
                  bg="#111827", fg="#9ca3af").pack(anchor="w", padx=30, pady=(15, 5))

            entry = Entry(scrollable, font=("Inter", 12), bg="#1f2937",
                          fg="#ffffff", relief="flat", insertbackground="#00d4ff")
            entry.pack(fill="x", padx=30, ipady=10)
            entry.insert(0, placeholder)

            def on_focus(event, e=entry, p=placeholder):
                if e.get() == p:
                    e.delete(0, "end")
                    if p == "Create a strong password":
                        e.config(show="•")

            entry.bind("<FocusIn>", on_focus)
            self.entries[label] = entry

        self.signup_btn = Button(scrollable, text="Sign Up", font=("Inter", 12, "bold"),
                                 bg="#00d4ff", fg="#060b19", bd=0, cursor="hand2",
                                 activebackground="#00b8e6", command=self.signup)
        self.signup_btn.pack(fill="x", padx=30, pady=(30, 20), ipady=10)

        separator = Frame(scrollable, height=1, bg="#2a2a2a")
        separator.pack(fill="x", padx=30, pady=15)

        login_frame = Frame(scrollable, bg="#111827")
        login_frame.pack(pady=20)

        Label(login_frame, text="Already have an account?", font=("Inter", 11),
              bg="#111827", fg="#6b7280").pack(side="left")

        self.login_btn = Label(login_frame, text="Sign In", font=("Inter", 11, "bold"),
                               bg="#111827", fg="#00d4ff", cursor="hand2")
        self.login_btn.pack(side="left", padx=(8, 0))
        self.login_btn.bind("<Button-1>", lambda e: self.login_clicked() if self.login_clicked else None)

        self.error_label = Label(scrollable, text="", font=("Inter", 10),
                                 bg="#111827", fg="#ff3366")
        self.error_label.pack(pady=(10, 30))

        scrollable.update_idletasks()
        scroll_canvas.configure(scrollregion=scroll_canvas.bbox("all"))

    def signup(self):
        email = self.entries["UCT Email"].get().strip()
        if "@uct.ac.za" in email:
            self.error_label.config(text="")
            self.login_clicked()
        else:
            self.error_label.config(text="Please use a valid UCT pythonEmail address")