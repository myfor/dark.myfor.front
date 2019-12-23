import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  totalRows = 200;

  constructor() { }

  ngOnInit() {
  }

  changePage(index: number) {
    console.log(index);
  }
}
