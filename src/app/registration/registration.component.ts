import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent{

  email:string="";
  username:string="";
  password:string="";
  agreed:boolean = false
  errorMsg:string = "";

  constructor(private http:HttpClient, private router: Router){
  }

  register(){
    if(this.agreed){
      const credentials = {
        email:this.email,
        username:this.username,
        password: this.password
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      console.log(credentials);

      this.http.post('https://localhost:7133/api/Users/register',credentials,httpOptions).subscribe(
        (response)=>{
          console.log('Registration successful',response);
          this.router.navigate(['/login']);
        },
        (error)=>{
          console.error('Registration failed', error);
          this.errorMsg = "You entered incorrect information!";
        }
      );
    }
    else{
      alert('Please agree to the terms')
    }
  }

}
