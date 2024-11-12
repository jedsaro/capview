import {
   mysqlTable,
   serial,
   varchar,
   timestamp
} from 'drizzle-orm/mysql-core';

export const devices = mysqlTable('devices', {
   id: serial("id").primaryKey().autoincrement(),
   owner: varchar("owner", { length: 50 }).notNull().unique(),
   device_name: varchar('device_name', { length: 256 }).notNull(),
   room: varchar('room', { length: 256 }).notNull().unique(),
   createdAt: timestamp("created_at").defaultNow().notNull(),
   updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
