import platform
import psutil

class SystemInfoService:
    def __init__(self):
        self.system_info = platform.uname()
        self.cpu_info = platform.processor()
        self.cpu_count = psutil.cpu_count(logical=False)
        self.logical_cpu_count = psutil.cpu_count(logical=True)
        self.memory_info = psutil.virtual_memory()
        self.partitions = psutil.disk_partitions()
        self.disk_info = psutil.disk_usage('/')

    def get_basic_system_info(self):
        return {
            "computer_name": self.system_info.node,
            "release": self.system_info.release,
            "machine": self.system_info.machine,
            "processor": self.system_info.processor,
            "memory_utilization_percent": self.memory_info.percent,
            "used_disk_space_bytes": self.disk_info.used,
            "disk_space_utilization_percent": self.disk_info.percent,
            "free_disk_space_bytes": self.disk_info.free,
            "total_disk_space_bytes": self.disk_info.total,
        }

    def get_cpu_info(self):
        return {
            "processor": self.cpu_info,
            "physical_cores": self.cpu_count,
            "logical_cores": self.logical_cpu_count
        }

    def get_memory_info(self):
        return {
            "total_memory_gb": self.memory_info.total / 1_000_000_000,
            "available_memory_gb": self.memory_info.available / 1_000_000_000,
            "used_memory_gb": self.memory_info.used / 1_000_000_000,
            "memory_utilization_percent": self.memory_info.percent
        }

    def get_disk_info(self):
        return {
            "total_disk_space_bytes": self.disk_info.total,
            "used_disk_space_bytes": self.disk_info.used,
            "free_disk_space_bytes": self.disk_info.free,
            "disk_space_utilization_percent": self.disk_info.percent
        }
