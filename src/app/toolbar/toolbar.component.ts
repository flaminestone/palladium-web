import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CurrentUserService } from '../services/current-user.service';
import { ProgressMainService } from '../services/progress-main.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public progress: ProgressMainService,
     public authenticationService: AuthenticationService,
     public themeService: ThemeService,
     public currentUserService: CurrentUserService
     ) {}

}
