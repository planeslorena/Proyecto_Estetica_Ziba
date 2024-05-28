create schema if not exists ziba;

use ziba;

create table if not exists users (
	id_user int not null auto_increment,
	mail varchar(100) not null,
	password varchar(200) not null,
	name varchar (100) not null,
	lastname varchar(100) not null,
	dni int not null,
	phone bigint not null,
	role varchar(10) not null,
	active bit not null, 
	primary key (id_user),
	constraint UK_user_mail unique key (mail)
);