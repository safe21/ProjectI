import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  showForm1: boolean = true;
  showForm2: boolean = false;

  projectForm: FormGroup;

  currentStudentID = "";
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
  category: string = "";
  year: string = "";
  link: string = "";

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private projectService: ProjectService,
    private el: ElementRef
  ) {
    
    this.projectForm = this.fb.group({
      projectENG: ['', Validators.required],
      projectTH: ['', Validators.required],

      st_id_1: ['', Validators.required],
      n_ENG_1: ['', Validators.required],
      n_TH_1: ['', Validators.required],

      st_id_2: ['',],
      n_ENG_2: ['',],
      n_TH_2: ['',],

      st_id_3: ['',],
      n_ENG_3: ['',],
      n_TH_3: ['',],

      st_id_4: ['',],
      n_ENG_4: ['',],
      n_TH_4: ['',],

      advisor: ['', Validators.required],
      coadvisor: [''],
      description: [''],
      category: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/), Validators.maxLength(10)]],
      link: ['',],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentStudentID = params['id'];
      this.getProjectData(this.currentStudentID);
    });
  }

  Update() {
    console.log('Year value in OnUpdate():', this.year);
    let bodyData = {
      "titleENG": this.titleENG,
      "titleTH": this.titleTH,

      "st_id_1": this.st_id_1,
      "n_ENG_1": this.n_ENG_1,
      "n_TH_1": this.n_TH_1,

      "st_id_2": this.st_id_2,
      "n_ENG_2": this.n_ENG_2,
      "n_TH_2": this.n_TH_2,

      "st_id_3": this.st_id_3,
      "n_ENG_3": this.n_ENG_3,
      "n_TH_3": this.n_TH_3,

      "st_id_4": this.st_id_4,
      "n_ENG_4": this.n_ENG_4,
      "n_TH_4": this.n_TH_4,

      "advisor": this.advisor,
      "coadvisor": this.coadvisor,
      "description": this.description,
      // "category": this.selectedCategory,
      "category": this.category,
      "year": this.year,
      "link": this.link,
    };
    let studentData = {
      // ข้อมูลนักศึกษาที่คุณต้องการส่งไปยัง /api/student/add
      "st_id_1": this.st_id_1,
      "n_ENG_1": this.n_ENG_1,
      "n_TH_1": this.n_TH_1,

      "st_id_2": this.st_id_2,
      "n_ENG_2": this.n_ENG_2,
      "n_TH_2": this.n_TH_2,

      "st_id_3": this.st_id_3,
      "n_ENG_3": this.n_ENG_3,
      "n_TH_3": this.n_TH_3,

      "st_id_4": this.st_id_4,
      "n_ENG_4": this.n_ENG_4,
      "n_TH_4": this.n_TH_4,
      // เพิ่มข้อมูลของนักศึกษาที่นี่
    };

    this.http.put("http://localhost:9002/api/project/update/:id", bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      this.http.put("http://localhost:9002/api/student/update/:id_team", studentData).subscribe((studentData: any) => {
        console.log(studentData);
        alert("Project creatted Successfully");
        this.router.navigate(['/home']);
      });
    });
  }

  getProjectData(projectId: string) {
    this.projectService.getProjectData(projectId).subscribe((data: any) => {
      this.projectForm.patchValue(data);
    });
  }

  updateProjectData(projectId: string, updatedData: any) {
    this.projectService.updateProjectData(projectId, updatedData).subscribe((result: any) => {
      // You can handle post-update actions here
    });
  }

  OnUpdate() {
    if (this.currentStudentID === '') {
      // เช็คว่าฟอร์มถูกต้องหรือไม่
      const isFormValid = this.titleENG && this.titleTH && this.st_id_1 &&
        this.n_ENG_1 && this.n_TH_1 && this.advisor && this.year && this.link;

      if (isFormValid) {
        this.Update();
      } else {
        alert('Please fill in all required fields.');

        // เลื่อนไปยังฟอร์มแรกที่ยังไม่ได้กรอก
        const firstInvalidControl = this.getFirstInvalidControl();
        if (firstInvalidControl) {
          firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // โค้ดสำหรับการอัปเดต
    }
  }

  getFirstInvalidControl() {
    const formControls = this.projectForm.controls;
    for (const controlName in formControls) {
      if (formControls.hasOwnProperty(controlName) && formControls[controlName].invalid) {
        return this.el.nativeElement.querySelector(`[formcontrolname="${controlName}"]`);
      }
    }
    return null;
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  goToPreviousForm() {
    this.showForm1 = true;
    this.showForm2 = false;
  }
  
  goToNextForm() {
    this.showForm1 = false;
    this.showForm2 = true;
  }
}
