import { Component, OnInit, Input } from "@angular/core";
import { ToastController, ModalController, NavParams } from "@ionic/angular";
import { ClassService } from "../class.service";
import { Student } from "../add-class/student.model";
import { ActivatedRoute } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
// import { Attendance } from "../attendance-list/attendance.model";

@Component({
  selector: "app-take-attendance",
  templateUrl: "./take-attendance.page.html",
  styleUrls: ["./take-attendance.page.scss"]
})
export class TakeAttendancePage implements OnInit {
  @Input() paramsId: string;
  student: Student = {
    name: "",
    rollno: "",
    attendance: false
  };
  studentList;
  presentStudent;
  todayDate;
  constructor(
    private barcodeScanner: BarcodeScanner,
    public toastController: ToastController,
    public modalCtrl: ModalController,
    public classService: ClassService,
    private route: ActivatedRoute
  ) {
    this.paramsId = this.route.snapshot.paramMap.get("id");
    this.todayDate = this.route.snapshot.paramMap.get("date");
  }

  ngOnInit() {
    this.studentList = this.classService.getStudentList(this.todayDate, this.paramsId);
    // this.classService.markAttendance(this.paramsId, "12345");
    // const date = new Date();
    // this.todayDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.classService.markAttendance(this.todayDate, this.paramsId, barcodeData.text);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

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
}
