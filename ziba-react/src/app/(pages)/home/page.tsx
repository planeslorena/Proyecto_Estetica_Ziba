'use client'
import { Logo } from "@/app/components/logo/logo";
import { BannerHome } from "@/app/components/bannerHome/bannerHome";
import { Menu } from "@/app/components/nav/nav";

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
           <BannerHome></BannerHome>
          </main>
          
        </>
      )
}