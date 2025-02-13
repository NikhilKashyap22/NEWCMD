// import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { LoggerService } from './logger.service';


// export const ErrorInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<unknown>,
//   next: HttpHandlerFn // Correctly use HttpHandlerFn
// ): Observable<HttpEvent<unknown>> => {
//   return next(req).pipe(
//     catchError((error) => {
//       // Handle the error here (log it, display a message, etc.)
//       // console.error('HTTP Error:', error);

//       return of(error); // Return an empty observable to continue
//     })
//   );
// };
