'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { Menu } from "@/app/components/nav/nav";
import { AppointmentList } from "@/app/components/appointmentList/appointmentList";
import { InfoUser } from "@/app/components/infoUser/infoUser";
import { Footer } from "@/app/components/footer/footer";
import { NewAppointment } from "@/app/components/newAppointment/newAppointment";
import './page.css'

const cardsData = [{
  profesion: 'depiladora',
  servicio: 'Depilación',
  nombre: 'Romina Benegas',
  especialidad: 'Depilación brasileña',
  dia: '2024/07/28',
  horario: '20:00',
},
{
  profesion: 'cosmetóloga',
  servicio: 'Cosmetología',
  nombre: 'Marisa Ruiz',
  especialidad: 'Peeling',
  dia: '2024/06/29',
  horario: '15:00',
},
{
  profesion: 'cosmetóloga',
  servicio: 'Cosmetología',
  nombre: 'Marisa Ruiz',
  especialidad: 'Limpieza Facial',
  dia: '2024/07/05',
  horario: '16:00',
},
{
  profesion: 'masajista',
  servicio: 'Masoterapia',
  nombre: 'Naomi Almeida',
  especialidad: 'Masaje cuerpo entero',
  dia: '2024/06/14',
  horario: '17:00',
},
{
  profesion: 'manicura',
  servicio: 'Manicuría',
  nombre: 'Maiten Suarez',
  especialidad: 'Esculpidas',
  dia: '2024/07/30',
  horario: '18:00',
}];


function ClientPage() {

  return (
    <>
      <header>
        <div>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <div className="d-flex">
          <div className="d-flex flex-column info-user-appointment">
            <InfoUser></InfoUser>
            <div className="new-appointment">
              <NewAppointment></NewAppointment>
            </div>
          </div>
          <div className="appointment-list">
            <AppointmentList data={cardsData}></AppointmentList>
          </div>
        </div>
        <Footer></Footer>

      </main>
    </>
  )
}


export default withRoles(ClientPage,'client', '/home');