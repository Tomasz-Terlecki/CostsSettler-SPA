import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * Base service to manage domain data.
 */
@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  /** Base API url. */
  baseUrl: string;

  /**
   * Creates new BaseService instance.
   * @param httpClient client used to send request.
   * @param endpoint name of endpoint to send requests to.
   */
  constructor(protected httpClient: HttpClient, endpoint: string) {
    this.baseUrl = environment.baseUrl + '/' + endpoint;
  }

}
