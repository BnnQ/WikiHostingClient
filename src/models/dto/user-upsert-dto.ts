export class UserUpsertDto {
    constructor(public username: string, public password: string, public avatarPath: string) {
  }
}
