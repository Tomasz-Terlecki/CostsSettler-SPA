import { Injectable, OnInit } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Charge } from '../models/charge.model';

@Injectable({
  providedIn: 'root'
})
export class ChargesService extends BaseService<Charge> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'charges');
  }

}
