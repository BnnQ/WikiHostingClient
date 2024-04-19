import {Inject, Injectable, model} from "@angular/core";
import {environment} from "../environments/environment";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {IWikiRepository} from "./abstractions/i-wiki-repository";
import {WikiUpsertDto} from "../models/dto/wiki-upsert-dto";
import {Wiki} from "../models/wiki";
import {Contributor} from "../models/contributor";
import {ContributorUpsertDto} from "../models/dto/contributor-upsert-dto";
import {ContributorRole} from "../models/contributor-role";

@Injectable({providedIn: 'root'})
export class ApiWikiRepository implements IWikiRepository {
  private readonly serverApiUrl: string = environment.serverApiUrl;

  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService: IHttpService) {

  }

  getContributorRoles(): Promise<ContributorRole[]> {
    return this.httpService.get<ContributorRole[]>(new URL(`${this.serverApiUrl}/wiki/contributors/roles`));
  }

  getWikiContributor(wikiId: number, userId: number): Promise<Contributor | undefined> {
    return this.httpService.get<Contributor>(new URL(`${this.serverApiUrl}/wiki/${wikiId}/contributors/${userId}`));
    }
  async getWikis(search?: string | undefined): Promise<Wiki[]> {
    return await this.httpService.get<Wiki[]>(new URL(`${this.serverApiUrl}/wiki`), undefined, search ? {search: search} : undefined);
  }

  async getWiki(id: number): Promise<Wiki | undefined> {
    return await this.httpService.get<Wiki>(new URL(`${this.serverApiUrl}/wiki`), {id: id});
  }

  async updateWiki(id: number, model: WikiUpsertDto): Promise<Wiki> {
    return await this.httpService.put<Wiki>(new URL(`${this.serverApiUrl}/wiki`), model, {id: id});
  }

  async deleteWiki(id: number): Promise<void> {
    await this.httpService.delete(new URL(`${this.serverApiUrl}/wiki`), {id: id});
  }

  async getWikiContributors(wikiId: number, role?: string): Promise<Contributor[]> {
    return await this.httpService.get<Contributor[]>(new URL(`${this.serverApiUrl}/wiki/${wikiId}/contributors`,), undefined, role ? { role: role } : undefined);
  }

  async addWikiContributor(wikiId: number, userId: number, model: ContributorUpsertDto): Promise<void> {
    return await this.httpService.post(new URL(`${this.serverApiUrl}/wiki/${wikiId}/contributors/${userId}`), model);
  }

  async updateWikiContributor(wikiId: number, userId: number, model: ContributorUpsertDto): Promise<void> {
    await this.httpService.put(new URL(`${this.serverApiUrl}/wiki/${wikiId}/contributors/${userId}`), model);
  }

  async removeWikiContributor(wikiId: number, userId: number): Promise<void> {
    await this.httpService.delete(new URL(`${this.serverApiUrl}/wiki/${wikiId}/contributors/${userId}`));
  }

  async createWiki(model: WikiUpsertDto): Promise<Wiki> {
    return await this.httpService.post<Wiki>(new URL(`${this.serverApiUrl}/wiki`), model);
  }

}
