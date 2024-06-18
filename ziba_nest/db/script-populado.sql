/*role: admin, client, prof*/
/*password: admin2024 */
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('admin@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Lorena', 'Planes',31094435,2284230375,'admin',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('marisaruiz@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Marisa', 'Ruiz',29365478,2284562541,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('ireneacosta@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Irene', 'Acosta',30698521,2284659874,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('evagimenez@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Eva', 'Gimenez',36854795,2284552518,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('maitensuarez@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Maiten', 'Suarez',41025698,2281362514,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('naomialmeida@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Naomi', 'Almeida',45986547,2284354152,'prof',1);
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('rominabenegas@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','Romina', 'Benegas',31258741,2284254178,'prof',1);

insert into specialties (name) values ('cosmetología');
insert into specialties (name) values ('peluquería');
insert into specialties (name) values ('maquillaje');
insert into specialties (name) values ('manicuría');
insert into specialties (name) values ('masoterapia');
insert into specialties (name) values ('depilación');
insert into specialties (name) values ('Cejas y pestañas');


insert into professional (id_speciality,id_user) values (1,4);
insert into professional (id_speciality,id_user) values (2,5);
insert into professional (id_speciality,id_user) values (3,6);
insert into professional (id_speciality,id_user) values (4,7);
insert into professional (id_speciality,id_user) values (5,8);
insert into professional (id_speciality,id_user) values (6,9);

/*["Limpieza facial", "Peeling facial","Drenaje linfático","Peeling corporal", "Tratamiento para celulitis", "Drenaje linfático corporal"]/
*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Limpieza facial",1, "agregar descripcion", null, null, 1); 
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Peeling facial",1, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Drenaje linfático",1, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Peeling corporal",1, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Tratamiento para celulitis",1, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Drenaje linfático corporal",1, "agregar descripcion", null, null, 1);
	
	/*["Corte", "Nutrición","Keratina","Peinados","Tinte","Balayage"]},*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Corte",2, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Nutrición",2, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Keratina",2, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Peinados",2, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Color",2, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Balayage",2, "agregar descripcion", null, null, 1);
	
	/* ["Novias","Quinceañeras","Social","Modelaje","Artitistico infantil","Artistico teatral"]*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Novias",3, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Quinceañeras",3, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Social",3, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Modelaje",3, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Artitistico infantil",3, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Artistico teatral",3, "agregar descripcion", null, null, 1);
	
	/*["Spa de manos","Semipermanente","Soft gel","Nail art","Caping"]*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Spa de manos",4, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Semipermanente",4, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Soft gel",4, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Nail art",4, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Caping",4, "agregar descripcion", null, null, 1);
	
	/*"Masaje terapéutico","Masaje circulatorio","Masaje deportivo","Masaje descontracturante","Masaje lifático"*/
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje terapéutico",5, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje circulatorio",5, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje deportivo",5, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje descontracturante",5, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Masaje lifático",5, "agregar descripcion", null, null, 1);
	
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Axilas",6, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Pierna entera",6, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Media pierna",6, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Cavado",6, "agregar descripcion", null, null, 1);
	insert into services (name,id_speciality ,description,price,duration, active) 
	values ("Bozo",6, "agregar descripcion", null, null, 1);
	
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (1,'lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (1,'martes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (2,'lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (3,'lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (4,'lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (5,'lunes','10:00:00','16:00:00');
insert into calendar (id_professional,week_day,hour_begin,hour_end) values (6,'martes','11:00:00','18:00:00');

insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-29', '14:00:00',2,2,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-29', '13:00:00',2,1,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-25', '13:00:00',13,6,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-17', '13:00:00',12,7,0);
insert into appointments (date,hour,id_user,id_service,state) values ('2024-06-20', '13:00:00',3,12,0);