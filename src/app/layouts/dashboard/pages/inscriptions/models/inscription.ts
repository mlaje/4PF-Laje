import { Course } from '../../courses/models/course';
import { Student } from '../../students/models/index';

export interface Inscription {
  id: number;
  studentId: string | number;
  courseId: string | number;
  student?: Student;
  course?: Course;
}

export interface CreateInscriptionData {
  studentId: string | number | null;
  courseId: string | number | null;
}