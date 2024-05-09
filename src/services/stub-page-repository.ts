import {PageUpsertDto} from "../models/dto/page-upsert-dto";
import {Page} from "../models/page";
import {IPageRepository} from "./abstractions/i-page-repository";
import {PageFeedDto} from "../models/dto/page-feed-dto";
import {User} from "../models/user";

export class StubPageRepository implements IPageRepository {
  getWikiPage(wikiId: number, pageId: number): Promise<Page> {
      return this.getPage(pageId);
  }
  getMainWikiPage(wikiId: number): Promise<Page> {
      return Promise.resolve(this.pages[0]);
  }

  getPopularPages(limit: number): Promise<PageFeedDto[]> {
  return Promise.resolve(this.pages.slice(0, limit).map(p => (new PageFeedDto(p.id, p.wikiId, new User(1, "Admin", "assets/avatar.jpg", ['Admin'], 1), p.createdAt, p.editedAt, "Lorem ipsum dolor sit amet", "https://static.wikia.nocookie.net/1798fab5-dde0-46e4-aab0-4b1392889bb1/scale-to-width-down/800", 999, 999))));
  }

  getWikiPageByTitle(wikiTitle: string, pageTitle: string): Promise<Page> {
    return Promise.resolve(this.pages[0]);
  }
  getPopularPagesByTopic(limit: number, topicId:number): Promise<PageFeedDto[]> {
    return Promise.resolve(this.pages.slice(0, limit).map(p => (new PageFeedDto(p.id, p.wikiId, new User(1, "Admin", "assets/avatar.jpg"), p.createdAt, p.editedAt, "Lorem ipsum dolor sit amet", "https://static.wikia.nocookie.net/1798fab5-dde0-46e4-aab0-4b1392889bb1/scale-to-width-down/800", 999, 999))));
    }

  pages: Page[] = [
    {
      id: 1,
      wikiId: 1,
      authorId: 1,
      createdAt: new Date(),
      editedAt: new Date(),
      rawHtml: "<p>Hello, world!</p>",
      processedHtml: "<p>Hello, world!</p>"
    },
    {
      id: 2,
      wikiId: 1,
      authorId: 1,
      createdAt: new Date(),
      editedAt: new Date(),
      rawHtml: "<p>Goodbye, world!</p>",
      processedHtml: "<p>Goodbye, world!</p>"
    },
    {
      id: 3,
      wikiId: 2,
      authorId: 1,
      createdAt: new Date(),
      editedAt: new Date(),
      rawHtml: "<p>Foo</p>",
      processedHtml: "<p>Foo</p>"
    },
    {
      id: 4,
      wikiId: 2,
      authorId: 1,
      createdAt: new Date(),
      editedAt: new Date(),
      rawHtml: "<p>Bar</p>",
      processedHtml: "<p>Bar</p>"
    }
  ]

  getPage(id: number): Promise<Page> {
    const page = this.pages.find(p => p.id === id);
    if (page) {
      return Promise.resolve(page);
    }

    return Promise.reject("Page not found");
  }

  createPage(wikiId: number, model: PageUpsertDto): Promise<Page> {
    const newPage = {
      id: this.pages.length + 1,
      wikiId: wikiId,
      authorId: 1,
      createdAt: new Date(),
      editedAt: new Date(),
      rawHtml: model.rawHtml,
      processedHtml: model.rawHtml
    };

    this.pages.push(newPage);
    return Promise.resolve(newPage);
  }

  editPage(id: number, model: PageUpsertDto): Promise<Page> {
    const page = this.pages.find(p => p.id === id);
    if (!page) {
      return Promise.reject("Page not found");
    }

    page.rawHtml = model.rawHtml;
    page.processedHtml = model.rawHtml;
    page.editedAt = new Date();

    return Promise.resolve(page);
  }

  deletePage(id: number): Promise<void> {
    const index = this.pages.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.reject("Page not found");
    }

    this.pages.splice(index, 1);
    return Promise.resolve();
  }

}
