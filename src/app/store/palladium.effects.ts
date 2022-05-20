import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { NewProjectInterface, Project, ProjectInterface } from '../models/project.model';
import { PalladiumApiService } from '../services/palladium-api.service';
import { ProjectActions, UserActions } from './palladium.actions';
import { CommonActions } from './common/common.actions';
import { MainNotificationService } from '../services/main-notification.service';
import { UserLoginData } from '../models/user.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';
@Injectable()
export class PalladiumEffects {

  init$ = createEffect(() => this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => CommonActions.localStorageGetAuthData())
  )
);

  mainLoaderShow$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login, ProjectActions.newProject, ProjectActions.getProjects),
    map(_ => CommonActions.mainProgressBarVisible()))
  );

  mainLoaderHide$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginSuccess, ProjectActions.getProjectsSuccess),
    map(_ => CommonActions.mainProgressBarInvisible()))
  );


  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    mergeMap((loginData: UserLoginData) => {
      return this.palladiumApi.login(loginData).pipe(
        mergeMap((token: string) => {
          console.log(token)
          return [UserActions.loginSuccess({email:loginData.email, token: token}),
                  CommonActions.localStoragePushAuthData({email:loginData.email, token: token})]
        }),
        catchError((error: any) => {
          console.log('22233')
          return of(error)
        })
      )
    }))
  );
 
  keepAuthToLS$ = createEffect(() => this.actions$.pipe(
    ofType(CommonActions.localStoragePushAuthData),
    map((data) => {
      localStorage.setItem('auth_data', JSON.stringify({ email: data.email, token: data.token }));
      if (data.token) {
        this.router.navigate(['/']);
      }
    })
    ), { dispatch: false }
  );

  getAuthFromLS$ = createEffect(() => this.actions$.pipe(
    ofType(CommonActions.localStorageGetAuthData),
    map(() => {
      const auth_data = localStorage.getItem('auth_data');
      if(auth_data) {
        const auth_data2 = JSON.parse(auth_data)
        return UserActions.loginSuccess(auth_data2)
      } else {
        return { type: 'NOT_EXIST' }
      }
    })
    )
  );

   
  logoutLS$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    map(() => {
      localStorage.removeItem('auth_data');
      this.router.navigate(['/login']);
      return UserActions.logoutStore()
    })
    )
  );

  getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.getProjects),
    mergeMap((data: any) => {
      return this.palladiumApi.getProjects().pipe(
        map((projects: Project[]) => {
          console.log(projects)
          return ProjectActions.getProjectsSuccess({data: projects})
        })
      )
    })
    )
  );

  newProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.newProject),
    mergeMap((newProject: NewProjectInterface) => {
      return this.palladiumApi.newProject(newProject).pipe(
        map((project: ProjectInterface) => {
          this.notificationService.message('Project ' + project.name + ' created!')
          return ProjectActions.newProjectSuccess(project)
        })
      )
    })
    )
  );

  constructor(
    private router: Router,
    private store$: Store,
    private actions$: Actions,
    private palladiumApi: PalladiumApiService,
    private notificationService: MainNotificationService,
  ) {}
}