import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { ModalCreateTemplateComponent } from './modal-create-template/modal-create-template.component';

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
import {FeedComponent} from './feed/feed.component';
import {ApiWikiRepository} from "../services/api-wiki-repository";
import {ApiPageRepository} from "../services/api-page-repository";
import {TextEditorComponent} from './text-editor/text-editor.component';
import {DevComponent} from './dev/dev.component';
import {ToastrModule} from "ngx-toastr";
import {INotificationService} from "../services/abstractions/i-notification-service";
import {SignalNotificationService} from "../services/signal-notification-service";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {IMediaRepository} from "../services/abstractions/i-media-repository";
import {ITemplateRepository} from "../services/abstractions/i-template-repository";
import {ApiMediaRepository} from "../services/api-media-repository";
import {ApiTemplateRepository} from "../services/api-template-repository";
import { ModalSelectTemplateComponent } from './modal-select-template/modal-select-template.component';
import { ModalUseTemplateComponent } from './modal-use-template/modal-use-template.component';
import {ProfileComponent} from "./profile/profile.component";
import { FeedbackComponent } from './feedback/feedback.component';
import {IFeedbackRepository} from "../services/abstractions/i-feedback-repository";
import {ApiFeedbackRepository} from "../services/api-feedback-repository";
import { CreateWikiComponent } from './create-wiki/create-wiki.component';
import {ITopicRepository} from "../services/abstractions/i-topic-repository";
import {ApiTopicRepository} from "../services/api-topic-repository";
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ModalWikiSettingsComponent } from './modal-wiki-settings/modal-wiki-settings.component';
import {ApiUserRepository} from "../services/api-user-repository";
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SafeHtmlToStringPipe } from '../pipes/safe-html-to-string/safe-html-to-string.pipe';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { ModalReportComponent } from './modal-report/modal-report/modal-report.component';

export const SERVICE_IDENTIFIERS = {
  IHttpService: new InjectionToken<IHttpService>('IHttpService'),
  IWikiRepository: new InjectionToken<IWikiRepository>('IWikiRepository'),
  IPageRepository: new InjectionToken<IPageRepository>('IPageRepository'),
  IUserRepository: new InjectionToken<IUserRepository>('IUserRepository'),
  INotificationService: new InjectionToken<INotificationService>('INotificationService'),
  IMediaRepository: new InjectionToken<IMediaRepository>('IMediaRepository'),
  ITemplateRepository: new InjectionToken<ITemplateRepository>('ITemplateRepository'),
  IFeedbackRepository: new InjectionToken<IFeedbackRepository>('IFeedbackRepository'),
  ITopicRepository: new InjectionToken<ITopicRepository>('ITopicRepository')
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    SearchComponent,
    ModalCreateTemplateComponent,
    WikiLayoutComponent,
    WikiComponent,
    WikiContributorsComponent,
    FeedComponent,
    TextEditorComponent,
    DevComponent,
    ModalSelectTemplateComponent,
    ModalUseTemplateComponent,
    ProfileComponent,
    FeedbackComponent,
    CreateWikiComponent,
    CreatePageComponent,
    EditPageComponent,
    ModalWikiSettingsComponent,
    SubscriptionsComponent,
    SafeHtmlToStringPipe,
    WikiPageComponent,
    ModalReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000, // 10 seconds
      closeButton: true
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FaIconComponent,
    ReactiveFormsModule
  ],
  providers: [
    {provide: SERVICE_IDENTIFIERS.IHttpService, useClass: AxiosHttpService},
    {provide: SERVICE_IDENTIFIERS.IWikiRepository, useClass: ApiWikiRepository},
    {provide: SERVICE_IDENTIFIERS.IPageRepository, useClass: ApiPageRepository},
    {provide: SERVICE_IDENTIFIERS.IUserRepository, useClass: ApiUserRepository},
    {provide: SERVICE_IDENTIFIERS.IMediaRepository, useClass: ApiMediaRepository},
    {provide: SERVICE_IDENTIFIERS.ITemplateRepository, useClass: ApiTemplateRepository},
    {provide: SERVICE_IDENTIFIERS.INotificationService, useClass: SignalNotificationService},
    {provide: SERVICE_IDENTIFIERS.IFeedbackRepository, useClass: ApiFeedbackRepository},
    {provide: SERVICE_IDENTIFIERS.ITopicRepository, useClass: ApiTopicRepository}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
