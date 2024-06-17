const servicesQueries = {
    selectAllSpecialties: `select s.name speciality,u.name name,u.lastname lastname
                        from professional p 
                        join users u 
                        join specialties s 
                        on p.id_user = u.id_user 
                        and p.id_speciality = s.id_speciality;`,
    selectAllServices:`select  s.name speciality , se.name service
                        from specialties s 
                        join services se
                        on s.id_speciality = se.id_speciality;`,
    selectServiceWithSpeciality: `select se.id_service, se.name service,se.description, s.name speciality ,u.name,u.lastname, se.price
                                    from professional p 
                                    join users u 
                                    join specialties s 
                                    join services se
                                    on p.id_user = u.id_user 
                                    and p.id_speciality = s.id_speciality
                                    and se.id_speciality  = s.id_speciality ;`,
    selectAllAppointments:`select a.id_appointment, date,hour,u.name, u.lastname, s.name service
                            from appointments a 
                            join users u 
                            join services s 
                            on a.id_user = u.id_user 
                            and a.id_service = s.id_service ;` 
}

export default servicesQueries;