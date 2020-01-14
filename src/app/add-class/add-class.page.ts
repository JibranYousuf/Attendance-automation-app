import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-add-class",
  templateUrl: "./add-class.page.html",
  styleUrls: ["./add-class.page.scss"]
})
export class AddClassPage implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
