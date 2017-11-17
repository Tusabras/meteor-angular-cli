import { NgModule }              from '@angular/core';
import { RouterModule, PreloadAllModules, Routes }  from '@angular/router';
import { ChatsComponent } from './pages/chats';
import { MessagesComponent } from './pages/messages';

// import { AboutComponent } from './pages/about';
// import { ContactComponent } from './pages/contact';
// import { DiscoverComponent } from './pages/discover';

// import { VRExperienceComponent, VideoComponent, ThankYouComponent, AppointmentComponent, EnquireComponent, ConfirmationComponent } from './pages/vr-experience';

const appRoutes: Routes = [
  { path: '', redirectTo: 'whatssap', pathMatch: 'full' },
  {
    path: '',
    component: ChatsComponent
  },
  {
    path: 'whatssap',
    children: [
      {
        path: '',
        component: ChatsComponent
      },
      {
        path: 'chat/:_id',
        component: MessagesComponent
      },
      {
        path: 'appointment',
        component: ChatsComponent
      },
      {
        path: 'confirmation',
        component: ChatsComponent
      },
      {
        path: 'enquire',
        component: ChatsComponent
      },
      {
        path: 'thank-you',
        component: ChatsComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes,{useHash:true, preloadingStrategy:PreloadAllModules})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}