import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService, Result, Paginator, Img } from './common';
import { Observable } from 'rxjs';
import { catchError, debounceTime, retry } from 'rxjs/operators';
import { CommentItem } from './comments.service';

export interface NewPost {
  nickName: string;
  content: string;
  img: string;
}

export interface PostItem {
  id: number;
  nickName: string;
  date: string;
  content: string;
  img: Img;
  comments: CommentItem[];
  hasMoreComments: boolean;
}

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
  newPost(info: NewPost): Observable<Result> {
    const url = 'api/posts';
    const newPostForm = new FormData();
    newPostForm.set('nickName', info.nickName);
    newPostForm.set('content', info.content);
    newPostForm.set('img', info.img);

    return this.http.post<Result>(url, newPostForm)
      .pipe(
        debounceTime(1000),
        catchError(this.baseService.handleError)
      );
  }

  /**
   * 获取帖子列表
   */
  getPosts(index: number, rows: number): Observable<Result<Paginator<PostItem>>> {
    const url = `assets/mocks/posts.json`;
    const param = new HttpParams()
      .set('index', index.toString())
      .set('rows', rows.toString());
    // const url = `api/posts?${param.toString()}`;
    return this.http.get<Result<Paginator<PostItem>>>(url)
      .pipe(
        debounceTime(1000),
        retry(2),
        catchError(this.baseService.handleError)
      );
  }
}
