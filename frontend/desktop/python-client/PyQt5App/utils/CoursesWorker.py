from PyQt5.QtCore import QThread, pyqtSignal
from PyQt5App.api.courses.getCourses import GetCourses

class CoursesWorker(QThread):
    finished = pyqtSignal(list)
    error = pyqtSignal(str)

    def run(self):
        try:
            get_courses = GetCourses()
            courses = get_courses.getCourses()
            self.finished.emit(courses)
        except Exception as e:
            self.error.emit(str(e))