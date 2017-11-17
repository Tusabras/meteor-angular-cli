import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Chat,Message,MessageType } from '../../../../api/server/models';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Messages } from '../../../../api/server/collections';
import { MeteorObservable } from 'meteor-rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy  {

  selectedChat: Chat;
  title: string;
  picture: string;
  // messages: Observable<Message[]>;
  messages:any;
  message: string = '';
  autoScroller: MutationObserver;
  scrollOffset = 0;
  messagesDayGroups;

   constructor(private route: ActivatedRoute, private el: ElementRef) {
    //  this.selectedChat = <Chat>navParams.get('chat');
    this.route.params
    .subscribe( params => this.selectedChat = params);
    console.log('Selected chat id is: ', this.selectedChat._id);
    this.title = this.selectedChat.title;
    this.picture = this.selectedChat.picture;
    // this.scroller = 
  }

  onInputKeypress({ keyCode }: KeyboardEvent): void {
    // console.log(keyCode)
    if (keyCode === 13) {
      this.sendTextMessage();
    }
  }

  private get messagesPageContent(): Element {
    return this.el.nativeElement.querySelector('.messages-page-content');
  }
 
  private get messagesList(): Element {
    return this.messagesPageContent.querySelector('.messages');
  }
 
  private get scroller(): Element {
    return this.messagesList.querySelector('.scroll-content');
  }
 
  sendTextMessage(): void {
    // If message was yet to be typed, abort
    if (!this.message) {
      return;
    }
 
    MeteorObservable.call('addMessage', MessageType.TEXT,
      this.selectedChat._id,
      this.message
    ).zone().subscribe(() => {
      // Zero the input field
      this.message = '';
    });
  }
  
   ngOnInit() {
    
    this.autoScroller = this.autoScroll();
    this.subscribeMessages();

    // let isEven = false;
    // console.log(Messages.find({ chatId: this.selectedChat._id }).cursor.count());
     
    //    this.messages = Messages.find(
    //      {chatId: this.selectedChat._id}, 
    //      {sort: {createdAt: 1}}
    //    ).map((messages: Message[]) => {
    //      messages.forEach((message: Message) => {
    //        message.ownership = isEven ? 'mine' : 'other';
    //        isEven = !isEven; 
    //      });
         
    //      return messages;
    //    });
   }

   subscribeMessages() {
    if(this.scroller)this.scrollOffset = this.scroller.scrollHeight;
    this.messagesDayGroups = this.findMessagesDayGroups();
  }
 
  findMessagesDayGroups() {
    let isEven = false;
 
    return Messages.find({
      chatId: this.selectedChat._id
    }, {
      sort: { createdAt: 1 }
    })
      .map((messages: Message[]) => {
        const format = 'D MMMM Y';
 
        // Compose missing data that we would like to show in the view
        messages.forEach((message) => {
          message.ownership = isEven ? 'mine' : 'other';
          isEven = !isEven;
 
          return message;
        });
 
        // Group by creation day
        const groupedMessages = _.groupBy(messages, (message) => {
          return moment(message.createdAt).format(format);
        });
 
        // Transform dictionary into an array since Angular's view engine doesn't know how
        // to iterate through it
        return Object.keys(groupedMessages).map((timestamp: string) => {
          return {
            timestamp: timestamp,
            messages: groupedMessages[timestamp],
            today: moment().format(format) === timestamp
          };
        });
      });
  }

   ngOnDestroy() {
    this.autoScroller.disconnect();
  }
 
  autoScroll(): MutationObserver {
    const autoScroller = new MutationObserver(this.scrollDown.bind(this));
 
    autoScroller.observe(this.messagesList, {
      childList: true,
      subtree: true
    }); 
 
    return autoScroller;
  }

  scrollDown(): void {
    // Scroll down and apply specified offset
    if(this.scroller)this.scroller.scrollTop = this.scroller.scrollHeight - this.scrollOffset;
    // Zero offset for next invocation
    this.scrollOffset = 0;
  }

}
