import { RoomService } from "../service/roomService";

export const cmdController = (data: Buffer) => {
    let cmd = data.toString().trim().split(' ');
    if (cmd[0] === '/create'){
        if (cmd.length === 1) {
            console.log('One argument is required.');
        } else {
            RoomService.getInstance().createRoom(cmd[1]);
        }
    } else if (cmd[0] === '/destory') {
        if (cmd.length === 1) {
            console.log('One argument is required.');
        } else {
            RoomService.getInstance().destroyRoom(cmd[1]);
        }
    }
}
