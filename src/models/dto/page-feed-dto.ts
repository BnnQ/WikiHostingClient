import {User} from "../user";

export class PageFeedDto {
  constructor(public id: number, public wikiId: number, public author : User, public createdAt: Date, public editedAt: Date, public title: string, public imagePath: string, public numberOfLikes: number, public numberOfComments: number) {

  }
}
