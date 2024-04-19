import {UserUpsertDto} from "../models/dto/user-upsert-dto";
import {User} from "../models/user";
import {IUserRepository} from "./abstractions/i-user-repository";

export class StubUserRepository implements IUserRepository {

  users: User[] = [
    new User(1, 'user1', 'assets/avatar.jpg'),
    new User(2, 'user2', 'assets/avatar.jpg'),
    new User(3, 'user3', 'assets/avatar.jpg')
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

  registerUser(model: UserUpsertDto): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const user = new User(this.users.length + 1, model.userName, model.avatarPath);
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

}
