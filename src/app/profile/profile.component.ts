import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IUserRepository} from "../../services/abstractions/i-user-repository";
import {User} from "../../models/user";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly userId : number;
  protected user : User = undefined!;
  constructor(@Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository : IUserRepository, activatedRoute : ActivatedRoute) {
    this.userId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
  }

  async ngOnInit(): Promise<void> {
    if (this.userId > 0)
    {
      this.user = await this.userRepository.getUser(this.userId);
      console.log('user', this.user);
    }
    else {
      this.user = await this.userRepository.getUser();
    }
  }
}
