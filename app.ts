import * as bodyParser from "body-parser";
import { socketController } from "./controller/socketController";
import { route } from "./route/api";

const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require("socket.io")(server, {cors: true});
// const nsp = io.of('/chat');
const { ExpressPeerServer } = require('peer');

app.use(cors());
// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     res.header('X-Powered-By', ' 3.2.1')
//     res.header('Content-Type', 'application/json;charset=utf-8')
//     next()
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/peer', ExpressPeerServer(server, {
    path: '/'
}));

app.use('/', route);

io.on('connection', socketController)

server.listen(8848)
