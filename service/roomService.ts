import { Room } from '../entities/room';
import { User } from '../entities/user';

interface roomService {
    createRoom(): string,
    joinRoom(roomId: string, user: User, socket: any): boolean,
    getRoom(roomId: string): Room,
    leaveRoom(user: User): boolean,
}

export class RoomService implements roomService {
    static instance: RoomService;
    private RoomPool: Record<string, Room> = {};

    constructor() {
        if (RoomService.instance) {
            throw new Error('Error: Instantiation failed: Use RoomService.getInstance() instead of new.');
        }
        RoomService.instance = this;
    }

    static getInstance(): RoomService {
        if (!RoomService.instance) {
            RoomService.instance = new RoomService();
        }
        return RoomService.instance;
    }

    private genId(): string {
        let roomId: number;
        do {
            roomId = Math.round(Math.random() * (1000000 - 100000) + 100000);
        } while(this.RoomPool[roomId]);
        return roomId.toString();
    }

    createRoom(): string {
        let roomId: string = this.genId();
        this.RoomPool[roomId] = new Room(roomId);
        console.log(`Room ${roomId} created.`);
        return roomId;
    }

    getRoom(roomId: string): Room {
        return this.RoomPool[roomId];
    }

    joinRoom(roomId: string, user: User): boolean {
        if (this.RoomPool[roomId]) {
            this.RoomPool[roomId].join(user);
            user.setRoomId(roomId);

            let socket = user.getSocket();
            socket.join(roomId);
            socket.broadcast.to(roomId).emit('user-join', {
                userId: user.getUserId(),
                userName: user.getUserName()
            });

            return true;
        }
        return false;
    }

    leaveRoom(user: User): boolean {
        let roomId = user.getRoomId();
        if (this.RoomPool[roomId]) {
            this.RoomPool[roomId].leave(user);
            user.setRoomId(null);

            let socket = user.getSocket();
            socket.leave(roomId);
            socket.broadcast.to(roomId).emit('user-leave', {
                userId: user.getUserId(),
                userName: user.getUserName()
            });

            if(this.RoomPool[roomId].getUserList().length === 0) {
                this.destroyRoom(roomId);
            }
            return true;
        }
        return false;
    }

    private destroyRoom(roomId: string): boolean {
        if (this.RoomPool[roomId]) {
            delete this.RoomPool[roomId];
            console.log(`Room ${roomId} destroyed.`);
            return true;
        }
        return false;
    }
}
