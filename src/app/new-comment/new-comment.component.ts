import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../share/services/snack-bar.service';
import { CommentsService, NewComment } from '../services/comments.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  showPreview = false;
  /**
   * 图片
   */
  img: any[] = [];
  @Input() postId: number;
  @ViewChild('commentBtn', { static: false }) commentBtn: ElementRef;

  newCommentForm = this.fb.group({
    nickName: ['匿名', [Validators.required]],
    content: ['', [Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private snack: SnackBarService,
    private comment: CommentsService
  ) { }

  ngOnInit() {
  }

  fileChange(selectedFiles: any[]) {
    this.img = selectedFiles;
  }

  submit() {
    if (!this.postId) {
      this.snack.open('无法提交回复');
    }
    if (this.newCommentForm.get('nickName').invalid) {
      this.snack.open('昵称不能为空');
      return;
    }
    if (this.newCommentForm.get('content').invalid) {
      this.snack.open('评论内容最少 4 个字');
      return;
    }

    this.commentBtn.nativeElement.disabled = true;
    timer(3000).subscribe(() => {
      this.commentBtn.nativeElement.disabled = false;
    });

    const info: NewComment = {
      postId: this.postId,
      nickName: this.newCommentForm.get('nickName').value,
      content: this.newCommentForm.get('content').value,
      images: this.img
    };
    this.comment.newComment(info)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open(data.message);
          return;
        }
        this.newCommentForm.get('nickName').setValue('');
        this.newCommentForm.get('content').setValue('');
        this.img = null;
      });
  }
}
