import asyncio, sys, qasync
from PyQt5.QtWidgets import QApplication
from services.status_controller import StatusController
from services.socket_connection import SocketConnection
from ui.device_status_ui import View


def main():
    app = QApplication(sys.argv)
    loop = qasync.QEventLoop(app)
    asyncio.set_event_loop(loop)
    socket = SocketConnection()
    view = View()
    view.show()

    async def setup():
        StatusController(socket=socket)
        await socket.start()

    with loop:
        asyncio.ensure_future(setup())
        loop.run_forever()


if __name__ == "__main__":
    main()
