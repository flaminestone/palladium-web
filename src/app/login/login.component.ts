import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { MainNotificationService } from '../services/main-notification.service';

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
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.setCredentianIfExist();
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
      this.authService.login(this.form.controls.username.value,
                             this.form.controls.password.value).
                             pipe(finalize(() => this.allowLogin = true)).subscribe();
    }
  }
}
