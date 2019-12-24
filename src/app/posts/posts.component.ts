import { Component, OnInit } from '@angular/core';
import { PostsService, PostItem } from '../services/posts.service';
import { SnackBarService } from '../share/service/snack-bar.service';
import { CommentItem, CommentsService } from '../services/comments.service';

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
  /**
   * 图片可放大
   */
  private readonly previewable = 'previewable';
  /**
   * 图片可缩小
   */
  private readonly shrinkable = 'shrinkable';

  constructor(
    private post: PostsService,
    private comment: CommentsService,
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
      item.img.style = this.previewable;
      item.comments = this.setCommentList(item.comments);
      item.hasMoreComments = item.comments.length >= 5;
      item.showReplyBox = false;
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
        img.style = this.previewable;
      });
    });
    return comments;
  }

  /**
   * 触发回复框
   */
  triggerReplyBox(i: number) {
    this.list[i].showReplyBox = !this.list[i].showReplyBox;
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
    post.img.style = post.img.style === this.previewable ? this.shrinkable : this.previewable;
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
    img.style = img.style === this.previewable ? this.shrinkable : this.previewable;
    img.current = img.current === img.source ? img.thumbnail : img.source;
  }
  /**
   * 展开该帖子的所有评论
   * @param id 帖子 ID
   */
  allComments(id: number, index: number) {
    // console.log(`${id} - ${index}`);
    const thisPost = this.list[index];
    if (thisPost) {
      this.comment.getAllComments(id)
        .subscribe((data) => {
          if (data.isFault) {
            this.snack.open('获取评论失败');
          }
          thisPost.comments = this.setCommentList(data.data);
          thisPost.hasMoreComments = false;
        });
    }
  }
}
