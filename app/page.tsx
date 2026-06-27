import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Experience } from "@/components/sections/Experience";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SignatureDishes />
      <Menu />
      <Gallery />
      <Reviews />
      <Experience />
      <Reservation />
      <Contact />
    </>
  );
}
