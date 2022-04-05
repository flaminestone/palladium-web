import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MainNotificationService {
  constructor(private _snackBar: MatSnackBar) { }

  messageError(text: {errors: string}) {
    this._snackBar.open(text.errors, 'Close');
  }

  message(text: string) {
    this._snackBar.open(text, 'Close', {
      duration: 5000,
    });
  }
}
