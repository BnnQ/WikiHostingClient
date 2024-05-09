import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IUserRepository} from "../../services/abstractions/i-user-repository";
import {User} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {from, map, Observable} from "rxjs";
import {UserProfileUpsertDto} from "../../models/dto/user-profile-upsert-dto";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly userId : number;
  protected user : User = undefined!;
  protected isOwnProfile: boolean = false;
  protected aboutText : string = '';
  protected aboutEditingEnabled : boolean = false;

  constructor(@Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository : IUserRepository, activatedRoute : ActivatedRoute) {
    this.userId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
  }

  async ngOnInit(): Promise<void> {
    if (this.userId > 0)
    {
      this.user = await this.userRepository.getUser(this.userId);
      this.isOwnProfile = await this.userRepository.getCurrentUserId() === this.user.id;
      console.log('user', this.user);
    }
    else {
      this.user = await this.userRepository.getUser();
    }
  }

  get userRole() : string {
    // Transform all role names to uppercase for comparison
    const roles = this.user.roles.map(role => role.toUpperCase());

    // Check for 'ADMIN' and 'MODERATOR' roles
    if (roles.includes('ADMIN')) {
      return 'Administrator';
    } else if (roles.includes('MODERATOR')) {
      return 'Moderator';
    }

    // Return nothing if neither role is found
    return '';
  }

  switchAboutEditing() {
    this.aboutEditingEnabled = !this.aboutEditingEnabled;
    if (this.aboutEditingEnabled) {
      this.aboutText = this.user.about ?? '';
    }
  }

  async updateAbout() : Promise<void> {
    await this.userRepository.editUserProfile(new UserProfileUpsertDto(this.aboutText));
    this.user.about = this.aboutText;
    this.aboutEditingEnabled = false;
  }

}
