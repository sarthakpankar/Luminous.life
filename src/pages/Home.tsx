import Hero from '@/sections/Hero'
import ToolSection from '@/sections/ToolSection'
import StatsSection from '@/sections/StatsSection'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Hero />
      <ToolSection />
      <StatsSection />
      <Footer />
    </main>
  )
}
