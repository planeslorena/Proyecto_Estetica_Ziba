'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { CardService } from "@/app/components/cardService/cardService";
import CustomPagination from "@/app/components/cardService/pagination";
import { Menu } from "@/app/components/nav/nav";
import { useState } from "react";

const specialities = [
  { img: 'cosmetologia', prof: 'Marisa Ruiz', price: '10000', services: ['Peeling', 'Limpieza facial'] },
  { img: 'depilacion', prof: 'Romina Benegas', price: '10000', services: ['Bozo', 'Piernas'] },
  { img: 'manicuria', prof: 'Maiten Suarez', price: '10000', services: ['Soft gel', 'Semipermanente'] },
  { img: 'maquillaje', prof: 'Eva Jimenez', price: '10000', services: ['Novias', 'Quinceañeras'] },
  { img: 'masoterapia', prof: 'Naomi Almeida', price: '10000', services: ['Masaje terapéutico', 'Masaje lifático'] },
  { img: 'peluqueria', prof: 'Irene Acosta', price: '10000', services: ['Corte', 'Nutrición'] },
]

function AppointmentPage() {
  const [currentPage, setCurrentPage] = useState(1); // set the current page
  const pageSize = 2; // show row in table

  const paginatedData = specialities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <header>
        <div>
          <Menu></Menu>
        </div>
      </header>

      <main>
        {paginatedData.map((specialities: any) => (
          <div className="d-flex flex-column align-items-center">

            <>
              <CardService speciality={specialities}></CardService>

            </>

          </div>
        ))}
        <CustomPagination
          itemsCount={specialities.length}
          itemsPerPage={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          alwaysShown={true}
        />
      </main>
    </>
  )
}

export default withRoles(AppointmentPage, 'client', '/home')