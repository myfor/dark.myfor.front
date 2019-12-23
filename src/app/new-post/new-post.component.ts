import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../share/service/snack-bar.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  showPreview = false;
  /**
   * 图片
   */
  img: any;

  newPostForm = this.fb.group({
    nickName: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private snack: SnackBarService
  ) { }

  ngOnInit() {
  }

  fileChange(selectedFile: any) {
    this.img = selectedFile;
  }

  submit() {
    if (this.newPostForm.get('nickName').invalid) {
      this.snack.open('昵称不能为空');
      return;
    }
    if (this.newPostForm.get('content').invalid) {
      this.snack.open('内容最少 8 个字');
      return;
    }
  }
}
