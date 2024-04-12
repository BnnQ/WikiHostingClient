import {IHttpParameters} from "../models/abstractions/i-http-parameters";

export abstract class UrlParametersHelper {
  public static mapRouteParametersToUrl(url: URL | string, routeParameters?: IHttpParameters): string {
    let resultUrl: string = typeof url === "string" ? url : url.toString();
    if (routeParameters === undefined) return resultUrl;

    for (const key in routeParameters) {
      resultUrl = resultUrl.concat(`/${routeParameters[key]}`);
    }

    return resultUrl;
  }

  public static mapQueryParametersToUrl(url: URL | string, queryParameters?: IHttpParameters): string {
    let resultUrl: string = typeof url === "string" ? url : url.toString();
    if (queryParameters === undefined) return resultUrl;

    let isFirstQueryParam: boolean = true;
    for (const key in queryParameters) {
      if (isFirstQueryParam) {
        resultUrl = resultUrl.concat('?');
        isFirstQueryParam = false;
      } else {
        resultUrl = resultUrl.concat('&');
      }

      resultUrl = resultUrl.concat(`${key}=${queryParameters[key]}`);
    }

    return resultUrl;
  }

  public static mapRouteAndQueryParametersToUrl(url: URL, routeParameters?: IHttpParameters, queryParameters?: IHttpParameters): string {
    let resultUrl = url.toString();
    resultUrl = this.mapRouteParametersToUrl(resultUrl, routeParameters);
    resultUrl = this.mapQueryParametersToUrl(resultUrl, queryParameters);

    return resultUrl;
  }

  public static getQueryParametersFromLocation(location: Location) : IHttpParameters {
    const query = new URLSearchParams(location.search);
    return Object.fromEntries(query.entries());
  }

}
