import {
   mysqlTable,
   serial,
   varchar,
   timestamp
} from 'drizzle-orm/mysql-core';

export const accounts = mysqlTable('accounts', {
   id: serial("id").primaryKey().autoincrement(),
   username: varchar("username", { length: 50 }).notNull().unique(),
   name: varchar('name', { length: 256 }).notNull(),
   lastname: varchar('lastname', { length: 256 }).notNull(),
   email: varchar('email', { length: 256 }).notNull(),
   room: varchar('room', { length: 256 }).notNull().unique(),
   password: varchar('password', { length: 256 }).notNull(),
   createdAt: timestamp("created_at").defaultNow().notNull(),
   updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
