import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { SelectTemplateComponent } from './select-template/select-template.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'signin', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'search', component:SearchComponent},
  {path:'createTemplate', component:CreateTemplateComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    SearchComponent,
    CreateTemplateComponent,
    SelectTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
