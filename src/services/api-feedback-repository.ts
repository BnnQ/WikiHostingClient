import {IFeedbackRepository} from "./abstractions/i-feedback-repository";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {Feedback} from "../models/feedback";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiFeedbackRepository implements IFeedbackRepository {
  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService : IHttpService) {
  }

  getFeedback(id: number): Promise<Feedback> {
    return this.httpService.get<Feedback>(new URL(`${environment.serverApiUrl}/feedback/${id}`));
  }

  getFeedbacks(): Promise<Feedback[]> {
    return this.httpService.get<Feedback[]>(new URL(`${environment.serverApiUrl}/feedback`))
  }

  saveFeedback(feedbackText: string): Promise<void> {
    return this.httpService.post(new URL(`${environment.serverApiUrl}/feedback`), {text: feedbackText});
  }

}
