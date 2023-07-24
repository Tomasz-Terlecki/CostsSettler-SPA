import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  baseUrl: string;

  constructor(protected httpClient: HttpClient, controllerName: string) {
    this.baseUrl = environment.baseUrl + '/' + controllerName;
  }

}
