import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { NewProjectInterface, ProjectInterface } from '../models/project.model';
import { PalladiumApiService } from '../services/palladium-api.service';
import { ProjectActions } from './palladium.actions';
import { CommonActions } from './common/common.actions';
import { MainNotificationService } from '../services/main-notification.service';
 
@Injectable()
export class PalladiumEffects {
 
  loadproducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.getProjects),
    mergeMap(() => {
      this.store$.dispatch(CommonActions.mainProgressBarVisible())
      return this.palladiumApi.getProjects().pipe(
        map((data) => {
          this.store$.dispatch(CommonActions.mainProgressBarInvisible())
          return ProjectActions.getProjectsSuccess({data: data})
        })
      )
    })
    )
  );

  newProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.newProject),
    mergeMap((newProject: NewProjectInterface) => {
      this.store$.dispatch(CommonActions.mainProgressBarVisible())
      return this.palladiumApi.newProject(newProject).pipe(
        map((project: ProjectInterface) => {
          this.store$.dispatch(CommonActions.mainProgressBarInvisible())
          this.notificationService.message('Project ' + project.name + ' created!')
          return ProjectActions.newProjectSuccess(project)
        })
      )
    })
    )
  );

  constructor(
    private store$: Store,
    private actions$: Actions,
    private palladiumApi: PalladiumApiService,
    private notificationService: MainNotificationService
  ) {}
}