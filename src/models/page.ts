export class Page {
  constructor(public id: number, public wikiId: number, public authorId: number, public createdAt: Date, public editedAt: Date, public rawHtml: string, public processedHtml: string) {

  }
}
