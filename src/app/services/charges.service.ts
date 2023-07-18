import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ChargeForListDto } from '../models/dtos/charge-for-list.dto';

@Injectable({
  providedIn: 'root'
})
export class ChargesService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'charges');
  }

  get(queryParams: any): Observable<Array<ChargeForListDto>> {
    return this.httpClient.get<Array<ChargeForListDto>>(this.baseUrl, {
      params: queryParams
    });
  }

}
