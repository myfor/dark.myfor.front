import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface Paginator < T = any > {
  index: number;
  rows: number;
  totalRows: number;
  totalPages: number;
  list: T[];
}

export interface Result < T = any > {
  message: string;
  data: T;
  /**
   * 是否为失败请求, 在拦截器中设置
   */
  isFault: boolean;
}

export interface Img {
  /**
   * 当前显示的图片
   */
  current: string;
  /**
   * 样式
   */
  style: string;
  thumbnail: string;
  source: string;
}

/**
 * 请求失败, 可以和 Result 的 data 对比
 */
export const FAULT: undefined = undefined;

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  handleError(error: HttpErrorResponse) {
    console.error(`backend returned code ${error.status}`);
    console.error(`error: ${error.error}`);
    const result: Result = {
      message: '请求失败, 稍后重试',
      data: FAULT,
      isFault: true
    };
    return of(result);
  }
}
