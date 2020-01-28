import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClassService } from "../class.service";
import { ModalController } from "@ionic/angular";

import { Student } from "../add-class/student.model";
import { AddStudentPage } from "../add-student/add-student.page";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.page.html",
  styleUrls: ["./student-list.page.scss"]
})
export class StudentListPage implements OnInit {
  classList;
  studentList;
  paramsId;
  date;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.paramsId = this.route.snapshot.paramMap.get("id");
    this.date = this.route.snapshot.paramMap.get("date");
    this.studentList = this.classService.getStudentList(this.date, this.paramsId);
  }
  deleteStudent(stdId) {
    this.classService.deleteStudent(this.date, this.paramsId, stdId);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddStudentPage,
      backdropDismiss: true,
      componentProps: {
        paramsId: this.paramsId,
        date: this.date,
      }
    });
    return await modal.present();
  }
}
