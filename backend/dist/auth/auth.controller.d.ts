import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(body: any): Promise<import("../users/schemas/user.schema").UserDocument>;
    login(body: any): Promise<{
        access_token: string;
        user: {
            email: any;
            role: any;
        };
    }>;
    getAllUsers(): Promise<{
        id: import("mongoose").Types.ObjectId;
        email: string;
        role: string;
        createdAt: any;
    }[]>;
    updateUserRole(id: string, body: {
        role: string;
    }): Promise<{
        id: import("mongoose").Types.ObjectId | undefined;
        email: string | undefined;
        role: string | undefined;
    }>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
