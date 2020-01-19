import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ClassService } from "../class.service";
import { Subscription } from "rxjs";
import { Class } from "../add-class/class.model";
import { TakeAttendancePage } from "../take-attendance/take-attendance.page";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-attendance-list",
  templateUrl: "./attendance-list.page.html",
  styleUrls: ["./attendance-list.page.scss"]
})
export class AttendanceListPage implements OnInit {
  classList: Array<Class>;
  classListSub: Subscription;
  // paramsId;

  constructor(
    public modalController: ModalController,
    public classService: ClassService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.classList = this.classService.getClassList();
    this.classListSub = this.classService
      .getClassUpdateListener()
      .subscribe((classList: Class[]) => {
        this.classList = classList;
      });
  }
  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: TakeAttendancePage,
  //     backdropDismiss: true,
  //     componentProps: {
  //       paramsId: this.paramsId
  //     }
  //   });
  //   return await modal.present();
  // }
}
