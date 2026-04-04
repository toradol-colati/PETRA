import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import System from "@/components/System";
import Network from "@/components/Network";
import Footer from "@/components/Footer";
 
export default function Home() {
  return (
    <main className="min-h-screen bg-ivory selection:bg-crimson selection:text-parchment">
      <Navbar />
      <Hero />
      <System />
      <Network />
      <Footer />
    </main>
  );
}