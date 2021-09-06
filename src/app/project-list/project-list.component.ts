import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects: Project[] = [];
  constructor() { }

  ngOnInit(): void {
    this.projects = [new Project('Title')]
  }
}
