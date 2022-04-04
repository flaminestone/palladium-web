import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { NewProjectInterface, ProjectInterface } from '../models/project.model';
import { PalladiumApiService } from '../services/palladium-api.service';
import { ProjectActions } from './palladium.actions';
 
@Injectable()
export class PalladiumEffects {
 
  loadproducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.getProjects),
    mergeMap(() => this.palladiumApi.getProjects().pipe(
      map((data) => {
        return ProjectActions.getProjectsSuccess({data: data})
      })
    ))
    )
  );

  newProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.newProject),
    mergeMap((newProject: NewProjectInterface) => this.palladiumApi.newProject(newProject).pipe(
      map((project: ProjectInterface) => {
        return ProjectActions.newProjectSuccess(project)
      })
    ))
    )
  );

  constructor(
    private actions$: Actions,
    private palladiumApi: PalladiumApiService,
  ) {}
}