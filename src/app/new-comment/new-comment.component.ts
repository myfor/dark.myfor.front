import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../share/service/snack-bar.service';

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

  submit() {
    if (this.newCommentForm.get('nickName').invalid) {
      this.snack.open('昵称不能为空');
      return;
    }
    if (this.newCommentForm.get('content').invalid) {
      this.snack.open('内容最少 8 个字');
      return;
    }

  }
}
