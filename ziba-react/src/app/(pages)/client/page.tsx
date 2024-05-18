'use client'
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
        <h1>client</h1>
      </main>
    </>
  )
}