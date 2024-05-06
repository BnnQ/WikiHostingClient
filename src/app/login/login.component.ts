import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 username:string ='';
 password: string='';
 rememberMe:boolean = false;
 errorMsg :string = '';
 constructor(private http:HttpClient, private router:Router){}

 login(){
  const credentials = {
    username: this.username,
    password : this.password
  }

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  this.http.post<any>('https://localhost:7133/api/Users/auth', credentials,httpOptions).subscribe(
    (response)=>{
      console.log('Login successful',response);
      this.router.navigate(['/search']);
      sessionStorage.setItem('currentUser', JSON.stringify(response));
    },
    (error)=>{
      console.error('Login failed', error);
      this.errorMsg = "Invalid username or password!";
    }
    );
 }
}
