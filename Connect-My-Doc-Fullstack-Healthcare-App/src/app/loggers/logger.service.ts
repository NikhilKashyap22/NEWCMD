import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private logKey = 'errorLogs'; // LocalStorage key for storing logs

  constructor() {}

  /**
   * Logs an error message.
   * @param message - Error message or object
   * @param stack - Stack trace (optional)
   */
  logError(message: string, stack?: string) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      message,
      stack
    };

    // Get existing logs from LocalStorage
    const logs = this.getLogs();
    logs.push(errorEntry);

    // Store updated logs in LocalStorage
    localStorage.setItem(this.logKey, JSON.stringify(logs));

    // Also log to console
    console.error('Logged Error:', errorEntry);
    // Log the error to Sentry (new integration)
    Sentry.captureException(new Error(message));  // Send the error to Sentry
  }

  /**
   * Retrieves all stored error logs from LocalStorage.
   * @returns An array of error logs.
   */
  getLogs(): any[] {
    return JSON.parse(localStorage.getItem(this.logKey) || '[]');
  }

  /**
   * Clears all logs from LocalStorage.
   */
  clearLogs() {
    localStorage.removeItem(this.logKey);
    console.warn('All logs have been cleared.');
  }

  /**
   * Downloads logs as a text file.
   */
  downloadLogs() {
    const logs = this.getLogs();
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-logs-${new Date().toISOString()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
