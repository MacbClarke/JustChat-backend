import { RoomService } from "../service/roomService";
import { UserService } from "../service/userService";

export const join = (req, resp) => {
    let roomId = req.body.roomId;
    let userId = req.body.userId;
    let userName = req.body.userName;
    
    let user = UserService.getInstance().getUser(userId);
    user.setUserName(userName);

    if (RoomService.getInstance().joinRoom(roomId, user)) {
        resp.send({
            status: 'success',
            content: roomId
        })
    } else {
        resp.send({
            status: 'error',
            content: '房间不存在'
        })
    }
}

export const create = (req, resp) => {
    let userId = req.body.userId;
    let userName = req.body.userName;

    let user = UserService.getInstance().getUser(userId);
    user.setUserName(userName);

    let roomId = RoomService.getInstance().createRoom();
    RoomService.getInstance().joinRoom(roomId, user);

    resp.send({
        status: 'success',
        content: roomId
    })
}

export const leave = (req, resp) => {
    let userId = req.body.userId;

    let user = UserService.getInstance().getUser(userId);
    RoomService.getInstance().leaveRoom(user);

    resp.send({
        status: 'success'
    })
}

export const getUsers = (req, resp) => {
    let roomId = req.query.roomId;
    let room = RoomService.getInstance().getRoom(roomId);

    if(room) {
        let users = room.getUserList();

        let resData = [];
        for (let user of users) {
            resData.push({
                userId: user.getUserId(),
                userName: user.getUserName()
            });
        }

        resp.send({
            status: 'success',
            content: resData
        });
    } else {
        resp.send({
            status: 'error',
            content: '房间不存在'
        });
    }
}
