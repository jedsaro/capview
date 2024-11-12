from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtWidgets import QLabel, QMainWindow, QVBoxLayout, QWidget
from services.computer import SystemInfoService  # Ensure this path is correct

class View(QMainWindow):
    def __init__(self, parent=None):
        super().__init__(parent)

        # Initialize system info service
        self.system_info_service = SystemInfoService()

        # Set up the UI components
        central_widget = QWidget(self)
        layout = QVBoxLayout(central_widget)
        self.label = QLabel("Waiting for data...", alignment=Qt.AlignCenter)
        layout.addWidget(self.label)

        self.setCentralWidget(central_widget)
        self.resize(640, 480)
        self.setWindowTitle("CapView-Client (1.0)")

        # Set up a timer to refresh data every 5 seconds
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.refresh_data)
        self.timer.start(5000)  # 5 seconds

        self.refresh_data()  # Initial data load

    def refresh_data(self):
        # Fetch system info and update the label
        system_info = self.system_info_service.get_basic_system_info()
        self.update_data(system_info)

    def update_data(self, data):
        # Format the data to display in the QLabel
        message = (
            f"Computer Name: {data['computer_name']}\n"
            f"OS Release: {data['release']}\n"
            f"Machine Type: {data['machine']}\n"
            f"Processor: {data['processor']}\n"
            f"Memory Utilization: {data['memory_utilization_percent']}%\n"
            f"Used Disk Space: {data['used_disk_space_bytes'] // (1024 ** 3)} GB\n"
            f"Disk Utilization: {data['disk_space_utilization_percent']}%\n"
            f"Free Disk Space: {data['free_disk_space_bytes'] // (1024 ** 3)} GB\n"
            f"Total Disk Space: {data['total_disk_space_bytes'] // (1024 ** 3)} GB"
        )
        self.label.setText(message)