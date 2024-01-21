import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { GoogleAuthService } from 'src/app/pages/login/google/google-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'login';
  user: SocialUser | null = null;
  loggedIn: any;


  isSigninFormVisible = true; // เพิ่มตัวแปรนี้
  isSignupFormVisible = false; // เพิ่มตัวแปรนี้

  signinData = {
    email: '',
    password: '',
  };

  signupData = {
    studentID: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private googleAuthService: GoogleAuthService, private authService: SocialAuthService) { }

  signInWithGoogle() {
    // Check if the Google client is already initialized
    if (!this.googleAuthService.isClientInitialized()) {
      // If not initialized, initialize the Google client and sign in afterward
      this.googleAuthService.initClient('92155630211-4t4d3cku9qhir4b04q2gpdeu853euncu.apps.googleusercontent.com')
        .then(() => {
          this.handleGoogleSignIn();
        })
        .catch((error: any) => {
          console.error('Error initializing Google client:', error);
        });
    } else {
      // If already initialized, directly handle the sign-in
      this.handleGoogleSignIn();
    }
  }
  
  private handleGoogleSignIn() {
    // Sign in with Google after the client is initialized
    this.googleAuthService.signIn()
      .then((user: any) => {
        // Handle the sign-in logic, e.g., updating the UI or sending the user data to the server.
      })
      .catch((error: any) => {
        console.error('Error signing in with Google:', error);
      });
  }
  


  signOut() {
    this.googleAuthService.signOut()
      .then(() => {
        // ผู้ใช้ได้ออกจากระบบ
      })
      .catch((error: any) => {
        console.error('เกิดข้อผิดพลาดในการออกจากระบบด้วย Google:', error);
      });
  }

  signin() {
    const { email, password } = this.signinData;
    // จัดการการเข้าสู่ระบบด้วย email และ password ที่คุณได้สร้าง
  }

  toggleForm(form: 'signin' | 'signup'): void {
    this.isSigninFormVisible = form === 'signin';
    this.isSignupFormVisible = form === 'signup';
  }

  signup() {
    const { studentID, firstName, lastName, email, password } = this.signupData;
    // จัดการการสมัครสมาชิก
  }

  ngOnInit() {
    this.googleAuthService.initClient('92155630211-4t4d3cku9qhir4b04q2gpdeu853euncu.apps.googleusercontent.com');
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }
}
