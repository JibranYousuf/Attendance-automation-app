import { Student } from "./student.model";

export interface Class {
  name: string;
  year: string;
  semester: string;
  students: Array<Student>;
}
