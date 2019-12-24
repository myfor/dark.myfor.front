import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, Result, Img } from './common';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

export interface CommentItem {
  nickName: string;
  content: string;
  date: string;
  imgs: Img[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private baseService: BaseService,
    private http: HttpClient
  ) { }
}
