'use client'
import { AppointmentList } from "@/app/components/appointmentList/appointmentList";
import { InfoUser } from "@/app/components/infoUser/infoUser";
import { Logo } from "@/app/components/logo/logo";
import { Menu } from "@/app/components/nav/nav";

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
        <InfoUser></InfoUser>
        <AppointmentList></AppointmentList>
      </main>
    </>
  )
}