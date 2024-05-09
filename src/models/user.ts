export class User {
  constructor(public id: number, public userName: string, public avatarPath: string, public roles: string[], public numberOfPages: number, public about? : string) {
  }
}
