import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  baseUrl: string;

  constructor(protected httpClient: HttpClient, controllerName: string) {
    this.baseUrl = 'http://costssettler.com:8082/api/' + controllerName;
  }

}
