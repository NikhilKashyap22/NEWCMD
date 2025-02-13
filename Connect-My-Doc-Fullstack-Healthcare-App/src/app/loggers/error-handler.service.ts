import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private logger: LoggerService) {}

  handleError(error: any) {
    const message = error.message || error.toString();
    const stack = error.stack || '';

    // Log error to LocalStorage
    this.logger.logError(message, stack);

    console.error('Global Error Caught:', error);
  }
}
