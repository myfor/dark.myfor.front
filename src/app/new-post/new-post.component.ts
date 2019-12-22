import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPostForm = this.fb.group({
    nickName: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
