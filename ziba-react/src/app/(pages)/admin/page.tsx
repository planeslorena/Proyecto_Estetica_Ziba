'use client'
import { Logo } from "@/app/components/logo/logo";
import { Menu } from "@/app/components/nav/nav";

export default function AuthPage() {
  return (
    <>
      <header>
        <div>
            <Logo></Logo>
            <Menu></Menu>
        </div>

      </header>

      <main>
        <h1>admin</h1>
      </main>
    </>
  )
}