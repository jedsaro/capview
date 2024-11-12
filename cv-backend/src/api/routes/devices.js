import {Router} from "express";
import connected from "./v1/devices/routes.js";
import deviceRooms from "./v1/devices/controller/devices/index.js";

const api = Router();

export default () => {
   api.use('/connected', deviceRooms)

   return api;
}