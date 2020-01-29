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
      this.classList = JSON.parse(localStorage.getItem("classList")) || {};
    }
  }

  private classList: Record<string, Class[]> = {};
  private classUpdated = new Subject<Record<string, Class[]>>();

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

  /**
   * gets class data
   * @param date 
   */
  getClassList(date): Class[] {
    return this.classList[date] || [];
  }

  /**
   * get students data
   * @param date - date from filter
   * @param id - student id
   */
  getStudentList(date, id): Student[] {
    if (this.classList[date]) {
      return this.classList[date][id].students;
    }
  }

  /**
   * get data by class Id
   * @param date date by filter
   * @param id 
   */
  deleteClass(date, id) {
    if (!this.classList[date]) {
      return;
    }
    let classItem = Number(id);
    this.classList[date].splice(classItem, 1);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next(this.classList);
  }

  /**
   * delete student by class and student id
   * @param date date by filter
   * @param classId 
   * @param studentId 
   */
  deleteStudent(date, classId, studentId) {
    if (!this.classList[date]) {
      return;
    }
    this.classList[date][classId].students.splice(studentId, 1);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next(this.classList);
  }

  markAttendance(date, id, rollno) {
    // this.classList[id].students[
    //   this.classList[id].students.findIndex(std =>
    //     std.rollno === rollno
    //       ? ((std.attendance = true),
    //         this.showToast("attendance marked successfuly"))
    //       : ((std.attendance = false), this.showToast("Student not found"))
    //   )
    // ];
    if (!this.classList[date]) {
      return;
    }
    let students = this.classList[date][id].students;
    let presentStudentIndex = students.findIndex(std => std.rollno === rollno);

    if (presentStudentIndex == -1) {
      this.showToast("Student not found");
      return;
    } else {
      students[presentStudentIndex].attendance = true;
      this.showToast("Attendance marked successfully");
      localStorage.setItem("classList", JSON.stringify(this.classList));
      this.classUpdated.next(this.classList);
    }
  }

  getClassUpdateListener() {
    return this.classUpdated.asObservable();
  }

  addClass(date, StudentClass: Class) {
    this.classList[date] = [StudentClass];
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next(this.classList);
  }

  addStudent(date, paramId: string, student: Student) {
    this.classList[date][paramId].students.push(student);
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next(this.classList);
  }
}
