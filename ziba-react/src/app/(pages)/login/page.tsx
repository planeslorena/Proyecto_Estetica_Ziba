'use client'
import { Logo } from "@/app/components/logo/logo";
import { PortadaHome } from "@/app/components/bannerHome/portadaHome";
import { Menu } from "@/app/components/nav/nav";

export default function Login() {
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