import {Page} from "../../models/page";
import {PageUpsertDto} from "../../models/dto/page-upsert-dto";
import {PageFeedDto} from "../../models/dto/page-feed-dto";

export interface IPageRepository {
  getPopularPages(limit: number) : Promise<PageFeedDto[]>;
  getPopularPagesByTopic(limit:number, topicId:number): Promise<PageFeedDto[]>;
  getPage(id : number) : Promise<Page>;
  getWikiPage(wikiId : number, pageId : number) : Promise<Page>;
  getMainWikiPage(wikiId : number) : Promise<Page>;
  createPage(wikiId : number, model : PageUpsertDto) : Promise<Page>;
  editPage(id : number, model : PageUpsertDto) : Promise<Page>;
  deletePage(id : number) : Promise<void>;
}
