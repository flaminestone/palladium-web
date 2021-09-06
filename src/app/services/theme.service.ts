import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class ThemeService {
  isDarkTheme: BehaviorSubject<boolean>;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.isDarkTheme = new BehaviorSubject(this.getdefaultDarkThemeStatusFromLS());
    this.isDarkTheme.pipe(distinctUntilChanged()).subscribe((darkThemeAdd) => {
      if (darkThemeAdd) {
        this.document.body.classList.add('dark-theme');
        localStorage.setItem('dark-theme', 'true');
      } else {
        this.document.body.classList.remove('dark-theme');
        localStorage.removeItem('dark-theme');
      }
    })
  }

  setDarkTheme(darkThemeStatus: boolean): void {
    this.isDarkTheme.next(darkThemeStatus)
  }

  getdefaultDarkThemeStatusFromLS(): boolean {
    return !!localStorage.getItem('dark-theme');
  }
}
