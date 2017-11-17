import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Chat, MessageType } from '../../../../api/server/models';
import { Chats, Messages } from '../../../../api/server/collections';
// import { Chats, Messages } from 'api/collections';
// import { Chat } from 'api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  chats;
  
   constructor(private _router:Router) {
   }
  
   ngOnInit() {
 
    console.log(Messages.find({}).cursor.count());

     this.chats = Chats
       .find({})
       .mergeMap((chats: Chat[]) =>
         Observable.combineLatest(
           ...chats.map((chat: Chat) =>
             Messages
               .find({chatId: chat._id})
               .startWith(null)
               .map(messages => {
                //  console.log("eseeee",chat,messages)
                 if (messages) chat.lastMessage = messages[0];
                 return chat; 
               })
           )
         ) 
       )
  }

  showMessages(chat): void {
    console.log(chat);
    window.scrollTo(0, 0);
    this._router.navigate(['/whatssap/chat/'+chat._id]);
  }

  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
  }

}
