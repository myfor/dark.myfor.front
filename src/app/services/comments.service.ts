import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService, Result, Img } from './common';
import { Observable } from 'rxjs';
import { catchError, debounceTime, retry } from 'rxjs/operators';

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

  /**
   * 获取所有评论
   * @param postId 帖子 ID
   */
  getAllComments(postId: number): Observable<Result<CommentItem[]>> {
    // const url = `api/comments?postId=${postId}`;
    const url = `assets/mocks/comments.json`;
    return this.http.get<Result<CommentItem[]>>(url)
      .pipe(
        debounceTime(1000),
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
