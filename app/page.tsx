/**
 * Vantara — Landing Page
 *
 * Composed from individual section components in components/sections/.
 * Each section owns its own data, state, and imports.
 */

import { NavbarSection }      from '@/components/sections/NavbarSection'
import { HeroSection }        from '@/components/sections/HeroSection'
import { CategoriesSection }  from '@/components/sections/CategoriesSection'
import { HowItWorksSection }  from '@/components/sections/HowItWorksSection'
import { ManifestoSection }   from '@/components/sections/ManifestoSection'
import { FeaturedSection }    from '@/components/sections/FeaturedSection'
import { FeaturesSection }    from '@/components/sections/FeaturesSection'
import { PassportSection }    from '@/components/sections/PassportSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ForBusinessSection } from '@/components/sections/ForBusinessSection'
import { PricingSection }     from '@/components/sections/PricingSection'
import { CTASection }         from '@/components/sections/CTASection'
import { FooterSection }      from '@/components/sections/FooterSection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
      <NavbarSection />
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <ManifestoSection />
      <FeaturedSection />
      <FeaturesSection />
      <PassportSection />
      <TestimonialsSection />
      <ForBusinessSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
