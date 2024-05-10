import {Rating} from "../../models/rating";

export interface IRatingRepository {
  like(pageId : number) : Promise<Rating>;
  dislike(pageId : number) : Promise<Rating>;
  clearRating(pageId: number): Promise<void>;
}
