import sys, requests, asyncio, aiohttp
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QMovie
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QLineEdit, QVBoxLayout, QWidget
from dotenv import load_dotenv

class DeviceWindowStatus(QMainWindow):
    def __init__(self):
        super().__init__()

        self.label = QLabel(self)
        self.label.setAlignment(Qt.AlignCenter)

        # Create a QMovie object for the GIF
        self.movie = QMovie("path_to_your_gif.gif")

        # Set the movie to the label
        self.label.setMovie(self.movie)

        # Start the movie (GIF animation)
        self.movie.start()

        # Set the window properties
        self.setWindowTitle("GIF in PyQt5")
        self.setGeometry(100, 100, 400, 400)



class LoginWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Login Window")
        self.init_ui()

    def init_ui(self):
        # Create widgets
        self.label_username = QLabel("Username:")
        self.input_username = QLineEdit(self)

        self.label_password = QLabel("Password:")
        self.input_password = QLineEdit(self)
        self.input_password.setEchoMode(QLineEdit.Password)

        self.button_login = QPushButton("Login")
        self.button_login.clicked.connect(self.handle_login)

        # Set layout
        layout = QVBoxLayout()
        layout.addWidget(self.label_username)
        layout.addWidget(self.input_username)
        layout.addWidget(self.label_password)
        layout.addWidget(self.input_password)
        layout.addWidget(self.button_login)

        central_widget = QWidget(self)
        central_widget.setLayout(layout)
        self.setCentralWidget(central_widget)


    def handle_login(self):
        username = self.input_username.text()
        password = self.input_password.text()

        payload = {"username": username, "password": password}

        print(payload)

        response = (requests.post("http://localhost:3000/v1/account/login", json=payload))

        print(response.text)
