create database finsmart;

create table `user`(
	`id` int(11) not null auto_increment,
    `username` varchar(50) not null,
    `password` varchar(200) not null,
    primary key(id)
);

create table `client`(
	`id` int(11) not null auto_increment,
    `name` varchar(50) not null,
    `last_name` varchar(50) not null,
    primary key(id)
);