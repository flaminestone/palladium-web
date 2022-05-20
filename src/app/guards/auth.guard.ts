import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserSelectors } from '../store/palladium.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store$: Store) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store$.select(UserSelectors.currentUser).pipe(map((user: (User | undefined)) => {
        if(!!!user) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
        return !!user
      }))
  }
}
