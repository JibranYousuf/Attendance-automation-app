import { Injectable } from "@angular/core";
import { Class } from "./add-class/class.model";
import { Subject } from "rxjs";
import { Student } from "./add-class/student.model";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ClassService {
  constructor(public toastController: ToastController) {
    if (localStorage.getItem("classList") !== null) {
      this.classList = JSON.parse(localStorage.getItem("classList"));
    }
  }
  private classList: Class[] = [];
  private classUpdated = new Subject<Class[]>();

  showToast(msg) {
    this.toastController
      .create({
        message: msg,
        duration: 2000,
        animated: true,
        showCloseButton: true,
        closeButtonText: "OK",
        cssClass: "my-toast",
        position: "bottom"
      })
      .then(obj => {
        obj.present();
      });
  }

  getClassList() {
    return [...this.classList];
  }

  getStudentList(id) {
    if (this.classList === []) {
      return;
    }
    return this.classList[id].students;
  }

  deleteClass(id) {
    let classItem = Number(id);
    this.classList.splice(classItem, 1);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next([...this.classList]);
  }

  deleteStudent(classId, studentId) {
    this.classList[classId].students.splice(studentId, 1);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next([...this.classList]);
  }

  markAttendance(id, rollno) {
    // this.classList[id].students[
    //   this.classList[id].students.findIndex(std =>
    //     std.rollno === rollno
    //       ? ((std.attendance = true),
    //         this.showToast("attendance marked successfuly"))
    //       : ((std.attendance = false), this.showToast("Student not found"))
    //   )
    // ];
    let students = this.classList[id].students;
    let presentStudentIndex = students.findIndex(std => std.rollno === rollno);

    if (presentStudentIndex == -1) {
      this.showToast("Student not found");
      return;
    } else {
      students[presentStudentIndex].attendance = true;
      this.showToast("Attendance marked successfully");
      localStorage.setItem("classList", JSON.stringify(this.classList));
      this.classUpdated.next([...this.classList]);
    }
  }

  getClassUpdateListener() {
    return this.classUpdated.asObservable();
  }

  addClass(StudentClass: Class) {
    this.classList.push(StudentClass);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next([...this.classList]);
  }

  addStudent(paramId: string, student: Student) {
    this.classList[paramId].students.push(student);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next([...this.classList]);
  }
}
