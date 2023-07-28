import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UserForListDto } from '../models/dtos/user-for-list.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  get(queryParams: any): Observable<Array<UserForListDto>> {
    return this.httpClient.get<Array<UserForListDto>>(this.baseUrl, {
      params: queryParams
    });
  }

}
