import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { ProgressMainService } from "../services/progress-main.service";

@Injectable()
export class StartAndStopProgressBarInterceptor implements HttpInterceptor {
    constructor(private progressMainService: ProgressMainService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressMainService.state.visible$.next(true);

        return next.handle(req).pipe(finalize(() => {
                this.progressMainService.state.visible$.next(false);
        }))
    }
}
