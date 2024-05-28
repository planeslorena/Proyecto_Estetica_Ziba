'use client'
/*import { Logo } from "@/app/components/logo/logo";*/
import { BannerHome } from "@/app/components/bannerHome/bannerHome";
import { Menu } from "@/app/components/nav/nav";
import { Cafeteria } from "@/app/components/infoHome/infoHome";
import { Footer } from "@/app/components/footer/footer";
import { CardProfessional } from "@/app/components/cardProfessional/cardProfessional";


export default function Home() {
    return (
        <>
          <header>
            <div>
             
              <Menu></Menu>
            </div>
    
          </header>
    
          <main>
           <BannerHome></BannerHome>
           <CardProfessional></CardProfessional>
           <Cafeteria></Cafeteria>
        
          </main>
          <Footer></Footer>
        </>
      )
}