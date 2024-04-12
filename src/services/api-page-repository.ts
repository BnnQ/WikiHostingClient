import { PageUpsertDto } from "../models/dto/page-upsert-dto";
import { Page } from "../models/page";
import {IPageRepository} from "./abstractions/i-page-repository";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";
import { PageFeedDto } from "../models/dto/page-feed-dto";

@Injectable({providedIn: 'root'})
export class ApiPageRepository implements IPageRepository {
  private readonly serverApiUrl: string = environment.serverApiUrl;

  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService: IHttpService) {
  }

  getPopularPages(limit: number): Promise<PageFeedDto[]> {
    return this.httpService.get<PageFeedDto[]>(new URL(`${this.serverApiUrl}/page/getRelevantWikiPages`), undefined, {limit: limit});
    }

  getWikiPage(wikiId: number, pageId: number): Promise<Page> {
        return this.httpService.get<Page>(new URL(`${this.serverApiUrl}/page/${pageId}`));
    }
    getMainWikiPage(wikiId: number): Promise<Page> {
    return this.httpService.get<Page>(new URL(`${this.serverApiUrl}/page/getMainWikiPage/${wikiId}`));
    }

    getPage(id: number): Promise<Page> {
        return this.httpService.get<Page>(new URL(`${this.serverApiUrl}/page/${id}`));
    }
    createPage(wikiId: number, model: PageUpsertDto): Promise<Page> {
        return this.httpService.post<Page>(new URL(`${this.serverApiUrl}/page`), model, {wikiId: wikiId});
    }
    editPage(id: number, model: PageUpsertDto): Promise<Page> {
        return this.httpService.put<Page>(new URL(`${this.serverApiUrl}/page`), model, {id: id});
    }
    deletePage(id: number): Promise<void> {
        return this.httpService.delete(new URL(`${this.serverApiUrl}/page`), {id: id});
    }

}
