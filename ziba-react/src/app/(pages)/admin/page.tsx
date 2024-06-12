'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { AdminTable } from "@/app/components/adminTable/adminTable";
import { Menu } from "@/app/components/nav/nav";
import { getAllClients } from "@/app/services/User";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";

const dataClient2 = [
  {
    id_user: 1,
    name: 'Guada',
    lastname: 'Chojo',
    dni: 24000000,
    phone: 2284897534,
    mail: 'guadachojo@gmail.com',
  },
  {
    id_user: 2,
    name: 'Ayelen',
    lastname: 'Porqueres',
    dni: 24000000,
    phone: 2284897534,
    mail: 'ayeporqueres@gmail.com',
  },
  {
    id_user: 3,
    name: 'Lorena',
    lastname: 'Planes',
    dni: 24000000,
    phone: 2284897534,
    mail: 'lolitaplanes@gmail.com',
  },
]

/*const dataProf = [{
  id: 1,
  name: 'Romina',
  lastname: 'Benegas',
  dni: 24000000,
  tel: 2284897534,
  email: 'romibenegas@gmail.com',
  specialty: 'Depilación',
},
{
  id: 2,
  name: 'Marisa',
  lastname: 'Ruiz',
  dni: 24000000,
  tel: 2284897534,
  email: 'marisaruis@gmail.com',
  specialty: 'Cosmetología',
},
{
  id: 3,
  name: 'Maiten',
  lastname: 'Suarez',
  dni: 24000000,
  tel: 2284897534,
  email: 'maitesuar@gmail.com',
  specialty: 'Manicuría',
},]

/*const dataService = [{
  id: 1,
  specialty: 'Depilación',
  name: 'Romina',
  lastname: 'Benegas',
  availability: '',
},
{
  id: 2,
  specialty: 'Cosmetología',
  name: 'Marisa',
  lastname: 'Ruiz',
  availability: '',
},
{
  id: 3,
  specialty: 'Manicuría',
  name: 'Maiten',
  lastname: 'Suarez',
  availability: '',
},]

const dataAppoint = [{
  id: 1,
  name: 'Romina',
  lastname: 'Benegas',
  dni: 24000000,
  tel: 2284897534,
  email: 'romibenegas@gmail.com',
  specialty: 'Depilación',
},
{
  id: 2,
  name: 'Marisa',
  lastname: 'Ruiz',
  dni: 24000000,
  tel: 2284897534,
  email: 'marisaruis@gmail.com',
  specialty: 'Cosmetología',
},
{
  id: 3,
  name: 'Maiten',
  lastname: 'Suarez',
  dni: 24000000,
  tel: 2284897534,
  email: 'maitesuar@gmail.com',
  specialty: 'Manicuría',
},]*/

const columnsClient = [
  {
    header: "ID",
    accessorKey: "id_user",
  },
  {
    header: "Nombres",
    accessorKey: "name",
  },
  {
    header: "Apellido",
    accessorKey: "lastname",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Teléfono",
    accessorKey: "phone"
  },
  {
    header: "Email",
    accessorKey: "mail",
  },
];

const columnsProf = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombres",
    accessorKey: "name",
  },
  {
    header: "Apellido",
    accessorKey: "lastname",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Teléfono",
    accessorKey: "tel"
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Especialidad",
    accessorKey: "specialty",
  },
];

const columnsService = [{
  header: "ID",
  accessorKey: "id",
},
{
  header: "Especialidad",
  accessorKey: "specialty",
},

{
  header: "Profesional",
  accessorFn: (row:any) => `Prof. ${row.name} ${row.lastname}`,
},
{
  header: "Horarios",
  accessorKey: "availability",
},]

const columnsAppoint = [{
  header: "ID",
  accessorKey: "id",
},
{
  header: "Especialidad",
  accessorKey: "specialty",
},
{
  header: "Profesional",
  accessorFn: (row:any) => `Prof. ${row.name} ${row.lastname}`,
},
{
  header: "Horarios",
  accessorKey: "availability",
},]

function AdminPage() {
  const [filter, setFilter] = useState('Clientes');
  const [data,setData] = useState<any[]>([])

  const loadClients = async () => {
    const resp = await getAllClients();
    setData(resp);
    }

  useEffect(() => {
    switch (filter) {
      case 'Clientes':
        loadClients();

      /*case 'Profesionales':
        return dataProf;

      case 'Servicios':
        return dataService;

      case 'Turnos':
        return dataAppoint;
*/
      default:
        loadClients();
    }
  }, [filter])

  const columns = useMemo(() => {
    switch (filter) {
      case 'Clientes':
        return columnsClient;

      /*case 'Profesionales':
        return columnsProf;

      case 'Servicios':
        return columnsService;

      case 'Turnos':
        return columnsAppoint;
*/
      default:
        return columnsClient;
    }
  }, [filter])

  return (
    <>
      <header>
        <div>
          <Menu></Menu>
        </div>

      </header>

      <main>
        <Dropdown>
          <Dropdown.Toggle >{filter}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter('Clientes')}>Clientes</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Profesionales')}>Profesionales</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Servicios')}>Servicios</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Turnos')}>Turnos</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <AdminTable data={data} columns={columns} />
        
      </main>
    </>
  )
}

export default withRoles(AdminPage, 'admin', '/home')