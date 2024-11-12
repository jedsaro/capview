import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import {drizzle} from "drizzle-orm/mysql2";
import { migrate } from 'drizzle-orm/mysql2/migrator';
import * as schema from '../api/schemas/accounts_schema.js';

export const db_settings = {
   host: 'localhost',
   user: 'root',
   port: 3306,
   password: '',
   database: 'jedDB',
   waitForConnections: true,
   connectionLimit: 10,
   maxIdle: 10,
   idleTimeout: 60000,
   queueLimit: 0,
   enableKeepAlive: true,
   keepAliveInitialDelay: 0,
   Promise: bluebird,
};

const initializeDB = async () => {
   try {
      const pool = mysql.createPool(db_settings);
      const db = await drizzle(pool, {mode: mysql, schema});

      await migrate(db, { migrationsFolder: "./drizzle" });

      return db

   } catch (e) {
      console.error("Error connecting to the database:", e);
   }
};

export default initializeDB;

