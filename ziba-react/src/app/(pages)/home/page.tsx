'use client'
import { Logo } from "@/app/componentes/logo/logo";
import { PortadaHome } from "@/app/componentes/portadaHome/portadaHome";
import { Menu } from "@/app/componentes/nav/nav";

export default function Home() {
    return (
        <>
          <header>
            <div>
              <Logo></Logo>
              <Menu></Menu>
            </div>
    
          </header>
    
          <main>
           <PortadaHome></PortadaHome>
          </main>
          
        </>
      )
}