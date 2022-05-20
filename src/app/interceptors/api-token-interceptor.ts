import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserSelectors } from "../store/palladium.selectors";

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    private token = '';
    
    constructor(private store$: Store) {
        this.store$.select(UserSelectors.token).subscribe(t => {
            if(t){
                this.token = t;
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {      
        const request = req.clone({ 
            setHeaders: {
                Authorization: this.token
            }
          });
        return next.handle(request );
    }
}
