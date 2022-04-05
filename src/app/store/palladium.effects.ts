import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { NewProjectInterface, ProjectInterface } from '../models/project.model';
import { PalladiumApiService } from '../services/palladium-api.service';
import { CommonActions, ProjectActions } from './palladium.actions';
 
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
  ) {}
}