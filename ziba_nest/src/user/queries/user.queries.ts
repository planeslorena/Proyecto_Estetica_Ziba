const userQueries = {
    selectAllClients: `select id_user,name, lastname,dni,phone, mail from users where role = 'client' and active = 1`,
    selectAllProf: `select u.id_user,u.name, u.lastname,u.dni,u.phone, u.mail, s.name as speciality
                    from professional p 
                    join users u 
                    join specialties s 
                    on p.id_user = u.id_user 
                    and p.id_speciality = s.id_speciality
                    where u.active =1`,
    selectUserByMail: 'select * from users where mail = ? and active = 1',
    insertUser: `insert into users (mail,password,name,lastname,dni,phone,role,active) values (?,?,?,?,?,?,?,1);`,
}

export default userQueries;