import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Student } from "./student.model";
import { Class } from "./class.model";
import { ClassService } from "../class.service";
import { Subscription } from "rxjs";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-add-class",
  templateUrl: "./add-class.page.html",
  styleUrls: ["./add-class.page.scss"]
})
export class AddClassPage implements OnInit {
  @Input() date:string;
  classListSub: Subscription;
  classList: Array<Class> = [];
  class: Class = {
    name: "",
    year: "",
    semester: "",
    students: []
  };
  constructor(
    public modalCtrl: ModalController,
    public classService: ClassService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.classList = this.classService.getClassList(this.date);
    this.classListSub = this.classService
      .getClassUpdateListener()
      .subscribe((classList: Record<string,Class[]>) => {
        this.classList = classList[this.date];
      });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
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
  onAddClass() {
    if (
      this.class.name === "" ||
      this.class.year === "" ||
      this.class.semester === ""
    ) {
      this.showToast("Enter all fields");
      return;
    }
    this.classService.addClass(this.date,this.class);
    this.dismiss();
  }
  ngOnDestroy() {
    this.classListSub.unsubscribe();
  }
}
