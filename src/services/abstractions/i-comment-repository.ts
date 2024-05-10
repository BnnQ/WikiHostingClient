import {Comment} from "../../models/comment";

export interface ICommentRepository {
  getPageComments(pageId : number): Promise<Comment[]>;
  addComment(pageId: number, comment: Comment): Promise<Comment>;
  removeComment(id : number): Promise<void>;
}
