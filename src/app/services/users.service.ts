import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UserForListDto } from '../models/dtos/user-for-list.dto';

/**
 * Service to manage users data.
 */
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  /**
   * Creates new UsersService instance.
   * @param httpClient client used to send request.
   */
  constructor(httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  /**
   * Sends get users by parameters request.
   * @param queryParams user filter parameters.
   * @returns observable of list of users.
   */
  get(queryParams: any): Observable<Array<UserForListDto>> {
    return this.httpClient.get<Array<UserForListDto>>(this.baseUrl, {
      params: queryParams
    });
  }

}
