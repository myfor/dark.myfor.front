import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isOpen = false;
  currentTime = '';
  hour = new Date().getHours();

  ngOnInit() {
    this.setCurrentTime();
    interval(1000).subscribe(() => {
      //  用于检测当前是否是开放时间
      this.setCurrentTime();
    });
  }
  /**
   * 设置当前时间
   */
  private setCurrentTime() {
    const dateTime = new Date();
    this.hour = dateTime.getHours();
    let minutes = dateTime.getMinutes().toString();
    minutes = minutes.length === 2 ? minutes : `0${minutes}`;
    let seconds = dateTime.getSeconds().toString();
    seconds = seconds.length === 2 ? seconds : `0${seconds}`;

    this.currentTime = `${this.hour}:${minutes}:${seconds}`;

    //  开放时间
    // if (this.hour >= 6) {
    if (this.hour >= 0 && this.hour < 6) {
      if (!this.isOpen) {
        this.isOpen = true;
      }
    } else {
      //  不是开放时间
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }


}
