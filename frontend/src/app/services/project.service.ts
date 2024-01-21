import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  get(id: any): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: any): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}?title=${title}`);
  }

  getProjectData(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${projectId}`);
  }

  updateProjectData(projectId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${projectId}`, updatedData);
  }
}
