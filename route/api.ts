import { join, create, leave } from "../controller/roomController";

export const route = require('express').Router();

route.post('/join', join);
route.post('/create', create);
route.post('/leave', leave);
