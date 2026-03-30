import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Mechanics from "@/components/Mechanics";
import Registry from "@/components/Registry";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Mechanics />
        <Registry />
        <Partners />
      </main>
      <Footer />
    </>
  );
}
