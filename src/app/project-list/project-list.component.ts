import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../store/palladium.actions';
import { ProjectSelectors } from '../store/palladium.selectors';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects$;
  
  constructor(private store$: Store) {
    this.projects$ = this.store$.select(ProjectSelectors.get_projects)
  }

  ngOnInit(): void {
    this.store$.dispatch(ProjectActions.getProjects())
  }
}
