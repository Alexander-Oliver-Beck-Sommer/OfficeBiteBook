CREATE TABLE `menu` (
  `menu_id` integer PRIMARY KEY,
  `start_date` time,
  `end_date` time,
  `menu_type_id` integer,
  `title` varchar(255),
  `room_id` integer,
  `published` boolean
);

CREATE TABLE `menu_type` (
  `menu_type_id` integer PRIMARY KEY,
  `name` varchar(255),
  `default_start` time,
  `default_end` time
);

CREATE TABLE `menu_dish` (
  `menu_id` integer,
  `dish_id` integer
);

CREATE TABLE `menu_template_dish` (
  `template_id` integer,
  `dish_id` integer
);

CREATE TABLE `menu_template` (
  `template_id` integer PRIMARY KEY,
  `menu_type_id` integer,
  `location_id` integer,
  `title` varchar(255)
);

CREATE TABLE `menu_user` (
  `menu_id` integer,
  `user_id` integer
);

CREATE TABLE `user` (
  `user_id` integer PRIMARY KEY,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) UNIQUE NOT NULL,
  `user_phone` varchar(255) UNIQUE,
  `user_birthday` date,
  `location_id` integer,
  `user_image` varchar(255)
);

CREATE TABLE `user_role` (
  `user_id` integer,
  `role_id` integer
);

CREATE TABLE `role` (
  `role_id` integer PRIMARY KEY,
  `role_name` integer NOT NULL
);

CREATE TABLE `dish` (
  `dish_id` integer PRIMARY KEY,
  `dish_title` varchar(255),
  `dish_subtitle` varchar(255),
  `dish_description` varchar(255),
  `dish_image` varchar(255)
);

CREATE TABLE `location` (
  `location_id` integer PRIMARY KEY,
  `location_name` varchar(255) NOT NULL
);

CREATE TABLE `location_room` (
  `room_id` integer PRIMARY KEY,
  `room_name` integer NOT NULL,
  `default` boolean,
  `location_id` integer
);

ALTER TABLE `menu` ADD FOREIGN KEY (`menu_type_id`) REFERENCES `menu_type` (`menu_type_id`);

ALTER TABLE `location_room` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

ALTER TABLE `menu` ADD FOREIGN KEY (`room_id`) REFERENCES `location_room` (`room_id`);

ALTER TABLE `menu_dish` ADD FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`);

ALTER TABLE `menu_user` ADD FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`);

ALTER TABLE `menu_user` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `menu_dish` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`);

ALTER TABLE `menu_template_dish` ADD FOREIGN KEY (`template_id`) REFERENCES `menu_template` (`template_id`);

ALTER TABLE `menu_template_dish` ADD FOREIGN KEY (`dish_id`) REFERENCES `dish` (`dish_id`);

ALTER TABLE `menu_template` ADD FOREIGN KEY (`menu_type_id`) REFERENCES `menu_type` (`menu_type_id`);

ALTER TABLE `menu_template` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

ALTER TABLE `user` ADD FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

ALTER TABLE `menu` ADD FOREIGN KEY (`end_date`) REFERENCES `menu_template` (`title`);
