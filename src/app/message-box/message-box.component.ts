import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { GuessMessagesService } from '../guess-messages.service';
import { Message } from '../guess-messages.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  @ViewChild("scrollMe") scrollMe: ElementRef;

  newMessageEvent: Subscription = new Subscription();
  allowAutoScroll: boolean = true;
 
  mouseDownCurrentMessages(event): void {
    this.allowAutoScroll = false;
  }

  mouseUpCurrentMessages(event): void {
    this.allowAutoScroll = true;
  }

  constructor(private guessMessagesService: GuessMessagesService) { }

  ngOnInit() {
    this.newMessageEvent = this.guessMessagesService.newMessageEvent.subscribe(() => {
      console.log("new message");
    });
  }

  /* This autoscroll must occur *after* the data has been updated AND the view updates */
  ngAfterViewChecked() {
    if (this.allowAutoScroll) this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.newMessageEvent.unsubscribe();
  }

}
