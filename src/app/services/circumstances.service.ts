import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Circumstance } from '../models/circumstance.model';
import { CircumstanceForListDto } from '../models/dtos/circumstance-for-list.dto';
import { CircumstanceForAddDto } from '../models/dtos/circumstance-for-add.dto';

/**
 * Service to manage circumstances data.
 */
@Injectable({
  providedIn: 'root'
})
export class CircumstancesService extends BaseService {

  /**
   * Creates new CircumstancesService instance.
   * @param httpClient client used to send request.
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'circumstances');
  }
  
  /**
   * Sends get circumstances by parameters request.
   * @param queryParams circumstance filter parameters.
   * @returns observable of list of circumstances.
   */
  get(queryParams: any): Observable<Array<CircumstanceForListDto>> {
    return this.httpClient.get<Array<CircumstanceForListDto>>(this.baseUrl, {
      params: queryParams
    });
  }

  /**
   * Sends get circumstance by id request.
   * @param circumstanceId circumstance id to get.
   * @returns observable of returned circumstance.
   */
  getById(circumstanceId: string): Observable<Circumstance> {
    return this.httpClient.get<Circumstance>(this.baseUrl + `/${circumstanceId}`);
  }

  /**
   * Sends add circumstance request.
   * @param circumstance circumstance to add.
   * @returns observable of boolean representing if adding is succeeded.
   */
  add(circumstance: CircumstanceForAddDto): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl, circumstance);
  }
}
