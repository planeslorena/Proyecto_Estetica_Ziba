'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
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
        <h1>appointment</h1>
      </main>
    </>
  )
}

export default withRoles(AppointmentPage,'client', '/home')