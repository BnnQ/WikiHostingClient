import {Link} from "./link";
import {Contributor} from "./contributor";

export class Wiki {
  constructor(public id: number, public name: string, public isArchived: boolean, public numberOfPages: number, public backgroundImagePath: string, public logoImagePath: string, public mainLinks : Link[], public contributors : Contributor[], public topic : string) {
  }
}
