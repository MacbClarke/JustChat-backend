import { User } from '../entities/user';

interface userService {
    createUser(userId: string, userName: string): User,
    deleteUser(userId: string): boolean,
    getUser(userId: string): User
}

export class UserService implements userService {
    static instance: UserService;
    private UserPool: Record<string, User> = {};

    constructor() {
        if (UserService.instance) {
            throw new Error('Error: Instantiation failed: Use UserService.getInstance() instead of new.');
        }
        UserService.instance = this;
    }

    static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    createUser(userId: string, socket: any): User {
        let user: User = new User(userId, socket);
        this.UserPool[userId] = user;
        return user;
    }

    deleteUser(userId: string): boolean {
        if (this.UserPool[userId]) {
            delete this.UserPool[userId];
            return true;
        }
        return false;
    }

    getUser(userId: string): User {
        return this.UserPool[userId];
    }

}
