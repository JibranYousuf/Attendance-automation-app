import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.page.html",
  styleUrls: ["./sign-in.page.scss"]
})
export class SignInPage implements OnInit {
  username: string;
  password: any;
  constructor(
    private router: Router,
    public toastController: ToastController
  ) {}

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

  onSignIn() {
    if (this.username === "teacher" && this.password === "click123") {
      this.router.navigate(["tabs"]);
    } else {
      this.showToast("Invalid Credentials");
    }
  }
}
