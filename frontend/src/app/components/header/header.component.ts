import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { LOCALE_ID, Inject } from '@angular/core'
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit  {

  title = 'ProjectI';
  searchQuery: string = '';

  onSearch(event: any): void {
    const query = event.target.value;
    console.log('Search query:', this.searchQuery ,query);
  }

  constructor(private router: Router, @Inject(LOCALE_ID) protected localeId: string ='en',
  private socialAuthService: SocialAuthService) {}

  openGoogleLoginPopup() {
    this.socialAuthService.signIn('google').then((user) => {
      // ผู้ใช้เข้าสู่ระบบด้วย Google และคุณสามารถเข้าถึงข้อมูลผู้ใช้ที่ยืนยัน
    }).catch((error) => {
      console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Google:', error);
    });
  }
  
  onButtonClick(buttonLabel: string): void {
    // Handle button clicks here
    if (buttonLabel === 'A1') {
      this.router.navigateByUrl('/test-a1');
    } else  
    console.log('Button clicked:', buttonLabel);
  }

  onMenuClick(menuLabel: string): void {
    if (menuLabel === 'Home') {
      // ทำอะไรก็ได้เมื่อคลิกเมนู Home
    } else if (menuLabel === 'About') {
      // ทำอะไรก็ได้เมื่อคลิกเมนู About
    } else if (menuLabel === 'Services') {
      // ทำอะไรก็ได้เมื่อคลิกเมนู Services
    } else if (menuLabel === 'Sign-in') {
      // ทำอะไรก็ได้เมื่อคลิกเมนู Signin
      this.router.navigateByUrl('/add-project');
    }
  }
  ngOnInit(){}

  switchLanguage(language: string) {
    if (language === 'ไทย') {
      this.localeId = 'th'; // ตั้งค่าภาษาไทย
    } else if (language === 'English') {
      this.localeId = 'en'; // ตั้งค่าภาษาอังกฤษ
    }
  }
  
}
