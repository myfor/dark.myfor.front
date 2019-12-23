import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  // tslint:disable-next-line: variable-name
  private _rows = 20;
  // tslint:disable-next-line: variable-name
  private _totalRows = 100;
  // showFirstPage = false;
  // showLastPage = false;

  /**
   * 是否有上一页
   */
  get hasPre(): boolean {
    return this.currentIndex > 1;
  }
  /**
   * 是否有下一页
   */
  get hasNext(): boolean {
    return this.currentIndex < this.totalPages;
  }

  /**
   * 当前页码
   */
  @Input() currentIndex = 1;
  /**
   * 每页多少行数据
   */
  @Input() set rows(r: number) {
    this._rows = r;
  }
  /**
   * 总数据数
   */
  @Input() set totalRows(t: number) {
    this._totalRows = t;
    this.setShowablePage();
  }
  @Output() pageIndex = new EventEmitter<number>();
  /**
   * 获取总页数
   */
  get totalPages(): number {
    return this._totalRows % this._rows === 0 ?
      this._totalRows / this._rows : this._totalRows / this._rows + 1;
  }
  /**
   * 可显示的页码数组
   */
  showablePage: number[] = [];

  constructor() { }

  /**
   * 设置可显示的页码
   */
  private setShowablePage() {
    this.showablePage = [];
    let increment = 0;

    if (this.currentIndex <= 6) {
      for (let i = 1; i <= 10; i++) {
        if (i > this.totalPages) {
          return;
        }
        this.showablePage.push(i);
      }
    } else {
      for (let i = 0; i < 10; i++) {
        increment = this.currentIndex + i - 4;
        if (increment > this.totalPages) {
          return;
        }
        this.showablePage.push(increment);
      }
    }
    // console.log('first: ' + this.showablePage[0]);
    // if (this.showablePage[0] !== 1) {
    //   this.showFirstPage = true;
    // } else {
    //   this.showFirstPage = false;
    // }
    // console.log('last: ' + this.showablePage[this.showablePage.length]);
    // if (this.showablePage[this.showablePage.length] !== this.totalPages) {
    //   this.showLastPage = true;
    // } else {
    //   this.showLastPage = false;
    // }
  }

  /**
   * 上一页
   */
  prePage() {
    if (this.currentIndex <= 1) {
      return;
    }
    this.changePage(this.currentIndex - 1);
  }
  /**
   * 下一页
   */
  nextPage() {
    if (this.currentIndex >= this.totalPages) {
      return;
    }
    this.changePage(this.currentIndex + 1);
  }
  /**
   * 改变页码
   * @param index 新页码
   */
  changePage(index: number) {
    if (this.currentIndex === index) {
      return;
    }
    // console.log(index);
    this.pageIndex.emit(index);
    this.currentIndex = index;
    this.setShowablePage();
  }
}
