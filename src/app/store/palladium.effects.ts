import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PalladiumApiService } from '../services/palladium-api.service';
import { ProjectActions } from './palladium.actions';
 
@Injectable()
export class PalladiumEffects {
 
  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(ProjectActions.getProjects),
    mergeMap(() => this.palladiumApi.get_projects().pipe(
      map((data) => {
        return ProjectActions.getProjectsSuccess({data: data})
      })
    ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private palladiumApi: PalladiumApiService,
  ) {}
}