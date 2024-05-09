import {UserUpsertDto} from "../models/dto/user-upsert-dto";
import {User} from "../models/user";
import {IUserRepository} from "./abstractions/i-user-repository";
import {resolve} from "@angular/compiler-cli";
import {model} from "@angular/core";
import {UserProfileUpsertDto} from "../models/dto/user-profile-upsert-dto";

export class StubUserRepository implements IUserRepository {

  users: User[] = [
    new User(1, 'user1', 'assets/avatar.jpg', [], 1),
    new User(2, 'user2', 'assets/avatar.jpg', [], 1),
    new User(3, 'user3', 'assets/avatar.jpg', [], 1)
  ];


  getUser(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const user = this.users.find(u => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    });
  }

  editUserProfile(model: UserProfileUpsertDto): Promise<void> {
    return Promise.resolve();
  }

  registerUser(model: UserUpsertDto): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const user = new User(this.users.length + 1, model.userName, model.avatarPath, [], 1);
      this.users.push(user);
      resolve(user);
    });
  }

  authUser(id: number, model: UserUpsertDto): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const user = this.users.find(u => u.id === id);
      if (user) {
        user.userName = model.userName;
        user.avatarPath = model.avatarPath;
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    });
  }

  getCurrentUserId(): Promise<number> {
    return Promise.resolve(1);
  }

}
