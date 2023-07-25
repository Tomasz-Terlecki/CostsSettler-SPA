import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ChargeForListDto } from '../models/dtos/charge-for-list.dto';
import { ChargeVote } from '../enums/charge-vote.enum';

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

  settleCharge(chargeId: string): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseUrl + '/settle', { chargeId });
  }

  voteForCharge(chargeId: string, chargeVote: ChargeVote): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseUrl + '/vote', { chargeId, chargeVote });
  }
}
