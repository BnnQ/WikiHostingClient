import { Rating } from "../models/rating";
import {IRatingRepository} from "./abstractions/i-rating-repository";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiRatingRepository implements IRatingRepository {
  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService : IHttpService)  {
  }

    like(pageId: number): Promise<Rating> {
        return this.httpService.post<Rating>(new URL(`${environment.serverApiUrl}/rating/like/${pageId}`), {});
    }

    dislike(pageId: number): Promise<Rating> {
        return this.httpService.post<Rating>(new URL(`${environment.serverApiUrl}/rating/dislike/${pageId}`), {});
    }

    clearRating(pageId: number): Promise<void> {
        return this.httpService.delete(new URL(`${environment.serverApiUrl}/rating/clear/${pageId}`));
    }

}
