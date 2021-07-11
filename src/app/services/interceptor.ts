import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ShareService } from './share.service'

@Injectable()
export class CustomHttpInterceptorService implements HttpInterceptor {
    token: string = "AbCdEf123456";
    constructor(private ShareService: ShareService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.ShareService.startLoader();
        request = request.clone({
            headers: request.headers.set("Authorization", "Bearer " + this.token)
        });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.ShareService.stopLoader();
                    if (event.body && event.body.httpStatus && event.body.httpStatus === 401) {
                        // alert("session Expired. Please Login Again..! ");
                        window.location.href = "/common_engine";
                    } else {
                        console.log('event response after success', event.headers);
                    }
                }
                return event;
            }),

            catchError((error: HttpErrorResponse) => {
                this.ShareService.stopLoader();
                console.log("error --- res", error);
                return throwError(error);
            }));
    }


}

