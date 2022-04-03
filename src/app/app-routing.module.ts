import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './projects/project-main/project-main.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { RootComponent } from './root/root.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [{
      path: 'projectlist', component: ProjectListComponent
    }]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
