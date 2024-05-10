import { Logo } from "@/app/componentes/logo/logo";
import { PortadaHome } from "@/app/componentes/portadaHome/portadaHome";
import { Nav } from "@/app/componentes/nav/nav";

export default function Home() {
    return (
        <>
          <header>
            <div>
              <Logo></Logo>
              <Nav></Nav>
            </div>
    
          </header>
    
          <main>
           <PortadaHome></PortadaHome>
          </main>
          
        </>
      )
}