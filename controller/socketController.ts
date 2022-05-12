import { RoomService } from "../service/roomService";
import { UserService } from "../service/userService";

interface userState {
    type: 'mute' | 'deafen',
    flag: boolean
}

export const socketController = (socket) => {
    let userId = socket.handshake.query.userId;
    UserService.getInstance().createUser(userId, socket);
    socket.on('disconnect', () => {
        let user = UserService.getInstance().getUser(userId);
        RoomService.getInstance().leaveRoom(user);
        UserService.getInstance().deleteUser(userId);
        console.log(`${userId} disconnected.`);
    })
    socket.on('state-change', (state: userState) => {
        let user = UserService.getInstance().getUser(userId);
        socket.broadcast.to(user.getRoomId()).emit('user-state-change', {
            userId: userId,
            state: state
        });
    })
    socket.on('answer-ready', () => {
        let user = UserService.getInstance().getUser(userId);
        socket.broadcast.to(user.getRoomId()).emit('user-join', {
            userId: user.getUserId(),
            userName: user.getUserName()
        });
    })
    console.log(`${userId} connected.`)
}
