import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    private exclude_for_add_token: string[] = ['/public/login'];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.exclude_for_add_token.includes(req.url)) {
            return next.handle(req);
        }

        const request = req.clone({
            url: environment.host + req.url
        });
        return next.handle(request);
    }
}
