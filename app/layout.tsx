import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Latin Prime Systems — AI Automation Agency for Small Business",
    template: "%s | Latin Prime Systems",
  },
  description:
    "Latin Prime Systems is a done-for-you AI automation agency for small and medium businesses. We deploy AI voice agents, CRM systems, workflow automation, and chatbots so your business captures every lead and runs 24/7 — without hiring.",
  keywords: [
    "AI automation agency",
    "CRM for small business",
    "AI voice agent",
    "GoHighLevel agency",
    "workflow automation small business",
    "lead follow-up automation",
    "AI chatbot for business",
    "done-for-you automation",
    "automated follow-up system",
    "Latin Prime Systems",
    "AI automation for insurance",
    "AI automation for real estate",
    "AI automation for dental",
    "business automation US",
    "automatización IA negocios",
    "agencia automatización IA",
    "agente de voz IA",
  ],
  authors: [{ name: "Latin Prime Systems" }],
  creator: "Latin Prime Systems",
  publisher: "Latin Prime Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://latinprimesystems.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://latinprimesystems.com",
    siteName: "Latin Prime Systems",
    title: "Latin Prime Systems — AI Automation Agency for Small Business",
    description:
      "Done-for-you AI automation: voice agents, CRM, follow-up systems, and workflow automation. Stop losing leads. Scale without hiring. 90-Day ROI Guarantee.",
    images: [
      {
        url: "https://storage.googleapis.com/msgsndr/0EgKTcd9YvsDKkQqklPo/media/691b4d7d013f3138a3825fc0.webp",
        width: 1200,
        height: 630,
        alt: "Latin Prime Systems — AI Automation for Small Business",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Latin Prime Systems — AI Automation Agency for Small Business",
    description:
      "Done-for-you AI: voice agents that answer calls 24/7, automated follow-ups, CRM systems. 90-Day ROI Guarantee.",
    images: [
      "https://storage.googleapis.com/msgsndr/0EgKTcd9YvsDKkQqklPo/media/691b4d7d013f3138a3825fc0.webp",
    ],
  },
  category: "Business Services",
  classification: "AI Automation Agency",
};

