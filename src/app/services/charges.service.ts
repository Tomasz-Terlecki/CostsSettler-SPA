import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ChargeForListDto } from '../models/dtos/charge-for-list.dto';
import { ChargeVote } from '../enums/charge-vote.enum';

/**
 * Service to manage charges data.
 */
@Injectable({
  providedIn: 'root'
})
export class ChargesService extends BaseService {

  /**
   * Creates new ChargesService instance.
   * @param httpClient client used to send request.
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'charges');
  }

  /**
   * Sends get charges by parameters request.
   * @param queryParams charges filter parameters.
   * @returns observable of list of charges.
   */
  get(queryParams: any): Observable<Array<ChargeForListDto>> {
    return this.httpClient.get<Array<ChargeForListDto>>(this.baseUrl, {
      params: queryParams
    });
  }

  /**
   * Sends settle charge request.
   * @param chargeId id of charge to settle.
   * @returns observable of boolean representing if settling is succeeded.
   */
  settleCharge(chargeId: string): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseUrl + '/settle', { chargeId });
  }

  /**
   * Sends vote for charge request.
   * @param chargeId id of charge to settle.
   * @param chargeVote vote for charge.
   * @returns observable of boolean representing if vote is succeeded.
   */
  voteForCharge(chargeId: string, chargeVote: ChargeVote): Observable<boolean> {
    return this.httpClient.put<boolean>(this.baseUrl + '/vote', { chargeId, chargeVote });
  }
}
