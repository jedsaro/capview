import schedule
import asyncio
from services.computer import SystemInfoService

class StatusController():
    def __init__(self, socket):
        self.socket = socket
        self.computer = SystemInfoService()
        self.running = True
        asyncio.create_task(self.status_updater())

    async def status_updater(self):
        disk_info = self.computer.get_disk_info()
        free_disk_space_percentage = disk_info["disk_space_utilization_percent"]

        if free_disk_space_percentage > 80:
            print("Time to change disk")

        # Job function to send disk space data
        async def job():
            message = self.computer.get_basic_system_info()
            await self.socket.send_message("message", message)  # Send message asynchronously

        # Schedule job every 5 seconds
        schedule.every(2).seconds.do(lambda: asyncio.create_task(job()))

        while self.running:
            schedule.run_pending()
            await asyncio.sleep(1)
