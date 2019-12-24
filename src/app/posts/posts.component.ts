import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  list = [];
  private index = 1;
  private readonly rows = 20;
  totalRows = 400;

  constructor(
    private post: PostsService
  ) { }

  ngOnInit() {
    this.getList();
  }

  private getList() {

  }

  /**
   * 改变页码
   * @param index 页码
   */
  changePage(index: number) {
    console.log(index);
    this.index = index;
    this.getList();
  }
}
