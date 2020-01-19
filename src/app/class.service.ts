import { Injectable } from "@angular/core";
import { Class } from "./add-class/class.model";
import { Subject } from "rxjs";
import { Student } from "./add-class/student.model";

@Injectable({
  providedIn: "root"
})
export class ClassService {
  constructor() {
    if (localStorage.getItem("classList") !== null) {
      this.classList = JSON.parse(localStorage.getItem("classList"));
    }
  }
  private classList: Class[] = [];
  private classUpdated = new Subject<Class[]>();

  getClassList() {
    return [...this.classList];
  }

  getStudentList(id) {
    if (this.classList === []) {
      return;
    }
    return this.classList[id].students;
  }

  // getPresentStudent(id, student) {
  //   const studentsList = this.classList[id].students;
  //   return studentsList[
  //     studentsList.findIndex(std => std.rollno === student.rollno)
  //   ];
  // }

  markAttendance(id, student) {
    this.classList[id].students[
      this.classList[id].students.findIndex(std =>
        std.rollno === student.rollno
          ? (std.attendance = true)
          : (std.attendance = false)
      )
    ];
    localStorage.setItem("classList", JSON.stringify(this.classList));
    this.classUpdated.next([...this.classList]);
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
