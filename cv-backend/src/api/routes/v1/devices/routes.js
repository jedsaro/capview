import { Router } from 'express';
import deviceRooms from "./controller/devices/index.js";

const router = Router();

const connected = () =>
{
   router.post('/connected', deviceRooms );

   return router;
}

export default connected;