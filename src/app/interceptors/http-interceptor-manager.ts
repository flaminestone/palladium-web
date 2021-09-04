import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiHostInterceptor } from "./api-host-interceptor";
import { ApiTokenInterceptor } from "./api-token-interceptor";
import { ApplicationJsonHeaderInterceptor } from "./application-json-header-interceptor";
import { ErrorsInterceptor } from "./errors-interceptor";
import { StartAndStopProgressBarInterceptor } from "./start-and-stop-progress-bar-interceptor";

export const httpInterceptorManager = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: StartAndStopProgressBarInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApplicationJsonHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiHostInterceptor, multi: true },
  ];