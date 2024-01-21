import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.css']
})
export class ProjectUserComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;
  currentStudentID = "";
  projectId: string = '';

  titleENG: string = "";
  titleTH: string = "";

  st_id_1: string = "";
  n_ENG_1: string = "";
  n_TH_1: string = "";

  st_id_2: string = "";
  n_ENG_2: string = "";
  n_TH_2: string = "";

  st_id_3: string = "";
  n_ENG_3: string = "";
  n_TH_3: string = "";

  st_id_4: string = "";
  n_ENG_4: string = "";
  n_TH_4: string = "";

  Student_id: string = "";
  Name_ENG: string = "";
  Name_TH: string = "";

  advisor: string = "";
  coadvisor: string = "";
  description: string = "";
  category: string | undefined;
  year: string = "";

  projectData: any[] = []; // เพิ่มตัวแปร projectData เพื่อเก็บข้อมูลโปรเจ็ค


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    // ...
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const projectId = params['id'];
      const studentId = params['Student_id'];

      // Combine both HTTP requests using forkJoin
      forkJoin([
        this.http.get(`http://localhost:9002/api/project/${projectId}`),
        this.http.get(`http://localhost:9002/api/allstudent/${studentId}`)
      ]).subscribe(
        (resultData: any[]) => {
          console.log(resultData);

          // Assuming resultData[0] contains project data and resultData[1] contains student data
          this.projectData = resultData[0].data;
        
          this.titleENG = resultData[0].titleENG;
          this.titleTH = resultData[0].titleTH;

          // ... (update other properties as needed)
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    });
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  getProjectById(projectId: string) {
    this.http.get(`http://localhost:9002/api/project/${projectId}`).subscribe((resultData: any) => {
      console.log(resultData);
      this.projectData = resultData.data;
    });
  }


  getStudentById(studentId: string) {
    this.http.get(`http://localhost:9002/api/allstudent/${studentId}`).subscribe((resultData: any) => {
      console.log(resultData);
      // Handle the student data accordingly, update your student-related variables here
      // For example: this.st_id_1 = resultData.st_id_1;
    });
  }


}
