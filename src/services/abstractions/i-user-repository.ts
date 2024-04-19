import {User} from "../../models/user";
import {UserUpsertDto} from "../../models/dto/user-upsert-dto";

export interface IUserRepository {
    getUser(id?: number): Promise<User>;
    registerUser(model: UserUpsertDto): Promise<User>;
    authUser(id: number, model: UserUpsertDto): Promise<User>;
}
