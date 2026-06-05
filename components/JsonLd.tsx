/**
 * JSON-LD Structured Data Component
 * Supports: WebSite, Organization, LocalBusiness, Service, BreadcrumbList, FAQPage, WebPage
 *
 * Usage:
 *   <JsonLd schema={websiteSchema()} />
 *   <JsonLd schema={organizationSchema()} />
 *   <JsonLd schema={localBusinessSchema({ name, address, phone, ... })} />
 */

import React from 'react'

const BASE = process.env.NEXT_PUBLIC_PRODUCTION_URL ?? 'https://vantarafrique.com'

// ─── Schema builders ────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vantara',
    url: BASE,
    description: "Africa's Beauty & Grooming Marketplace. Book verified barbers, salons, makeup artists, and nail technicians.",
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vantara',
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: "Africa's Beauty & Grooming Marketplace connecting customers with verified beauty professionals.",
    foundingDate: '2024',
    areaServed: ['Kenya', 'Uganda', 'Tanzania', 'Nigeria', 'Ghana'],
    sameAs: [
      'https://twitter.com/vantarafrique',
      'https://instagram.com/vantarafrique',
      'https://facebook.com/vantarafrique',
      'https://linkedin.com/company/vantara',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@vantara.com',
      availableLanguage: 'English',
    },
  }
}

export function webApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Vantara',
    url: BASE,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web, Android, iOS',
    description: 'Book beauty services across Africa — salons, barbers, makeup artists, nail technicians.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to download and use',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '8200',
      bestRating: '5',
    },
  }
}

export interface LocalBusinessSchemaInput {
  id: string
  name: string
  description: string
  address: string
  city: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  type: 'HairSalon' | 'HealthAndBeautyBusiness' | 'BeautySalon' | 'NailSalon'
  lat?: number
  lng?: number
  priceRange?: string
  images?: string[]
  website?: string
}

export function localBusinessSchema(biz: LocalBusinessSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': [biz.type, 'LocalBusiness'],
    '@id': `${BASE}/salon/${biz.id}`,
    name: biz.name,
    description: biz.description,
    url: `${BASE}/salon/${biz.id}`,
    telephone: biz.phone,
    email: biz.email,
    image: biz.images ?? [`${BASE}/placeholder-business.svg`],
    ...(biz.priceRange && { priceRange: biz.priceRange }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: biz.address,
      addressLocality: biz.city,
      addressCountry: 'KE',
    },
    ...(biz.lat && biz.lng && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: biz.lat,
        longitude: biz.lng,
      },
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: biz.rating,
      ratingCount: biz.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    ...(biz.website && { sameAs: [biz.website] }),
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE}${item.url}`,
    })),
  }
}

export interface FAQItem {
  question: string
  answer: string
}

export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function webPageSchema(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: url.startsWith('http') ? url : `${BASE}${url}`,
    isPartOf: { '@id': BASE },
    inLanguage: 'en',
  }
}

// ─── Render component ────────────────────────────────────────────────────────

interface JsonLdProps {
  /** Pass a single schema object or an array for multiple schemas on one page */
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function JsonLd({ schema }: JsonLdProps) {
  const json = Array.isArray(schema) ? schema : [schema]
  return (
    <>
      {json.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s, null, 0) }}
        />
      ))}
    </>
  )
}
