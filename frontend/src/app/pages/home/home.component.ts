import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';


const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() fullWidthMode = false;

  selectedCategory: string = 'All';

  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  StudentArray: any[] = [];
  isResultLoaded = false;
  currentIndex = -1;
  currentStudentID = "";
  currentPage = 1; // หน้าปัจจุบัน
  pageSize = 5;   // จำนวนรายการต่อหน้า
  totalPages = 0;  // จำนวนหน้าทั้งหมด

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

  searchQuery: string = '';
  searchResults: any[] = [];
  filteredStudentArray: any[] = [];
  isSearchClicked = false;
  searchResultKeyword: string = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.getAllStudent();
    });
    this.route.queryParams.subscribe(params => {
      this.getStudent();
    });
  }


  onSubmit(): void {
    // กำหนด isSearchClicked เป็น true เพื่อเริ่มกระบวนการค้นหา
    this.isSearchClicked = true;
    console.log('Search query:', this.searchQuery);
    console.log('onSubmit method called');
    console.log('isSearchClicked:', this.isSearchClicked);

    if (this.searchQuery.trim() !== '') {
      this.filteredStudentArray = this.StudentArray.filter((project: any) => {
        return (
          project.titleENG.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.titleTH.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.st_id_1.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_ENG_1.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_TH_1.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.st_id_2.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_ENG_2.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_TH_2.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.st_id_3.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_ENG_3.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_TH_3.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.st_id_4.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_ENG_4.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.n_TH_4.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.advisor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.coadvisor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          project.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });

      this.totalPages = Math.ceil(this.filteredStudentArray.length / this.pageSize);
      // รีเซ็ตหน้าปัจจุบันเมื่อมีการค้นหา
      this.currentPage = 1;
      // เรียก getDisplayedStudents() เพื่อแสดงผลลัพธ์ทันที
      this.searchResultKeyword = this.searchQuery;
      this.getDisplayedStudents();
    } else {
      this.searchResults = [];
      this.searchResultKeyword = '';
    }
  }

  cancelSearch(): void {
    this.searchResults = [];
    this.searchResultKeyword = '';
    this.searchQuery = '';
    this.isSearchClicked = false;
  
    const navigationExtras: NavigationExtras = {
      queryParams: { 'refresh': new Date().getTime() },
      skipLocationChange: true
    };
  
    // Navigate to the same route with skipLocationChange to refresh the page
    this.router.navigate(['/home'], navigationExtras);
  
    // ตั้งค่า currentPage เป็น 1
    this.currentPage = 1;
  
    // เรียก getDisplayedStudents() เพื่อแสดงโปรเจ็คแรกของหน้า home
    this.getDisplayedStudents();
  }  

  getWidthOfSearchResults(): number {
    const keywordLength = this.searchResultKeyword.length;
    const estimatedWidthPerCharacter = 10; // ปรับตามขนาดตัวอักษรและระยะห่าง
    const minWidth = 100; // ความกว้างขั้นต่ำ

    return Math.max(minWidth, keywordLength * estimatedWidthPerCharacter);
  }


  ngOnInit(): void {
    this.getAllStudent();
    this.getStudent();
    this.getDisplayedStudents();
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        // Refresh logic or function call goes here
      }
    });
  }

  onShowCategory(newCategory: string): void {
    this.selectedCategory = newCategory;
    this.getDisplayedStudents();
  }

  getAllStudent() {
    this.http.get("http://localhost:9002/api/project/").subscribe((resultData: any) => {
      this.isResultLoaded = true;
      console.log(resultData.data);
      this.StudentArray = resultData.data;

      // คำนวณจำนวนหน้าทั้งหมด
      this.totalPages = Math.ceil(this.StudentArray.length / this.pageSize);
    });
  }

  getStudent() {
    this.http.get("http://localhost:9002/api/student/").subscribe((studentData: any) => {
      this.isResultLoaded = true;
      console.log(studentData.data);
    });
  }

  setUpdate(data: any) {
    this.titleENG = data.titleENG;
    this.titleTH = data.titleTH;

    this.st_id_1 = data.st_id_1;
    this.n_ENG_1 = data.n_ENG_1;
    this.n_TH_1 = data.n_TH_1;

    this.st_id_2 = data.st_id_2;
    this.n_ENG_2 = data.n_ENG_2;
    this.n_TH_2 = data.n_TH_2;

    this.st_id_3 = data.st_id_3;
    this.n_ENG_3 = data.n_ENG_3;
    this.n_TH_3 = data.n_TH_3;

    this.st_id_4 = data.st_id_4;
    this.n_ENG_4 = data.n_ENG_4;
    this.n_TH_4 = data.n_TH_4;

    this.advisor = data.advisor;
    this.coadvisor = data.coadvisor;
    this.description = data.description;
    this.category = data.category;
    this.year = data.year;

    this.currentStudentID = data.id;
    this.router.navigate([`/edit-project/${data.id}`]);
  }

  UpdateRecords() {
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
      "category": this.category,
      "year": this.year,
    };

    this.http.put("http://localhost:9002/api/project/update" + "/" + this.currentStudentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllStudent();
    });
    this.http.put("http://localhost:9002/api/student/update" + "/" + this.currentStudentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Registered Updateddd")
      this.getStudent();
    });
  }

  setDelete(data: any) {
    const projectId = data.id;
    const studentIdTeam = data.id_team;

    // ให้ทำการลบ Project ก่อน
    this.deleteProject(projectId)
      .then(() => {
        // เมื่อลบ Project เสร็จ ให้ทำการลบ Student
        return this.deleteStudent(studentIdTeam);
      })
      .then(() => {
        // เมื่อลบทั้ง Project และ Student เสร็จ ทำการ refresh ข้อมูล
        alert("Project and Student Deleted");
        this.getAllStudent();
        this.getStudent();
        this.scrollToTop();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        alert("Failed to Delete Project and Student");
        this.router.navigate(['/home']);
        this.scrollToTop();
      });
  }

  deleteProject(projectId: string): Promise<void> {
    return this.http
      .delete(`http://localhost:9002/api/project/delete/${projectId}`)
      .toPromise()
      .then((resultData: any) => {
        console.log(resultData);
      });
  }

  deleteStudent(studentIdTeam: string): Promise<void> {
    return this.http
      .delete(`http://localhost:9002/api/student/delete/${studentIdTeam}`)
      .toPromise()
      .then((studentData: any) => {
        console.log(studentData);
      });
  }



  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollToTop();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPreviousPageData();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    const element = document.body;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  getPreviousPageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const previousPageData = this.StudentArray.slice(startIndex, endIndex);
    console.log('Previous page data:', previousPageData);
  }

  // getDisplayedStudents() {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;


  //   // Use filteredStudentArray if search results are available, otherwise use StudentArray
  //   const displayedStudents =
  //     this.filteredStudentArray.length > 0
  //       ? this.filteredStudentArray.slice(startIndex, endIndex)
  //       : this.StudentArray.slice(startIndex, endIndex);

  //   return displayedStudents;
  // }
  getDisplayedStudents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    let displayedStudents: any[];

    // Use filteredStudentArray if search results are available, otherwise use StudentArray
    const baseArray =
      this.filteredStudentArray.length > 0
        ? this.filteredStudentArray
        : this.StudentArray;

    // Filter by category if a category is selected
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      displayedStudents = baseArray.filter(project => project.category === this.selectedCategory);
    } else {
      // If "All" is selected, show all projects
      displayedStudents = baseArray;
    }

    // Slice the array based on pagination
    displayedStudents = displayedStudents.slice(startIndex, endIndex);

    return displayedStudents;
  }

  onSearchInputChange() {
    // เมื่อมีการเปลี่ยนแปลงในช่องค้นหา ให้ทำการค้นหาและอัปเดตผลลัพธ์ค้นหา
    if (this.searchQuery.trim() !== '') {
      // นี่คือส่วนที่คุณต้องทำการค้นหาข้อมูลของคุณ (เช่นจาก API) และกำหนดค่าให้กับ this.searchResults
      // ตัวอย่าง: ค้นหาจากรายการ Students
      this.searchResults = this.StudentArray.filter(student => {
        return student.titleENG.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

    } else {
      this.searchResults = [];
    }
  }

}
