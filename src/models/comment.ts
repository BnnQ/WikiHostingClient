import {User} from "./user";

export class Comment {
  constructor(public id : number, public pageId : number,  public authorId: number, public text : string, public postedAt? : Date, public editedAt? : Date, public author? : User) {
  }
}
