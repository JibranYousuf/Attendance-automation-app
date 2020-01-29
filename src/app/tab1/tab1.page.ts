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
  selectedDate = this.getPadded(new Date().getMonth() + 1) + "/" + this.getPadded(new Date().getDate()) + "/" + new Date().getFullYear();

  constructor(
    public modalController: ModalController,
    public classService: ClassService
  ) { }

  /**
   * add 0 on left padding
   * i.e 9 -> 09
   * @param num - num to pad
   */
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

  /**
   * handle date filter input change event
   * @param e 
   */
  dateFilterChange(e: CustomEvent) {
    const date = new Date(e.detail.value);
    // constructs date string in format mm/dd/yy
    this.selectedDate = this.getPadded(date.getMonth() + 1) + "/" + this.getPadded(date.getDate()) + "/" + date.getFullYear();
   // bring data by date
    this.classList = this.classService.getClassList(this.selectedDate);
  }

  /**
   * Opens add modal
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: AddClassPage,
      backdropDismiss: true,
      componentProps: {
        date: this.selectedDate,
      }
    });
    return await modal.present();
  }

  /**
   * 
   * @param id delete by id
   */
  deleteClass(id) {
    console.log("clicked");
    this.classService.deleteClass(this.selectedDate, id);
  }
}
