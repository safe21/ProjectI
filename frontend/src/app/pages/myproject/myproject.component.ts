import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';

interface StudentData {
  [key: string]: string;
}

@Component({
  selector: 'app-myproject',
  templateUrl: './myproject.component.html',
  styleUrls: ['./myproject.component.css']
})
export class MyprojectComponent implements OnInit {
  showForm1: boolean = true;
  showForm2: boolean = false;

  students: any[] = [];
  projectForm: FormGroup;
  maxStudents: number = 4;

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
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private el: ElementRef
  ) {
    this.projectForm = this.fb.group({
      Student_id: ['',],
      Name_ENG: ['',],
      Name_TH: ['',],
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
  }

  isAddButtonDisabled(): boolean {
    return this.students.length >= this.maxStudents;
  }

  Add() {
    if (this.isAddButtonDisabled()) {
      return;
    }
  
    const student = this.projectForm.value;
  
    // Send student data to the API with fixed property names
    this.http.post("http://localhost:9002/api/allstudent/add", student).subscribe((response: any) => {
      console.log(response);
      alert('Added Student');
      this.clearForm();
  
      // Add student to the array with dynamic property names
      const index = this.students.length + 1;
      const studentObject: Record<string, string> = {}; // Explicitly define the type
      studentObject[`st_id_${index}`] = student.Student_id || '';
      studentObject[`n_ENG_${index}`] = student.Name_ENG || '';
      studentObject[`n_TH_${index}`] = student.Name_TH || '';
      this.students.push(studentObject);
    });
  }

  clearForm() {
    this.projectForm.reset();
  }

  register() {
    console.log('Year value in register():', this.year);
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

    this.http.post("http://localhost:9002/api/project/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      this.http.post("http://localhost:9002/api/student/add", studentData).subscribe((studentData: any) => {
        console.log(studentData);
        alert("Project creatted Successfully");
        this.router.navigate(['/home']);
      });
    });
  }

  save() {
    if (this.currentStudentID === '') {
      // เช็คว่าฟอร์มถูกต้องหรือไม่
      const isFormValid = this.titleENG && this.titleTH && this.st_id_1 &&
        this.n_ENG_1 && this.n_TH_1 && this.advisor && this.year && this.link;

      if (isFormValid) {
        this.register();
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


  // save() {
  //   console.log('Save function called');
  //   const studentData: any[] = [];
  //   this.students.forEach((student, index) => {
  //     const data = {
  //       st_id: student[`st_id_${index + 1}`] || '',
  //       n_ENG: student[`n_ENG_${index + 1}`] || '',
  //       n_TH: student[`n_TH_${index + 1}`] || '',
  //     };
  //     studentData.push(data);
  //   });
  
  //   console.log('Student data to be sent:', studentData);
  
  //   this.http.post("http://localhost:9002/api/student/add", { students: studentData }).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       alert('Project created Successfully');
  //       this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       alert('Failed to create project. Please check the console for errors.');
  //     }
  //   );
  // } 