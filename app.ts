import * as bodyParser from "body-parser";
import { socketController } from "./controller/socketController";
import { route } from "./route/api";

const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require("socket.io")(server, {cors: true});
const { PeerServer } = require('peer');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', route);

io.on('connection', socketController)

server.listen(8848)
PeerServer({port: 8849, path: '/peer'});
