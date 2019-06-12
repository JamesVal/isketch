import { Injectable, Output, EventEmitter } from '@angular/core';

/*

---------------------- TODO's ----------------------

* Need actual communication to a backend and build out the functionality as the server
should be parsing these requests and sending out status messages of sorts.

*/

export class Message {
  username: string;
  message: string;

  constructor(curUser: string, curMessage: string) {
    this.username = curUser;
    this.message = curMessage;
  }
}

@Injectable()
export class GuessMessagesService {
  @Output() newMessageEvent: EventEmitter<any> = new EventEmitter();

  messageList: Message[] = [];
  /* JJV DEBUG */
  testMessageCounter: number = 0;

  updateMessages(messagesToAdd: Message) {
    this.messageList.push(messagesToAdd);
    this.newMessageEvent.emit();
  }

  sendMessage(): void {
    console.log("test");
  }

  /* JJV DEBUG */
  testAddMessage(): void {
    let newMessage = new Message("James", "Message" + this.testMessageCounter);
    this.testMessageCounter++;
    this.updateMessages(newMessage);
  }

  constructor() {
    // JJV DEBUG - TEST LIST
    var message1 = new Message("James", "HELLO!");
    var message2 = new Message("James", "WORLD!");
    var message3 = new Message("James", "I'M TESTING!");

    this.updateMessages(message1);
    this.updateMessages(message2);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);
    this.updateMessages(message3);

    /* JJV DEBUG */
    setInterval(() => {
      this.testAddMessage();
    }, 1000);
  }
}
