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
  selectedDate = this.getPadded(new Date().getMonth() + 1) + "/" + this.getPadded(new Date().getDate()) + "/" + new Date().getFullYear();
  // paramsId;

  constructor(
    public modalController: ModalController,
    public classService: ClassService,
    private route: ActivatedRoute
  ) { }
  getPadded(num) {
    return ("00" + num).substr(-2, 2);
  }

  ngOnInit() {
    this.classList = this.classService.getClassList(this.selectedDate);
    this.classListSub = this.classService
      .getClassUpdateListener()
      .subscribe((classList: Record<string, Class[]>) => {
        this.classList = classList[this.selectedDate];
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
