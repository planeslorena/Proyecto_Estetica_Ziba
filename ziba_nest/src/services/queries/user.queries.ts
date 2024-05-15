const userQueries = {
insertUser: `insert into users (mail,password,name,dni,phone,role,active) values (?,?,?,?,?,?,1);`,
}

export default userQueries;