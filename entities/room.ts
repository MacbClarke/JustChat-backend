import {User} from './user';

interface room {
    getUserList(): Array<User>,
    getRoomId(): string,
    join(user: User): boolean,
    leave(user: User): boolean,
}

export class Room implements room {
    private userList: Array<User>;
    private roomId: string;

    constructor(roomId: string) {
        this.roomId = roomId;
        this.userList = [];
    }

    getUserList() {
        return this.userList;
    }

    getRoomId() {
        return this.roomId;
    }

    join(user: User) {
        this.userList.push(user);
        return true;
    }

    leave(user: User) {
        this.userList.splice(this.userList.indexOf(user), 1);
        return true;
    }
}
