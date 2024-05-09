import {User} from "../../models/user";
import {UserUpsertDto} from "../../models/dto/user-upsert-dto";
import {UserProfileUpsertDto} from "../../models/dto/user-profile-upsert-dto";

export interface IUserRepository {
    getUser(id?: number): Promise<User>;
    getCurrentUserId() : Promise<number>;
    editUserProfile(model: UserProfileUpsertDto) : Promise<void>;
    registerUser(model: UserUpsertDto): Promise<User>;
    authUser(id: number, model: UserUpsertDto): Promise<User>;
}
