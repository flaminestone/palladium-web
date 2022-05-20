import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../services/authentication.service';
import { ThemeService } from '../services/theme.service';
import { CommonSelectors } from '../store/common/common.selectors';
import { UserActions } from '../store/palladium.actions';
import { UserSelectors } from '../store/palladium.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  public progressBar$;
  public user$;

  constructor(private store$: Store,
    public authenticationService: AuthenticationService,
    public themeService: ThemeService) {
      this.progressBar$ = this.store$.select(CommonSelectors.getMainProgressBar)
      this.user$ = this.store$.select(UserSelectors.currentUser)
     }

    logout() {
      this.store$.dispatch(UserActions.logout())
    }
}
