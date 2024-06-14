'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { AdminTable } from "@/app/components/adminTable/adminTable";
import { Menu } from "@/app/components/nav/nav";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";

const dataClient = [
  {
    id: 1,
    name: 'Guada',
    lastname: 'Chojo',
    dni: 24000000,
    tel: 2284897534,
    email: 'guadachojo@gmail.com',
  },
  {
    id: 2,
    name: 'Ayelen',
    lastname: 'Porqueres',
    dni: 24000000,
    tel: 2284897534,
    email: 'ayeporqueres@gmail.com',
  },
  {
    id: 3,
    name: 'Lorena',
    lastname: 'Planes',
    dni: 24000000,
    tel: 2284897534,
    email: 'lolitaplanes@gmail.com',
  },
  {
    id: 4,
    name: 'Carla',
    lastname: 'Rodriguez',
    dni: 24000000,
    tel: 2284897636,
    email: 'carlitarodriguez@gmail.com',
  },
]

const dataProf = [{
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

const dataService = [{
  id: 1,
  service: 'Bozo', 
  specialty: 'Depilación',
  name: 'Romina',
  lastname: 'Benegas',
  price: 10000,
  availability: '',
},
{
  id: 2,
  service: 'Peeling', 
  specialty: 'Cosmetología',
  name: 'Marisa',
  lastname: 'Ruiz',
  price: 10000,
  availability: '',
},
{
  id: 3,
  service: 'Soft gel', 
  specialty: 'Manicuría',
  name: 'Maiten',
  lastname: 'Suarez',
  price: 10000,
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
},]

const columnsClient = [
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
  header: "Servicio",
  accessorKey: "service",
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
  header: "Precio",
  accessorKey: "price",
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

  const data = useMemo(() => {
    switch (filter) {
      case 'Clientes':
        return dataClient;

      case 'Profesionales':
        return dataProf;

      case 'Servicios':
        return dataService;

      case 'Turnos':
        return dataAppoint;

      default:
        return dataClient;
    }
  }, [filter])

  const columns = useMemo(() => {
    switch (filter) {
      case 'Clientes':
        return columnsClient;

      case 'Profesionales':
        return columnsProf;

      case 'Servicios':
        return columnsService;

      case 'Turnos':
        return columnsAppoint;

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

      <main className="dropdown-admin">
        <Dropdown>
          <Dropdown.Toggle >{filter}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter('Clientes')}>Clientes</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Profesionales')}>Profesionales</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Servicios')}>Servicios</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Turnos')}>Turnos</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <AdminTable data={data} columns={columns} filter= {filter}/>
        
      </main>
    </>
  )
}

export default withRoles(AdminPage, 'admin', '/home')