// Comprehensive JSON-LD for AI search engines (GEO)
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://latinprimesystems.com/#business",
    name: "Latin Prime Systems",
    alternateName: ["Latin Prime", "LPS", "Latin Prime Enterprises"],
    description:
      "Latin Prime Systems is a done-for-you AI automation agency specializing in AI voice agents, CRM setup, workflow automation, automated follow-up systems, and AI chatbots for small and medium businesses in the United States and Latin America. Founded to help business owners stop being the bottleneck in their own operations by replacing manual work with intelligent, always-on AI systems.",
    url: "https://latinprimesystems.com",
    telephone: "+19714006390",
    email: "contact@latinprimesystems.com",
    foundingDate: "2024",
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Mexico" },
      { "@type": "Country", name: "Colombia" },
      { "@type": "Country", name: "Venezuela" },
      { "@type": "Place", name: "Latin America" },
    ],
    serviceType: [
      "AI Automation",
      "AI Voice Agent Deployment",
      "CRM Setup and Configuration",
      "Workflow Automation",
      "AI Chatbot Development",
      "Lead Follow-Up Automation",
      "Sales Pipeline Automation",
      "GoHighLevel Agency Services",
      "Business Process Automation",
      "Missed Call Text-Back Systems",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Plans",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Starter Plan",
          description:
            "CRM with 2 pipelines, AI chat widget, online booking system, automated follow-up via email and SMS, welcome sequence, 1 custom automation, Google Business Profile setup, monthly performance report, and email support. Professional website included.",
          price: "497",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "497",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          description:
            "Everything in Starter with unlimited pipelines and flows, unlimited custom automations, advanced AI chat connected to CRM, sales pipeline with automatic nurturing, calendar integration with no-show prevention, dormant client reactivation, Facebook Lead Ads to CRM, automated Instagram DMs, WhatsApp Business API, complete sales funnel, reputation management, Stripe payment integration, and priority support.",
          price: "997",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "997",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Growth Plan",
          description:
            "Everything in Pro plus AI voice agent (24/7 inbound call answering, lead qualification, appointment booking, automatic outbound calls to new leads), AI-generated sales emails, personalized follow-up copy, automatic reporting dashboard, priority support with 4-hour response, and monthly strategy call.",
          price: "1497",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "1497",
            priceCurrency: "USD",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan",
          description:
            "Fully custom AI infrastructure: custom workflows, AI agents trained on client data, automated client onboarding, referral automation, multi-location systems, white-label options, API integrations, dedicated account manager, weekly calls, quarterly audits.",
          price: "0",
          priceCurrency: "USD",
          eligibleCustomerType: "Business",
        },
      ],
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Jesús Martínez" },
        reviewBody:
          "Since we set up the AI voice agent, we haven't missed a single lead. Our close rate went up 40% in the first two months.",
        datePublished: "2025-12-01",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Kerwin Iglesias" },
        reviewBody:
          "Within 30 days, the system had already recovered $4,200 in policies from dormant leads. The ROI was obvious in the first month.",
        datePublished: "2025-11-01",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Berta Viloria" },
        reviewBody:
          "I handled 30% more clients this year with the same staff. Tax season automation changed everything.",
        datePublished: "2026-01-01",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "5",
      bestRating: "5",
      worstRating: "1",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://latinprimesystems.com/#website",
    url: "https://latinprimesystems.com",
    name: "Latin Prime Systems",
    description:
      "Done-for-you AI automation agency. AI voice agents, CRM systems, workflow automation, and chatbots for small and medium businesses.",
    inLanguage: ["en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://latinprimesystems.com/?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://latinprimesystems.com/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Latin Prime Systems do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Latin Prime Systems is a done-for-you AI automation agency. We build and deploy AI voice agents that answer calls 24/7, CRM systems that track every lead, workflow automations that eliminate manual work, and AI chatbots — so small and medium businesses can operate, follow up, and scale without hiring more people.",
        },
      },
      {
        "@type": "Question",
        name: "How much does AI automation cost for a small business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Latin Prime Systems offers four plans: Starter at $497/month (CRM, AI chat widget, follow-up automation, booking system, website), Pro at $997/month (everything in Starter plus unlimited automations, multichannel — WhatsApp, Instagram, Facebook, Stripe, reputation management), Growth at $1,497/month (everything in Pro plus AI voice agent that answers calls 24/7), and Enterprise with custom pricing for agencies and multi-location businesses. All plans include a one-time setup fee and ongoing support with no long-term contracts.",
        },
      },
      {
        "@type": "Question",
        name: "Which industries does Latin Prime Systems serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Latin Prime Systems serves insurance agencies, real estate agents and brokers, dental and healthcare practices, med spas and aesthetics businesses, contractors and home services, tax and accounting firms, restaurants and local businesses, coaches and consultants, law firms, salons, barbershops, and spas.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to set up AI automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Starter systems are typically live in 7 to 14 days. Growth systems with AI voice agents take 14 to 30 days depending on complexity. Enterprise systems are scoped individually.",
        },
      },
      {
        "@type": "Question",
        name: "Does Latin Prime Systems require a long-term contract?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Latin Prime Systems operates on month-to-month plans with no long-term contracts. You can cancel anytime. All plans are backed by a guarantee: 90-day ROI guarantee on the Growth plan, 30-day system delivery guarantee on the Starter plan.",
        },
      },
      {
        "@type": "Question",
        name: "What is an AI voice agent for small business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An AI voice agent is an AI-powered phone system that answers inbound calls 24/7, qualifies leads with custom questions, books appointments directly into your calendar, and automatically follows up with missed calls via text. Latin Prime Systems deploys AI voice agents using VAPI and ElevenLabs technology, configured specifically for each client's industry and business.",
        },
      },
      {
        "@type": "Question",
        name: "Does Latin Prime Systems work with businesses in Latin America?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Latin Prime Systems actively serves clients in Mexico, Colombia, Venezuela, and other Latin American countries. Pricing is adjusted for local markets on request. All systems support full Spanish-language operation.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Latin Prime Systems and GoHighLevel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GoHighLevel is a software platform — like a CRM tool. Latin Prime Systems is a done-for-you agency that builds, configures, and manages your complete automation system inside GoHighLevel (and other platforms). Most businesses that buy GoHighLevel directly never use it effectively because setup is complex and time-consuming. Latin Prime Systems handles everything so you get a working system without learning software.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Industries Served by Latin Prime Systems",
    itemListElement: [
      "Insurance Agencies",
      "Real Estate Agents and Brokers",
      "Dental and Healthcare Practices",
      "Med Spas and Aesthetics",
      "Contractors and Home Services",
      "Tax and Accounting Firms",
      "Restaurants and Local Business",
      "Coaches and Consultants",
      "Law Firms",
      "Salons, Barbershops, and Spas",
    ].map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://latinprimesystems.com/#organization",
    name: "Latin Prime Systems",
    url: "https://latinprimesystems.com",
    logo: "https://assets.cdn.filesafe.space/0EgKTcd9YvsDKkQqklPo/media/69ac6d227bdf387250ce554b.png",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+19714006390",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish"],
        contactOption: "TollFree",
      },
    ],
    knowsAbout: [
      "AI Automation",
      "Artificial Intelligence for Business",
      "CRM Systems",
      "GoHighLevel",
      "AI Voice Agents",
      "VAPI AI",
      "Workflow Automation",
      "Lead Generation Automation",
      "Sales Pipeline Automation",
      "WhatsApp Business API",
      "Small Business Technology",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://latinprimesystems.com/#webpage",
    url: "https://latinprimesystems.com",
    name: "Latin Prime Systems — AI Automation Agency for Small Business",
    description: "Done-for-you AI automation: voice agents, CRM, follow-up systems, and workflow automation. Stop losing leads. Scale without hiring. 90-Day ROI Guarantee.",
    inLanguage: ["en", "es"],
    isPartOf: { "@id": "https://latinprimesystems.com/#website" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero", "#solutions", "#pricing", "#contact"],
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
      ],
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="theme-color" content="#020508" />
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="Latin Prime Systems" />
        <meta name="apple-mobile-web-app-title" content="Latin Prime Systems" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Geo targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="37.09024, -95.712891" />
        {/* GEO/AI: entity clarification for AI search engines */}
        <meta name="description" content="Latin Prime Systems — done-for-you AI automation agency. AI voice agents, CRM systems, and workflow automation for small businesses. Plans from $497–$1,497/month. 90-Day ROI Guarantee. Serving US and Latin America." />
        <meta name="subject" content="AI Automation Agency for Small Business" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        {/* hreflang — bilingual site */}
        <link rel="alternate" hrefLang="en" href="https://latinprimesystems.com" />
        <link rel="alternate" hrefLang="es" href="https://latinprimesystems.com" />
        <link rel="alternate" hrefLang="x-default" href="https://latinprimesystems.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
