// google-auth.service.ts
import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private auth2: any;
  private isInitialized = false;

  initClient(clientId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.auth2) {
        resolve();
      } else {
        gapi.load('auth2', () => {
          gapi.auth2.init({
            client_id: clientId,
          }).then((auth2: any) => {
            this.auth2 = auth2;
            this.isInitialized = true; // Set initialization status to true
            resolve();
          }).catch((error: any) => {
            reject(error);
          });
        });
      }
    });
  }

  isClientInitialized(): boolean {
    return this.isInitialized;
  }

  signIn(): Promise<any> {
    if (!this.isInitialized) {
      return Promise.reject('Google client not initialized');
    }

    return this.auth2.signIn();
  }

  signOut(): Promise<void> {
    if (!this.isInitialized) {
      return Promise.reject('Google client not initialized');
    }

    return this.auth2.signOut();
  }
}
