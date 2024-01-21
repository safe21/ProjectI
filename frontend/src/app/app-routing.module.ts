import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { ProjectRMComponent } from './pages/project-rm/project-rm.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectUserComponent } from './pages/project-user/project-user.component';
import { MyprojectComponent } from './pages/myproject/myproject.component';

const routes: Routes = [ { 
  path: 'home',
    component: HomeComponent,
 },
 { 
  path: 'login',
    component: LoginComponent,
 },
 { 
  path: 'myproject',
    component: MyprojectComponent,
 },
 { 
  path: 'project/:id',
    component: ProjectRMComponent,
 },
 { 
  path: 'project-user/:Student_id',
    component: ProjectUserComponent,
 },
 { 
  path: 'add-project',
    component: AddProjectComponent,
 },
 { 
  path: 'edit-project/:id',
    component: EditProjectComponent,
 },
 { 
  path: 'about',
    component: AboutComponent,
 },

 { path: '', redirectTo: 'home', pathMatch: 'full' },
 ];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
