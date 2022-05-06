import { join, create, leave, getUsers } from "../controller/roomController";

export const route = require('express').Router();

route.post('/join', join);
route.post('/create', create);
route.post('/leave', leave);
route.get('/getUsers', getUsers);
