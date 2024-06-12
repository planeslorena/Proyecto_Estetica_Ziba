const userQueries = {
    selectAllClients: `select id_user,name, lastname,dni,phone, mail from users where role = 'client' and active = 1`,
    selectUserByMail: 'select * from users where mail = ? and active = 1',
    insertUser: `insert into users (mail,password,name,lastname,dni,phone,role,active) values (?,?,?,?,?,?,?,1);`,
}

export default userQueries;