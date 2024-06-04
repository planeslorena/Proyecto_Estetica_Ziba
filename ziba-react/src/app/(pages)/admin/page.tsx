'use client'
import { withRoles } from "@/app/components/HOC/whitRoles";
import { AdminTable } from "@/app/components/adminTable/adminTable";
import { Menu } from "@/app/components/nav/nav";

function AdminPage() {
  return (
    <>
      <header>
        <div>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <AdminTable/>
      </main>
    </>
  )
}

export default withRoles(AdminPage,'admin', '/home')