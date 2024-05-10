import {Comment} from "../models/comment";
import {ICommentRepository} from "./abstractions/i-comment-repository";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiCommentRepository implements ICommentRepository {
  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService: IHttpService) {
  }

  getPageComments(pageId: number): Promise<Comment[]> {

    return this.httpService.get<Comment[]>(new URL(`${environment.serverApiUrl}/comment/getPageComments/${pageId}`));
  }

  addComment(pageId: number, comment: Comment): Promise<Comment> {
    return this.httpService.post<Comment>(new URL(`${environment.serverApiUrl}/comment/${pageId}`), comment);
  }

  removeComment(id: number): Promise<void> {
    return this.httpService.delete(new URL(`${environment.serverApiUrl}/comment/${id}`));
  }

}
