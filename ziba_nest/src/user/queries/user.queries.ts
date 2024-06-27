const userQueries = {
    selectAllClients: `select id_user,name, lastname,dni,phone, mail from users where role = 'client' and active = 1`,
    selectAllProf: `select p.id_professional,u.name, u.lastname,u.dni,u.phone, u.mail, s.name as speciality
                    from professional p 
                    join users u 
                    join specialties s 
                    on p.id_user = u.id_user 
                    and p.id_speciality = s.id_speciality
                    where u.active =1`,
    selectProfessionalCalendar: `select p.id_professional , week_day,hour_begin, hour_end 
                                from professional p 
                                join calendar c
                                on p.id_professional  = c.id_professional `,
    selectUserByMail: 'select * from users where mail = ? and active = 1',
    selectProfbyId:'select id_user from professional where id_professional = ?',
    insertUser: `insert into users (mail,password,name,lastname,dni,phone,role,active) values (?,?,?,?,?,?,?,1);`,
    insertProf:`insert into professional (id_user,id_speciality) values(?,?)`,
    updateUser:`update users 
                set mail = ?,name = ?,lastname = ?,dni = ?,phone = ?
                where id_user = ?;`,
    deleteUser: `update users set active = 0 where id_user = ?`,
    deleteAppointmentsbyuser: 'delete from appointments where id_user = ? and date >= sysdate() and state = 0;'
}

export default userQueries;