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
    // tslint:disable-next-line: variable-name
    const _totalPages = this._totalRows % this._rows === 0 ?
      this._totalRows / this._rows : this._totalRows / this._rows + 1;
    return Math.floor(_totalPages);
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
    //  页码只能显示 10 页
    const SHOWABLE_PAGE_COUNT = 10;

    if (this.currentIndex <= 6) {
      for (let i = 1; i <= SHOWABLE_PAGE_COUNT; i++) {
        if (i > this.totalPages) {
          return;
        }
        this.showablePage.push(i);
      }
    } else {
      const LESS = 4;
      // const LESS = this.currentIndex - this.totalPages % SHOWABLE_PAGE_COUNT - 1;
      // console.log(`LESS: ${LESS} = currentIndex: ${this.currentIndex} - totalPages: ${this.totalPages}`);
      for (let i = 0; i < SHOWABLE_PAGE_COUNT; i++) {
        increment = this.currentIndex + i - LESS;
        if (increment > this.totalPages) {
          break;
        }
        this.showablePage.push(increment);
      }
    }
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
