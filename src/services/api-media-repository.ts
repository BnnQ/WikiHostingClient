import {IMediaRepository} from "./abstractions/i-media-repository";
import {Inject, Injectable} from "@angular/core";
import {SERVICE_IDENTIFIERS} from "../app/app.module";
import IHttpService from "./abstractions/i-http-service";
import {environment} from "../environments/environment";

@Injectable({providedIn: 'root'})
export class ApiMediaRepository implements IMediaRepository {
  private readonly serverApiUrl : string = environment.serverApiUrl;

  constructor(@Inject(SERVICE_IDENTIFIERS.IHttpService) private readonly httpService: IHttpService) {
  }

  uploadImage(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpService.post(new URL(`${this.serverApiUrl}/media/saveImage`), formData);
  }

}
