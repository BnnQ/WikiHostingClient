import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showModal:boolean = false;

  openModal() {
    console.log("modal opened")
    this.showModal = true;
  }

  closeModal() {
    console.log("modal close")
    this.showModal = false;
  }
}
