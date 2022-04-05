import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ProjectActions } from 'src/app/store/palladium.actions';
import { NewProjectInterface } from 'src/app/models/project.model'
import { ProjectSelectors } from 'src/app/store/palladium.selectors';
import { Observable} from 'rxjs';
import { FormGroup, FormControl, AbstractControl,
    AsyncValidatorFn } from '@angular/forms';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new-dialog.component.html',
  styleUrls: ['./project-new-dialog.component.scss']
})


export class ProjectNewComponent {
  public projectNames$: Observable<string[]>;
  public projectForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProjectNewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NewProjectInterface,
              private store$: Store,
              ) {
    this.projectNames$ = this.store$.select(ProjectSelectors.getNames);
    this.projectForm = new FormGroup({
      name: new FormControl(data.name, {
        asyncValidators: [this.projectNameValidator(this.projectNames$)]
      }),
    });
  }

  save() {
    this.store$.dispatch(ProjectActions.newProject(this.projectForm.value))
  }

  projectNameValidator(projectNames$: Observable<string[]>): AsyncValidatorFn {
    return (control: AbstractControl)=> {
      return projectNames$.pipe(first(),
        map(projectNames => {
        const nameIsExists = projectNames.includes(control.value)
        return nameIsExists? {projectNameValidator: nameIsExists}: null
      }))
    };
  }
}
