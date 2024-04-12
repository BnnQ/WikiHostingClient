import {IHttpParameters} from "../../models/abstractions/i-http-parameters";
import {IHttpHeaders} from "../../models/abstractions/i-http-headers";
import {AxiosBasicCredentials, AxiosResponse} from "axios";

export interface IOptions {
  responseType? : string
  auth?: AxiosBasicCredentials,
}

export default interface IHttpService {
  enableCredentials(): void;
  disableCredentials(): void;

  get<T>(url: URL, routeParameters?: IHttpParameters,
         queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T>;

  post<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
          queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T>;

  put<T>(url: URL, body?: any, routeParameters?: IHttpParameters,
         queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T>;

  delete<T>(url: URL, routeParameters?: IHttpParameters,
            queryParameters?: IHttpParameters, headers?: IHttpHeaders, options?: IOptions, responseHandler?: (response : AxiosResponse<T>) => void): Promise<T>
}
