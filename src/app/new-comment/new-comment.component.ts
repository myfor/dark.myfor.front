import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../share/service/snack-bar.service';
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
  img: any;
  @ViewChild('commentBtn', { static: false }) commentBtn: ElementRef;

  newCommentForm = this.fb.group({
    nickName: ['', [Validators.required]],
    content: ['', [Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private snack: SnackBarService,
  ) { }

  ngOnInit() {
  }

  fileChange(selectedFile: any) {
    this.img = selectedFile;
  }

  submit(btn: any) {
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

  }
}
