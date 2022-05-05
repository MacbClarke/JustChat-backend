interface user {
    getUserId(): string,
    getUserName(): string,
    setUserName(userName: string): void,
    getRoomId(): string,
    setRoomId(roomId: string): void,
    getSocket(): any
}

export class User implements user {
    private userId: string;
    private userName: string;
    private roomId: string;
    private socket: any;

    constructor(userId: string, socket: any) {
        this.userId = userId;
        this.socket = socket;
        this.roomId = null;
        this.userName = null;
    }

    getUserId() {
        return this.userId;
    }

    getUserName() {
        return this.userName;
    }

    setUserName(userName: string) {
        this.userName = userName;
    }

    getRoomId() {
        return this.roomId;
    }

    setRoomId(roomId: string) {
        this.roomId = roomId;
    }

    getSocket() {
        return this.socket;
    }

}
