import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {WikiLayoutComponent} from "./wiki-layout/wiki-layout.component";
import {WikiComponent} from "./wiki/wiki.component";
import {WikiContributorsComponent} from "./wiki-contributors/wiki-contributors.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import IHttpService from "../services/abstractions/i-http-service";
import {AxiosHttpService} from "../services/axios-http-service";
import {IWikiRepository} from "../services/abstractions/i-wiki-repository";
import {StubWikiRepository} from "../services/stub-wiki-repository";
import {IPageRepository} from "../services/abstractions/i-page-repository";
import {StubPageRepository} from "../services/stub-page-repository";
import {IUserRepository} from "../services/abstractions/i-user-repository";
import {StubUserRepository} from "../services/stub-user-repository";
import { FeedComponent } from './feed/feed.component';
import {ApiWikiRepository} from "../services/api-wiki-repository";
import {ApiPageRepository} from "../services/api-page-repository";
import { TextEditorComponent } from './text-editor/text-editor.component';
import { DevComponent } from './dev/dev.component';
import { ModalTemplatesMenuComponent } from './modal-templates-menu/modal-templates-menu.component';

const appRoutes: Routes = [
  {path:'', component: HomeComponent },
  {path: 'signin', component: LoginComponent },
  {path: 'register', component: RegistrationComponent },
]

export const SERVICE_IDENTIFIERS = {
  IHttpService: new InjectionToken<IHttpService>('IHttpService'),
  IWikiRepository: new InjectionToken<IWikiRepository>('IWikiRepository'),
  IPageRepository: new InjectionToken<IPageRepository>('IPageRepository'),
  IUserRepository: new InjectionToken<IUserRepository>('IUserRepository')
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    WikiLayoutComponent,
    WikiComponent,
    WikiContributorsComponent,
    FeedComponent,
    TextEditorComponent,
    DevComponent,
    ModalTemplatesMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    FaIconComponent
  ],
  providers: [
    { provide: SERVICE_IDENTIFIERS.IHttpService, useClass: AxiosHttpService },
    { provide: SERVICE_IDENTIFIERS.IWikiRepository, useClass: ApiWikiRepository },
    { provide: SERVICE_IDENTIFIERS.IPageRepository, useClass: StubPageRepository },
    { provide: SERVICE_IDENTIFIERS.IUserRepository, useClass: StubUserRepository }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
