import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddClassPage } from "../add-class/add-class.page";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(public modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddClassPage,
      backdropDismiss: true
    });
    return await modal.present();
  }
}
