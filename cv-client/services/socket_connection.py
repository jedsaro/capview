import socketio
from functools import cached_property
from PyQt5.QtCore import pyqtSignal, QObject


class SocketConnection(QObject):
    connected = pyqtSignal()
    disconnected = pyqtSignal()
    error_ocurred = pyqtSignal(object, name="errorOcurred")
    data_changed = pyqtSignal(str, name="dataChanged")

    def __init__(self, parent=None):
        super().__init__(parent)
        self.sio.on("connect", self._handle_connect, namespace=None)
        self.sio.on("connect_error", self._handle_connect_error, namespace=None)
        self.sio.on("disconnect", self._handle_disconnect, namespace=None)
        self.sio.on("message", self._handle_message, namespace=None)
        self.auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiamVkc2Fyb0BvdXRsb29rLmNvbSIsInVzZXJuYW1lIjoiamVkc2FybzE0In0sImlhdCI6MTcyOTAzMTk1NH0.2srNPDyTT-AJU_clfsXAUGQIgUbOvzzYwBB9A32NwkQ"

    @cached_property
    def sio(self):
        return socketio.AsyncClient(
            reconnection=True,
            reconnection_attempts=3,
            reconnection_delay=5,
            reconnection_delay_max=5,
            logger=True,
        )

    async def start(self):
        await self.sio.connect(
            url="http://localhost:3000",
            headers={
                "Authorization": f"Bearer {self.auth_token}",
                "type": "device"}
        )

    def _handle_connect(self):
        self.connected.emit()

    def _handle_disconnect(self):
        self.disconnected.emit()

    def _handle_connect_error(self, data):
        self.error_ocurred.emit(data)

    def _handle_message(self, data):
        print(f"Received message: {data}")
        self.data_changed.emit(f"Message received: {data}")

    async def send_message(self, event_name, message):
        print(f"Emitting message: {message} to event: {event_name}")
        await self.sio.emit(event_name, message)
