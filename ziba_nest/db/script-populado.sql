/*role: admin, client, prof*/
/*password: admin2024 */
insert into users (mail,password,name,lastname,dni,phone,role,active) 
values ('admin@gmail.com','$2a$08$Y5ke6ID3BkcrUV9IwLADtuIenu47Sxe35BaPU9lskRzFgJNnCRwNy','LORENA', 'PLANES',31094435,2284230375,'admin',1);

select * from users;