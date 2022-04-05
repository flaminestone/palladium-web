import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';
import { CurrentUserService } from '../services/current-user.service';
import { ThemeService } from '../services/theme.service';
import { CommonSelectors } from '../store/palladium.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  public progressBar$;

  constructor(private store$: Store,
    public authenticationService: AuthenticationService,
    public themeService: ThemeService,
    public currentUserService: CurrentUserService) {
      this.progressBar$ = this.store$.select(CommonSelectors.getMainProgressBar)
     }
}
