'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { AdminTable } from "@/app/components/adminTable/adminTable";
import { Menu } from "@/app/components/nav/nav";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const dataClient = [
  {
    name: 'Guada',
    lastName: 'Chojo',
    dni: 24000000,
    tel: 2284897534,
    email: 'guadachojo@gmail.com',
  },
  {
    name: 'Ayelen',
    lastName: 'Porqueres',
    dni: 24000000,
    tel: 2284897534,
    email: 'ayeporqueres@gmail.com',
  },
  {
    name: 'Lorena',
    lastName: 'Planes',
    dni: 24000000,
    tel: 2284897534,
    email: 'lolitaplanes@gmail.com',
  },
]

const dataProf = [{}]
const dataService = [{}]
const dataAppoint = [{}]

function AdminPage() {
  const [filter, setFilter] = useState('clientes');
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState<any>([]);

  useEffect(() => {
    filtered(filter);
  }, [filter]);

  const filtered = (filter:any) => {
    let data: any;
    switch (filter) {
      case 'clientes':
        const filteredColumns = [
          /* {
            header: "ID",
            accessorKey: "id",
          }, */
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
        setColumns(filteredColumns);
        return data = dataClient;
        break;
      case 'profesionales':
        return data = dataProf;
        break;
      case 'servicios':
        return data = dataService;
        break;
      case 'turnos':
        return data = dataAppoint;
        break;
    }
    setFilteredData(data);
   
  }

  return (
    <>
      <header>
        <div>
          <Menu></Menu>
        </div>

      </header>

      <main>
        <Dropdown>
          <Dropdown.Toggle >{filter.toUpperCase()}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter('clientes')}>Clientes</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('profesionales')}>Profesionales</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('servicios')}>Servicios</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('turnos')}>Turnos</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <AdminTable data={filteredData} columns={columns} />
      </main>
    </>
  )
}

export default withRoles(AdminPage, 'admin', '/home')