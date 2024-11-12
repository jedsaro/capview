import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import {findUserByUserName, getUserRoomID} from "../user-service.js";
import session from "express-session";


let sessionID;

const initializeSocketIO = (server) => {
   const io = new Server(server, {
      cors: {
         origin: "http://localhost:3000",
         methods: ["GET", "POST"],
      }
   });

   io.use((socket, next) => {
      const authHeader = socket.handshake.headers.authorization;

      const token = authHeader.split(' ')[1];

      if (!token) {
         return next(new Error('Authentication error: Token not provided'));
      }

      jwt.verify(token, 'secret', (err, decoded) => {
         if (err) {
            return next(new Error('Authentication error: Invalid token'));
         }

         socket.user = decoded.user;

         if (!findUserByUserName(socket.user.email)) return next(new Error('User not found'));

         next();
      });
   });


   io.on('connection', async (socket) => {

      sessionID = await getUserRoomID(socket.user.username);
      socket.join(sessionID);

      socket.on("message", (message) => {
         message = {...message, sessionID: socket.id};
         io.to(sessionID).emit('message', message);
      });

      socket.on("disconnect", (reason) => {
         io.emit('userDisconnected', { id: socket.id });
         console.log(`User ${socket.id} disconnected: ${reason},`);
      });

   });

   return io;
};

export default initializeSocketIO;
