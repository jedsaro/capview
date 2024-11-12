import express from 'express';
import morgan from 'morgan';
import router from "./api/routes/index.js";
import {createServer} from "http";
import cors from 'cors';
import passport from 'passport';
import session from "express-session";
import './api/utils/strategies/init.js'
import MySQLStore from 'express-mysql-session';
import {db_settings} from "./config/db.js";

import initializeSocketIO from "./api/services/socket/socket.config.js";
import cookieParser from "cookie-parser";

const app = express();
const server = createServer(app);

const port = 3000;

// const sessionStore = new MySQLStore(db_settings);

// const sessionMiddleware = session({
//    secret: 'your-secret-key',
//    resave: false,
//    // store: sessionStore,
//    saveUninitialized: false,
//    cookie:{
//       maxAge: 60000 * 60,
//    },})

// middleware
app.use(express.json());
app.use(cors({credentials: true}));
app.use(cookieParser());
//app.use(sessionMiddleware);
app.use(passport.initialize());

app.use(
   morgan(
      ':method :url :status :res[content-length] - :response-time ms :remote-addr [:date[clf]]'
   )
);

initializeSocketIO(server);

app.use('/v1', router);
// Start the server
server.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
