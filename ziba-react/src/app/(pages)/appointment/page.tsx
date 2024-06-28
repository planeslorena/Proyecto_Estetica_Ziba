'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { CardService } from "@/app/components/cardService/cardService";
import { Menu } from "@/app/components/nav/nav";

function AppointmentPage() {
  return (
    <>
      <header>
        <div>
          <Menu></Menu>

        </div>

      </header>

      <main>
        <div className="d-flex justify-content-center">
          <CardService></CardService>
        </div>
      </main>
    </>
  )
}

export default withRoles(AppointmentPage, 'client', '/home')