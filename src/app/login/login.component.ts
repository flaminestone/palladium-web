import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { MainNotificationService } from '../services/main-notification.service';
import { UserActions } from '../store/palladium.actions';
import { UserSelectors } from '../store/palladium.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    username: ['', Validators.email],
    password: ['', Validators.required]
  });

  private allowLogin: boolean = true; // protect for try to login while login respons waiting


  constructor(
    private formBuilder: FormBuilder,
    public notificationService: MainNotificationService,
    private store$: Store) { }

  ngOnInit(): void {
    // this.setCredentianIfExist();
  }

  setCredentianIfExist(): void {
    // Open browser menu for select saved credentials if it exists
    if ((window as any).PasswordCredential || (window as any).FederatedCredential) {
      (window as any).navigator.credentials.get({ password: true }).then((data: { id: string, password: string }) => {
        if (data) {
          this.form.controls.username.setValue(data.id);
          this.form.controls.password.setValue(data.password);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.allowLogin) {
      this.allowLogin = false;
      const userLoginData = {
        email: this.form.controls.username.value,
        password: this.form.controls.password.value
      }
      this.store$.dispatch(UserActions.login(userLoginData))
      this.allowLogin = true;
    }
  }
}
