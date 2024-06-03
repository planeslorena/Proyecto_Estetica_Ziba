'use client'
import { AppointmentList } from "@/app/components/appointmentList/appointmentList";
import { InfoUser } from "@/app/components/infoUser/infoUser";
import { Logo } from "@/app/components/logo/logo";
import { Menu } from "@/app/components/nav/nav";
import './page.css'
import { NewAppointment } from "@/app/components/newAppointment/newAppointment";

export default function AdminPage() {
  return (
    <>
      <header>
        <div>
            <Logo></Logo>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <InfoUser></InfoUser>
            <div className="new-appointment">
              <NewAppointment></NewAppointment>
            </div>
          </div>
          <div className="appointment-list">
            <AppointmentList></AppointmentList>
          </div>
        </div>
      </main>
    </>
  )
}