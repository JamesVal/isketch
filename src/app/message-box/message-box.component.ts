import { Component, OnInit } from '@angular/core';

class Message {
  username: string;
  message: string;

  constructor(curUser: string, curMessage: string) {
    this.username = curUser;
    this.message = curMessage;
  }
}

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  messageList: Message[] = [];

  constructor() { }

  ngOnInit() {
    // JJV DEBUG - TEST LIST
    var message1 = new Message("James", "HELLO!");
    var message2 = new Message("James", "WORLD!");
    var message3 = new Message("James", "I'M TESTING!");

    this.messageList.push(message1);
    this.messageList.push(message2);
    this.messageList.push(message3);
  }

}
