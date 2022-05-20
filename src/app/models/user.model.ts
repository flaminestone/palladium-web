export interface UserLoginData {
    email: string,
    password: string
}

export interface UserCredentials {
    email: string,
    token: string
}

export class User {
    public email: string;
    public username: string;
    public token: string;

    constructor(loginData: UserCredentials) {
        this.email = loginData.email;
        this.token = loginData.token;
        this.username = this.email.split('@', 2)[0];
    }  
}