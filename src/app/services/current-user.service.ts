import { Injectable } from '@angular/core';
import { User } from "src/app/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private currentUser: User | undefined;
  
  constructor() {}

  getUser(): User | undefined {
    return this.currentUser;
  }

  setUser(user: User): void {
    this.currentUser = user;
  }
}

