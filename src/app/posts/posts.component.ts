import { Component, OnInit } from '@angular/core';
import { PostsService, PostItem } from '../services/posts.service';
import { SnackBarService } from '../share/service/snack-bar.service';
import { CommentItem } from '../services/comments.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  list: PostItem[] = [];
  private index = 1;
  private readonly rows = 20;
  totalRows = 0;

  constructor(
    private post: PostsService,
    private snack: SnackBarService
  ) { }

  ngOnInit() {
    this.getList();
  }

  private getList() {
    this.post.getPosts(this.index, this.rows)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open('获取失败');
          return;
        }
        this.setPostList(data.data.list);
        this.totalRows = data.data.totalRows;
      });
  }
  /**
   * 初始化帖子列表
   * 初始化帖子里的图片
   */
  private setPostList(posts: PostItem[]) {
    posts.forEach(item => {
      item.img.current = item.img.thumbnail;
      item.img.style = 'previewable';
      item.comments = this.setCommentList(item.comments);
    });
    this.list = posts;
  }
  /**
   * 初始化评论列表
   * 初始化评论里的图片
   */
  private setCommentList(comments: CommentItem[]): CommentItem[] {
    comments.forEach(comment => {
      comment.imgs.forEach(img => {
        img.current = img.thumbnail;
        img.style = 'previewable';
      });
    });
    return comments;
  }

  /**
   * 改变页码
   * @param index 页码
   */
  changePage(index: number) {
    // console.log(index);
    this.index = index;
    this.getList();
  }

  /**
   * 放大帖子图片
   * @param i 索引
   */
  changePostImg(i: number) {
    const post = this.list[i];
    post.img.style = post.img.style === 'previewable' ? 'shrinkable' : 'previewable';
    post.img.current = post.img.current === post.img.source ? post.img.thumbnail : post.img.source;
  }
  /**
   * 放大评论图片
   * @param i 帖子索引
   * @param commentIndex 评论索引
   * @param imgIndex 图片索引
   */
  changeCommentImg(i: number, commentIndex: number, imgIndex: number) {
    const img = this.list[i].comments[commentIndex].imgs[imgIndex];
    img.style = img.style === 'previewable' ? 'shrinkable' : 'previewable';
    img.current = img.current === img.source ? img.thumbnail : img.source;
  }
  /**
   * 展开该帖子的所有评论
   * @param id 帖子 ID
   */
  allComments(id: number, index: number) {
    console.log(`${id} - ${index}`);

    if (this.list[index]) {
      // this.list[index].comments = this.setCommentList();
    }
  }
}
