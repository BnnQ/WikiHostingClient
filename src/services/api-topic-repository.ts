import {ITopicRepository} from "./abstractions/i-topic-repository";
import {Topic} from "../models/topic";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiTopicRepository implements ITopicRepository {
  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService : IHttpService) {
  }

  createTopic(topic: string): Promise<Topic> {
    return this.httpService.post<Topic>(new URL(`${environment.serverApiUrl}/topic`), {name: topic});
  }

  getTopics(): Promise<Topic[]> {
    return this.httpService.get<Topic[]>(new URL(`${environment.serverApiUrl}/topic`));
  }

}
