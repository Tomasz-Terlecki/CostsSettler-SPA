import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Circumstance } from '../models/circumstance.model';
import { CircumstanceForListDto } from '../models/dtos/circumstance-for-list.dto';

@Injectable({
  providedIn: 'root'
})
export class CircumstancesService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'circumstances');
  }

  get(queryParams: any): Observable<Array<CircumstanceForListDto>> {
    return this.httpClient.get<Array<CircumstanceForListDto>>(this.baseUrl, {
      params: queryParams
    });
  }

  getById(circumstanceId: string): Observable<Circumstance> {
    return this.httpClient.get<Circumstance>(this.baseUrl + `/${circumstanceId}`);
  }

  add(circumstance: Circumstance): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl, { circumstance });
  }
}
