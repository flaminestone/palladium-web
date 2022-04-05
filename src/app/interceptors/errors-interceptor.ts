import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MainNotificationService } from "../services/main-notification.service";

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
    constructor(private notificationService: MainNotificationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('this is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                        this.notificationService.messageError({ errors: error.message });
                    }
                    else {
                        if (error.status == 401) {
                            this.notificationService.messageError(error.error)
                        }
                        else {
                            this.notificationService.messageError({ errors: error.message });
                        }
                    }
                    return throwError(errorMsg);
                }))

    }
}
