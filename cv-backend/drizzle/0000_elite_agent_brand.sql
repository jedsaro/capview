CREATE TABLE `accounts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`name` varchar(256) NOT NULL,
	`lastname` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`room` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounts_username_unique` UNIQUE(`username`),
	CONSTRAINT `accounts_room_unique` UNIQUE(`room`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`owner` varchar(50) NOT NULL,
	`device_name` varchar(256) NOT NULL,
	`room` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `devices_id` PRIMARY KEY(`id`),
	CONSTRAINT `devices_owner_unique` UNIQUE(`owner`),
	CONSTRAINT `devices_room_unique` UNIQUE(`room`)
);
