import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModel } from '../models/base.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<TModel extends BaseModel> {

  baseUrl: string;

  constructor(protected httpClient: HttpClient, controllerName: string) {
    this.baseUrl = 'http://costssettler.com:8082/api/' + controllerName;
  }

  get(queryParams: any): Observable<Array<TModel>> {
    return this.httpClient.get<Array<TModel>>(this.baseUrl, {
      params: queryParams
    });
  }

}
