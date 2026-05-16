from tkinter import Frame, Label, Entry, Button, Canvas
from tkinter import LEFT, RIGHT, X, W, VERTICAL
from tkinter import ttk


class SignUpPage(Frame):
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

        Label(left_frame, text="Join the Community", font=("Segoe UI", 14),
              bg="#1e40af", fg="#bfdbfe").pack(anchor="w", padx=40, pady=(0, 50))

        Label(left_frame, text="Create your account to start buying and selling within the UCT community",
              font=("Segoe UI", 12), bg="#1e40af", fg="#e0e7ff", wraplength=250,
              justify="left").pack(anchor="w", padx=40, pady=(40, 20))

        features = "• Verified UCT community\n• Secure transactions\n• Student marketplace"
        Label(left_frame, text=features, font=("Segoe UI", 11),
              bg="#1e40af", fg="#e0e7ff", justify="left").pack(anchor="w", padx=40)

        canvas = Canvas(right_frame, bg="white", highlightthickness=0)
        scrollbar = ttk.Scrollbar(right_frame, orient="vertical", command=canvas.yview)
        scrollable_frame = Frame(canvas, bg="white")

        scrollable_frame.bind("<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        Label(scrollable_frame, text="Create an account", font=("Segoe UI", 28, "bold"),
              bg="white", fg="#111827").pack(anchor="w", padx=50, pady=(40, 5))

        Label(scrollable_frame, text="Sign up with your UCT email to get started",
              font=("Segoe UI", 12), bg="white", fg="#6b7280").pack(anchor="w", padx=50, pady=(0, 30))

        Label(scrollable_frame, text="FULL NAME", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", padx=50, pady=(10, 5))

        self.name_entry = Entry(scrollable_frame, font=("Segoe UI", 12),
                                bg="white", fg="#111827", relief="solid", bd=1)
        self.name_entry.pack(fill="x", padx=50, pady=(0, 15), ipady=8)
        self.name_entry.insert(0, "Thabo Mokoena")

        Label(scrollable_frame, text="UCT EMAIL", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", padx=50, pady=(5, 5))

        self.email_entry = Entry(scrollable_frame, font=("Segoe UI", 12),
                                 bg="white", fg="#111827", relief="solid", bd=1)
        self.email_entry.pack(fill="x", padx=50, pady=(0, 15), ipady=8)
        self.email_entry.insert(0, "student@uct.ac.za")

        row_frame = Frame(scrollable_frame, bg="white")
        row_frame.pack(fill="x", padx=50, pady=(0, 15))

        course_frame = Frame(row_frame, bg="white")
        course_frame.pack(side="left", fill="x", expand=True, padx=(0, 10))

        Label(course_frame, text="COURSE", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", pady=(0, 5))

        self.course_entry = Entry(course_frame, font=("Segoe UI", 12),
                                  bg="white", fg="#111827", relief="solid", bd=1)
        self.course_entry.pack(fill="x", ipady=8)
        self.course_entry.insert(0, "Computer Science")

        year_frame = Frame(row_frame, bg="white")
        year_frame.pack(side="left", fill="x", expand=True)

        Label(year_frame, text="YEAR", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", pady=(0, 5))

        self.year_entry = Entry(year_frame, font=("Segoe UI", 12),
                                bg="white", fg="#111827", relief="solid", bd=1)
        self.year_entry.pack(fill="x", ipady=8)
        self.year_entry.insert(0, "1")

        Label(scrollable_frame, text="PASSWORD", font=("Segoe UI", 10, "bold"),
              bg="white", fg="#374151").pack(anchor="w", padx=50, pady=(5, 5))

        self.password_entry = Entry(scrollable_frame, font=("Segoe UI", 12),
                                    bg="white", fg="#111827", relief="solid", bd=1, show="•")
        self.password_entry.pack(fill="x", padx=50, pady=(0, 25), ipady=8)
        self.password_entry.insert(0, "Create a strong password")

        self.signup_btn = Button(scrollable_frame, text="Sign Up", font=("Segoe UI", 12, "bold"),
                                 bg="#3b82f6", fg="white", bd=0, cursor="hand2",
                                 activebackground="#2563eb", activeforeground="white")
        self.signup_btn.pack(fill="x", padx=50, pady=(10, 20), ipady=8)

        separator = Frame(scrollable_frame, height=1, bg="#e5e7eb")
        separator.pack(fill="x", padx=50, pady=20)

        login_frame = Frame(scrollable_frame, bg="white")
        login_frame.pack(pady=20)

        Label(login_frame, text="Already have an account?", font=("Segoe UI", 11),
              bg="white", fg="#6b7280").pack(side="left")

        self.login_link = Label(login_frame, text="Sign in", font=("Segoe UI", 11, "bold"),
                                bg="white", fg="#3b82f6", cursor="hand2")
        self.login_link.pack(side="left", padx=(5, 0))
        self.login_link.bind("<Button-1>", lambda e: controller.show_frame("LoginPage"))

        self.error_label = Label(scrollable_frame, text="", font=("Segoe UI", 10),
                                 bg="white", fg="#dc2626")
        self.error_label.pack(pady=(10, 20))

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")