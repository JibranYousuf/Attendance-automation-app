import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddClassPage } from "../add-class/add-class.page";
import { Class } from "../add-class/class.model";
import { Subscription } from "rxjs";
import { ClassService } from "../class.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  classList: Array<Class>;
  classListSub: Subscription;

  constructor(
    public modalController: ModalController,
    public classService: ClassService
  ) {}

  ngOnInit() {
    this.classList = this.classService.getClassList();
    this.classListSub = this.classService
      .getClassUpdateListener()
      .subscribe((classList: Class[]) => {
        this.classList = classList;
      });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddClassPage,
      backdropDismiss: true
    });
    return await modal.present();
  }
}
