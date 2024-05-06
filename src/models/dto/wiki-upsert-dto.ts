import {Link} from "../link";

export class WikiUpsertDto {
  constructor(public name : string, public backgroundImagePath : string, public mainWikiImagePath : string, public mainLinks: Link[], public topic : string) {
  }
}
