const clientQueries = {
    insertUser: `insert into users (mail,password,name,role,active) values (?,?,?,'client',1);`,
    insertClient: `insert into client (name,dni,phone,active,id_user) values (?,?,?,1,?);`
}

export default clientQueries;