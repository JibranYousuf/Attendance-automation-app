import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "tabs",
    loadChildren: () => import("./tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./sign-in/sign-in.module").then(m => m.SignInPageModule)
  },
  {
    path: "sign-up",
    loadChildren: () =>
      import("./sign-up/sign-up.module").then(m => m.SignUpPageModule)
  },
  {
    path: "sign-in",
    loadChildren: () =>
      import("./sign-in/sign-in.module").then(m => m.SignInPageModule)
  },
  {
    path: "add-class/",
    loadChildren: () =>
      import("./add-class/add-class.module").then(m => m.AddClassPageModule)
  },
  {
    path: "add-student/:date",
    loadChildren: () =>
      import("./add-student/add-student.module").then(
        m => m.AddStudentPageModule
      )
  },
  {
    path: "student-list/:id/:date",
    loadChildren: () =>
      import("./student-list/student-list.module").then(
        m => m.StudentListPageModule
      )
  },
  {
    path: "attendance-list/:date",
    loadChildren: () =>
      import("./attendance-list/attendance-list.module").then(
        m => m.AttendanceListPageModule
      )
  },
  {
    path: "take-attendance/:id/:date",
    loadChildren: () =>
      import("./take-attendance/take-attendance.module").then(
        m => m.TakeAttendancePageModule
      )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
