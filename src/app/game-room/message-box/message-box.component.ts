import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserManagementService } from '../../user-management.service';
import { GuessMessagesService } from '../guess-messages.service';
import { Message } from '../guess-messages.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  @ViewChild("scrollMe", { static: true }) scrollMe: ElementRef;

  newMessageEvent: Subscription = new Subscription();
  // JJV DEBUG - PASSING TEST NAME FOR NOW
  currentGuess: string = "";
  currentMessage: Message;
  allowAutoScroll: boolean = true;

  mouseDownCurrentMessages(event): void {
    this.allowAutoScroll = false;
  }

  mouseUpCurrentMessages(event): void {
    this.allowAutoScroll = true;
  }

  keyDown(event): void {
    if (event.key == "Enter") {
      // JJV DEBUG - NEED TO USE REAL USERNAME HERE INSTEAD OF JAMES TEST1
      this.currentMessage = new Message(this.userManagementService.getUsername(), this.currentGuess);
      this.guessMessagesService.sendMessage(this.currentMessage);
      this.currentGuess = "";
      console.log("submit");
    }
  }

  constructor(private userManagementService: UserManagementService, private guessMessagesService: GuessMessagesService) { }

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
