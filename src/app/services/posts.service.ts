import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, Result } from './common';
import { Observable } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private baseService: BaseService,
    private http: HttpClient
  ) { }

  /**
   * 发新贴
   */
  newPost(): Observable<Result> {
    const url = 'api/posts';
    return this.http.post<Result>(url, '')
      .pipe(
        debounceTime(1000),
        catchError(this.baseService.handleError)
      );
  }
}
