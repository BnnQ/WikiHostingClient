import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WikiComponent } from './wiki/wiki.component';
import { WikiContributorsComponent } from './wiki-contributors/wiki-contributors.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DevComponent } from './dev/dev.component';
import { SearchComponent } from './search/search.component';
import { CreateTemplateComponent } from './create-template/create-template.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wiki/:id', component: WikiComponent },
  { path: 'wiki/:id/page/:pageId', component: WikiComponent },
  { path: 'wiki/:id/contributors', component: WikiContributorsComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'DEV', component: DevComponent },
  { path: 'search', component: SearchComponent },
  { path: 'createTemplate', component: CreateTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
