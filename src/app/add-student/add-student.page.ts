import { Component, OnInit, Input } from "@angular/core";
import { Student } from "../add-class/student.model";
import { ClassService } from "../class.service";
import { ModalController, NavParams, ToastController } from "@ionic/angular";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.page.html",
  styleUrls: ["./add-student.page.scss"]
})
export class AddStudentPage implements OnInit {
  @Input() paramsId: string;
  student: Student = {
    name: "",
    rollno: "",
    attendance: false
  };
  id;
  constructor(
    public classService: ClassService,
    public modalCtrl: ModalController,
    public toastController: ToastController,
    navParams: NavParams
  ) {
    this.id = navParams.get("paramsId");
  }

  ngOnInit() {}
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
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  onAddStudent() {
    if (this.student.name === "" || this.student.rollno === "") {
      this.showToast("Enter all fields");
      return;
    }
    this.classService.addStudent(this.id, this.student);
    this.dismiss();
  }
}
