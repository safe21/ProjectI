import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-rm',
  templateUrl: './project-rm.component.html',
  styleUrls: ['./project-rm.component.css']
})
export class ProjectRMComponent {

  showForm1: boolean = true;
  showForm2: boolean = false;
  showForm3: boolean = false;
  showForm4: boolean = false;

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

      // คุณสามารถใช้ projectId ในการดึงข้อมูลโปรเจ็คที่ต้องการแสดง
      this.getProjectById(projectId);
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

  Abstract() {
    this.showForm1 = true;
    this.showForm2 = false;
    this.showForm3 = false;
    this.showForm4 = false;
  }

  Authors() {
    this.showForm1 = false;
    this.showForm2 = true;
    this.showForm3 = false;
    this.showForm4 = false;
  }

  References() {
    this.showForm1 = false;
    this.showForm2 = false;
    this.showForm3 = true;
    this.showForm4 = false;
  }

  Keywords() {
    this.showForm1 = false;
    this.showForm2 = false;
    this.showForm3 = false;
    this.showForm4 = true;
  }
}
