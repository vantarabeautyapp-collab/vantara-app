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

function KenteDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: '6px',
        width: '100%',
        background: 'repeating-linear-gradient(90deg, #A64B2A 0, #A64B2A 16.67%, #D4A24C 16.67%, #D4A24C 33.33%, #120D08 33.33%, #120D08 50%, #556B2F 50%, #556B2F 66.67%, #E07A2D 66.67%, #E07A2D 83.33%, #8B3A1A 83.33%, #8B3A1A 100%)',
      }}
    />
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--color-background)' }}>
      <NavbarSection />
      <HeroSection />
      <KenteDivider />
      <CategoriesSection />
      <HowItWorksSection />
      <ManifestoSection />
      <KenteDivider />
      <FeaturedSection />
      <FeaturesSection />
      <PassportSection />
      <TestimonialsSection />
      <ForBusinessSection />
      <KenteDivider />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
