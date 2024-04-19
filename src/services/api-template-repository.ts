import {ITemplateRepository} from "./abstractions/i-template-repository";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";
import {TemplateDto} from "../models/dto/template-dto";
import {Template} from "../models/template";

@Injectable({providedIn: 'root'})
export class ApiTemplateRepository implements ITemplateRepository {
  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService : IHttpService) {
  }

  getTemplates(search?: string): Promise<TemplateDto[]> {
    return this.httpService.get<TemplateDto[]>(new URL(`${environment.serverApiUrl}/template`), undefined, search ? {search: search} : undefined);
  }

  createTemplate(template: Template): Promise<Template> {
    return this.httpService.post(new URL(`${environment.serverApiUrl}/template`), template);
  }

  getTemplate(id: number) : Promise<Template> {
    return this.httpService.get(new URL(`${environment.serverApiUrl}/template/${id}`));
  }

}
