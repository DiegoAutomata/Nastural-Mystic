import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(email: string, password: string): Promise<UserDocument>;
    findOneByEmail(email: string): Promise<UserDocument | null>;
    findAll(): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument | null>;
    updateRole(id: string, role: string): Promise<UserDocument | null>;
    deleteUser(id: string): Promise<UserDocument | null>;
}
