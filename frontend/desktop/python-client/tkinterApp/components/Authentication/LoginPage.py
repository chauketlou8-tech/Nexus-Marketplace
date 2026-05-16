from tkinter import Frame, Label, Entry, Button
from tkinter import LEFT, RIGHT, X, W


class LoginPage(Frame):
    def __init__(self, parent, controller):
        super().__init__(parent)
        self.controller = controller

        self.configure(bg="#f0f2f5")

        left_frame = Frame(self, bg="#1e40af", width=350)
        left_frame.pack(side="left", fill="both", expand=True)

        right_frame = Frame(self, bg="white")
        right_frame.pack(side="right", fill="both", expand=True)

        left_frame.pack_propagate(False)

        Label(left_frame, text="Nexus Marketplace", font=("Segoe UI", 28, "bold"),
              bg="#1e40af", fg="white").pack(anchor="w", padx=40, pady=(60, 5))

        Label(left_frame, text="Enterprise Platform", font=("Segoe UI", 14),
              bg="#1e40af", fg="#bfdbfe").pack(anchor="w", padx=40, pady=(0, 50))

        Label(left_frame, text="Secure marketplace solution for UCT community",
              font=("Segoe UI", 12), bg="#1e40af", fg="#e0e7ff", wraplength=250,
              justify="left").pack(anchor="w", padx=40, pady=(40, 20))

        features = "• Secure authentication\n• Role-based access\n• Real-time analytics"
        Label(left_frame, text=features, font=("Segoe UI", 11),
              bg="#1e40af", fg="#e0e7ff", justify="left").pack(anchor="w", padx=40)

        Label(right_frame, text="Sign in", font=("Segoe UI", 30, "bold"),
              bg="white", fg="#111827").pack(anchor="w", padx=50, pady=(60, 5))

        Label(right_frame, text="Access your Nexus Marketplace account",
              font=("Segoe UI", 12), bg="white", fg="#6b7280").pack(anchor="w", padx=50, pady=(0, 30))

        Label(right_frame, text="UCT EMAIL", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", padx=50, pady=(10, 5))

        self.email_entry = Entry(right_frame, font=("Segoe UI", 12),
                                 bg="white", fg="#111827", relief="solid", bd=1)
        self.email_entry.pack(fill="x", padx=50, pady=(0, 15), ipady=8)
        self.email_entry.insert(0, "student@myuct.ac.za")

        Label(right_frame, text="PASSWORD", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", padx=50, pady=(5, 5))

        self.password_entry = Entry(right_frame, font=("Segoe UI", 12),
                                    bg="white", fg="#111827", relief="solid", bd=1, show="•")
        self.password_entry.pack(fill="x", padx=50, pady=(0, 25), ipady=8)
        self.password_entry.insert(0, "Enter your password")

        self.login_btn = Button(right_frame, text="Sign in", font=("Segoe UI", 12, "bold"),
                                bg="#3b82f6", fg="white", bd=0, cursor="hand2",
                                activebackground="#2563eb", activeforeground="white")
        self.login_btn.pack(fill="x", padx=50, pady=(10, 20), ipady=8)

        separator = Frame(right_frame, height=1, bg="#e5e7eb")
        separator.pack(fill="x", padx=50, pady=20)

        signup_frame = Frame(right_frame, bg="white")
        signup_frame.pack(pady=20)

        Label(signup_frame, text="Don't have an account?", font=("Segoe UI", 11),
              bg="white", fg="#6b7280").pack(side="left")

        self.signup_link = Label(signup_frame, text="Sign up", font=("Segoe UI", 11, "bold"),
                                 bg="white", fg="#3b82f6", cursor="hand2")
        self.signup_link.pack(side="left", padx=(5, 0))
        self.signup_link.bind("<Button-1>", lambda e: controller.show_frame("SignUpPage"))

        self.error_label = Label(right_frame, text="", font=("Segoe UI", 10),
                                 bg="white", fg="#dc2626")
        self.error_label.pack(pady=(10, 0))