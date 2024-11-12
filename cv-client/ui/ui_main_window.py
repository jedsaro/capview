import tkinter as tk
from tkinter import messagebox

class Login_Window:
    def __init__(self, root):
        self.root = root
        self.root.title("Login Window")
        self.root.geometry("300x300")

        # Username label and entry
        self.username_label = tk.Label(root, text="Username:")
        self.username_label.pack(pady=5)
        self.username_entry = tk.Entry(root)
        self.username_entry.pack(pady=5)

        # Password label and entry
        self.password_label = tk.Label(root, text="Password:")
        self.password_label.pack(pady=5)
        self.password_entry = tk.Entry(root, show="*")
        self.password_entry.pack(pady=5)

        # Login button
        self.login_button = tk.Button(root, text="Login", command=self.login)
        self.login_button.pack(pady=10)

    def login(self):
        username = self.username_entry.get()
        password = self.password_entry.get()

        # Replace this with your own username and password check logic
        if username == "admin" and password == "1234":
            messagebox.showinfo("Login Successful", "Welcome, admin!")
            self.open_main_window()  # Redirect to another window
        else:
            messagebox.showerror("Login Failed", "Invalid username or password.")

    def open_main_window(self):
        self.root.destroy()

        main_window = tk.Tk()
        main_window.title("Main Window")
        main_window.geometry("300x200")

        # Add content for the main window here
        label = tk.Label(main_window, text="Welcome to the main window!")
        label.pack(pady=20)

        main_window.mainloop()
