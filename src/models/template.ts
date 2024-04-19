export class Template {
  constructor(public id : number, public name : string, public imagePath: string, public authorId: number, public html: string, public isPublic: boolean,  public css?: string, public js?: string, public variables?: string) {
  }
}
