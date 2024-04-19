import {UserUpsertDto} from "../models/dto/user-upsert-dto";
import {User} from "../models/user";
import {IUserRepository} from "./abstractions/i-user-repository";
import {Inject, Injectable} from "@angular/core";
import IHttpService from "./abstractions/i-http-service";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiUserRepository implements IUserRepository {

  serverApiUrl: string = environment.serverApiUrl;

  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService: IHttpService) {
  }

  getUser(id?: number): Promise<User> {
    return this.httpService.get<User>(new URL(`${this.serverApiUrl}/api/users/profile/${id ? id : ''}`));
  }

  registerUser(model: UserUpsertDto): Promise<User> {
    return this.httpService.post<User>(new URL(`${this.serverApiUrl}/api/users`), model);
  }

  authUser(id: number, model: UserUpsertDto): Promise<User> {
    return this.httpService.post<User>(new URL(`${this.serverApiUrl}/api/users/${id}`), model);
  }

}
