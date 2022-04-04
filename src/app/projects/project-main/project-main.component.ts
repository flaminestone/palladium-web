import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectNewComponent } from '../project-new-dialog/project-new-dialog.component';

@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.scss']
})
export class DashboardComponent {

  constructor(public dialog: MatDialog) { }

  createProject(): void {
    this.dialog.open(ProjectNewComponent, {
      data: {name: ''},
    });
  }
}
