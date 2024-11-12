import requests

class Network(requests):
    def __init__(self):
        super().__init__()
        self.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
