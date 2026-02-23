import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    ArrowRight,
    CheckCircle2,
    Phone,
    ShieldCheck,
    MapPin,
    Clock,
    Scale,
    ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PRACTICE_AREAS_TR, ALL_SLUGS } from "@/data/practice-areas-tr"

const CANONICAL_BASE = "https://taslawfirm.com.tr"

// ── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
    return ALL_SLUGS.map((slug) => ({ slug }))
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const area = PRACTICE_AREAS_TR[slug]

    if (!area) {
        return { title: "Sayfa Bulunamadı" }
    }

    const url = `${CANONICAL_BASE}/tr/calisma-alanlari/${slug}`

    // TR → EN slug mapping for bidirectional hreflang
    const trToEnSlugMap: Record<string, string> = {
        "is-hukuku": "employment",
        "gayrimenkul-hukuku": "real-estate",
        "miras-hukuku": "estate-planning",
    }
    const enSlug = trToEnSlugMap[slug]
    const enUrl = enSlug
        ? `${CANONICAL_BASE}/en/practice-areas/${enSlug}`
        : `${CANONICAL_BASE}/en/practice-areas`

    return {
        title: area.title,
        description: area.metaDescription,
        keywords: area.keywords,
        alternates: {
            canonical: url,
            languages: {
                tr: url,
                en: enUrl,
                "x-default": url,
            },
        },
        openGraph: {
            type: "website",
            url,
            locale: "tr_TR",
            title: `${area.title} | Taş Hukuk & Danışmanlık`,
            description: area.metaDescription,
            siteName: "Taş Hukuk & Danışmanlık",
        },
        twitter: {
            card: "summary",
            title: `${area.title} | Taş Hukuk & Danışmanlık`,
            description: area.metaDescription,
        },
        robots: { index: true, follow: true },
    }
}

// ── Page Component ───────────────────────────────────────────────────────────
export default async function CalismaAlaniDetayPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const area = PRACTICE_AREAS_TR[slug]

    if (!area) {
        notFound()
    }

    // ── JSON-LD Structured Data ──────────────────────────────────────────────
    const legalServiceSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: `${area.title} — Taş Hukuk & Danışmanlık`,
        description: area.metaDescription,
        url: `${CANONICAL_BASE}/tr/calisma-alanlari/${slug}`,
        serviceType: area.title,
        provider: {
            "@type": "LegalService",
            name: "Taş Hukuk & Danışmanlık",
            url: CANONICAL_BASE,
            telephone: "+90 535 400 00 55",
            address: {
                "@type": "PostalAddress",
                addressLocality: "İzmir",
                addressCountry: "TR",
            },
        },
        areaServed: {
            "@type": "City",
            name: "İzmir",
        },
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Ana Sayfa",
                item: `${CANONICAL_BASE}/tr`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Çalışma Alanları",
                item: `${CANONICAL_BASE}/tr/calisma-alanlari`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: area.title,
                item: `${CANONICAL_BASE}/tr/calisma-alanlari/${slug}`,
            },
        ],
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: area.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* JSON-LD Structured Data */}
            <Script
                id={`ld-legal-service-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
            />
            <Script
                id={`ld-breadcrumb-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id={`ld-faq-${slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative mt-20 pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                </div>

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-1 text-sm text-white/60">
                            <li><Link href="/tr" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                            <li><ChevronRight size={14} /></li>
                            <li><Link href="/tr/calisma-alanlari" className="hover:text-white transition-colors">Çalışma Alanları</Link></li>
                            <li><ChevronRight size={14} /></li>
                            <li className="text-white font-medium">{area.title}</li>
                        </ol>
                    </nav>

                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
                                <Scale className="text-amber-400" size={32} />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight">
                                {area.title}
                            </h1>
                        </div>

                        <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-3xl">
                            {area.heroSummary}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-base px-8">
                                <Link href="/tr/online-randevu">
                                    Avukatla Görüşme Talep Et
                                    <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent text-base px-8">
                                <Link href="tel:+905354000055">
                                    <Phone className="mr-2" size={18} />
                                    Hemen Ara
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-white/60 pt-2">
                            <MapPin size={16} className="text-amber-400" />
                            <span>{area.trustBadge}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          2. WHAT IS THIS LAW FIELD?
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center">
                            {area.whatIsTitle}
                        </h2>
                        <div className="space-y-6">
                            {area.whatIsContent.map((paragraph, i) => (
                                <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          3. SERVICES WE PROVIDE
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                                {area.servicesTitle}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Her bir hizmet alanında uzmanlaşmış avukatlarımızla kapsamlı hukuki destek sunuyoruz.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {area.services.map((service) => (
                                <Card key={service.name} className="border-border bg-white hover:shadow-lg transition-shadow">
                                    <CardContent className="p-6 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-semibold">{service.name}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          4. PROCESS INFORMATION
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                                {area.processTitle}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Hukuki sürecinizi başından sonuna kadar şeffaf ve anlaşılır şekilde yönetiyoruz.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {area.processSteps.map((step, index) => (
                                <div key={index} className="flex gap-6 items-start">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-lg flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        {index < area.processSteps.length - 1 && (
                                            <div className="w-0.5 h-full min-h-[2rem] bg-amber-200 mt-2" />
                                        )}
                                    </div>
                                    <div className="pb-6">
                                        <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{step.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          5. FREQUENTLY ASKED QUESTIONS
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                                {area.faqTitle}
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Müvekkillerimizin en çok merak ettiği soruları yanıtlıyoruz.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {area.faqs.map((faq, index) => (
                                <details
                                    key={index}
                                    className="group bg-white border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold list-none">
                                        <span className="pr-4">{faq.question}</span>
                                        <ChevronRight
                                            size={20}
                                            className="text-muted-foreground flex-shrink-0 transition-transform duration-200 group-open:rotate-90"
                                        />
                                    </summary>
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          6. WHY TAS LAW FIRM (EEAT SIGNALS)
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                                {area.whyUsTitle}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {area.whyUs.map((item, index) => {
                                const icons = [ShieldCheck, MapPin, Clock, Scale]
                                const Icon = icons[index % icons.length]
                                return (
                                    <div key={index} className="flex gap-5 items-start">
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                                            <Icon className="text-amber-600" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
          7. CONTACT CTA SECTION
          ═══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 lg:py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                            {area.ctaTitle}
                        </h2>
                        <p className="text-xl text-white/80 leading-relaxed">
                            {area.ctaDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold text-base px-8">
                                <Link href="/tr/online-randevu">
                                    Online Randevu Al
                                    <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent text-base px-8">
                                <Link href="tel:+905354000055">
                                    <Phone className="mr-2" size={18} />
                                    +90 535 400 00 55
                                </Link>
                            </Button>
                        </div>

                        <p className="text-sm text-white/50 pt-4">
                            İlk görüşme ücretsizdir. Gizlilik ilkemiz gereği tüm bilgileriniz korunur.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
