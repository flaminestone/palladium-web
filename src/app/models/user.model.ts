export class User {
    public email: string;
    public username: string;
    public token: string;

    constructor(username: string, token: string) {
        this.email = username;
        this.token = token;
        this.username = this.email.split('@', 2)[0];
    }  
}