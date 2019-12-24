import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../share/service/snack-bar.service';
import { NewPost, PostsService } from '../services/posts.service';

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
    private snack: SnackBarService,
    private post: PostsService
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

    const info: NewPost = {
      nickName: this.newPostForm.get('nickName').value,
      content: this.newPostForm.get('content').value,
      img: this.img
    };
    this.post.newPost(info)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open('提交失败');
          return;
        }
      });
  }
}
