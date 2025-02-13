import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {

  constructor() {}

  getServiceUrl(serviceName: string): string {
    return environment.services[serviceName] || '';
  }

  getApiPath(serviceName: string, apiKey: string, params: Record<string, string> = {}): string {
    let path = environment.apiPaths[serviceName]?.[apiKey] || '';

    Object.keys(params).forEach((key) => {
      path = path.replace(`{${key}}`, params[key]);
    });

    return path;
  }
}
