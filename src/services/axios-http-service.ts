import { Injectable } from "@angular/core";
import IHttpService, {IOptions} from "./abstractions/i-http-service";
import axios, {AxiosResponse, ResponseType} from "axios";
import { Router } from "@angular/router";
import {IHttpHeaders} from "../models/abstractions/i-http-headers";
import {IHttpParameters} from "../models/abstractions/i-http-parameters";
import {UrlParametersHelper} from "../utils/url-parameters-helper";
import {ApiPageRepository} from "./api-page-repository";

@Injectable({providedIn: 'root'})
export class AxiosHttpService implements IHttpService {
  private readonly onUnauthorized: (response : AxiosResponse) => void;
  constructor(router: Router) {
    this.onUnauthorized = (reason : any) => {
      if (reason.response.status === 401) {
        router.navigate(['/login']);
      }
    };
  }

  withCredentials = true;

  disableCredentials()
  {
    this.withCredentials = false;
  }

  enableCredentials() {
    this.withCredentials = true;
  }

  private appendAuthorizationHeaders(headers: IHttpHeaders | undefined)
  {
    const currentUser = sessionStorage.getItem('currentUser');

    if (this.withCredentials && currentUser)
    {
      const token : string = JSON.parse(currentUser).accessToken;

      if (token.length > 16)
      {
        if (!headers)
          headers = {};

        headers['Authorization'] = `Bearer ${token}`;
      }

    }

    return headers;
  }

  async get<T>(url: URL, routeParameters?: IHttpParameters, queryParameters?: IHttpParameters,
               headers?: IHttpHeaders, options? : IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const request = axios.get<T>(mappedUrl, {
      headers: this.appendAuthorizationHeaders(headers),
      withCredentials: this.withCredentials,
      responseType: options?.responseType as ResponseType,
      auth: options?.auth
    });

    request.catch(this.onUnauthorized);
    if (responseHandler)
      request.then(responseHandler);

    return (await request).data;
  }

  async post<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
                queryParameters?: IHttpParameters, headers?: IHttpHeaders, options? : IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const request = axios.post<T>(mappedUrl, body, {
      headers: this.appendAuthorizationHeaders(headers),
      withCredentials: this.withCredentials,
      auth: options?.auth,
    });

    request.catch(this.onUnauthorized);
    request.then((response) => {
      console.log('response', response);
    });
    request.catch((reason) => {
      console.log('error', reason);
    });
    if (responseHandler)
      request.then(responseHandler);

    return (await request).data;
  }

  async put<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
               queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const request = axios.put<T>(mappedUrl, body, {
      headers: this.appendAuthorizationHeaders(headers),
      withCredentials: this.withCredentials,
      auth: options?.auth
    });

    request.catch(this.onUnauthorized);
    if (responseHandler)
      request.then(responseHandler);

    return (await request).data;
  }

  async delete<T>(url: URL, routeParameters?: IHttpParameters,
                  queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T> {
    const mappedUrl: string = UrlParametersHelper.mapRouteAndQueryParametersToUrl(url,
      routeParameters,
      queryParameters);

    const request = axios.delete<T>(mappedUrl, {
      headers: this.appendAuthorizationHeaders(headers),
      withCredentials: this.withCredentials,
      auth: options?.auth
    });

    request.catch(this.onUnauthorized);
    if (responseHandler)
      request.then(responseHandler);

    return (await request).data;
  }
}
