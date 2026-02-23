import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Target, Users, Scale, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

const CANONICAL_BASE = "https://taslawfirm.com.tr"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Taş Law Firm & Consulting: A justice and client satisfaction-focused law firm. Professional legal consulting in İzmir.",
  alternates: {
    canonical: `${CANONICAL_BASE}/en/about`,
    languages: {
      "en": `${CANONICAL_BASE}/en/about`,
      "tr": `${CANONICAL_BASE}/tr/hakkimizda`,
      "x-default": `${CANONICAL_BASE}/tr/hakkimizda`,
    },
  },
  openGraph: {
    type: "website",
    title: "About Us | Taş Law Firm",
    description:
      "A justice and client satisfaction-focused law firm. Professional legal consulting in İzmir.",
    url: `${CANONICAL_BASE}/en/about`,
    locale: "en_US",
    images: [`${CANONICAL_BASE}/about-hero-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Taş Law Firm",
    description:
      "A justice and client satisfaction-focused law firm. Professional legal consulting in İzmir.",
    images: [`${CANONICAL_BASE}/about-hero-image.jpg`],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative mt-20 min-h-[60vh] pb-16 lg:pb-24 overflow-hidden">

        {/* Background image */}
        <Image
          src="/about-hero-image.jpg"
          alt="Taş Law Firm & Consulting - About Us"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 flex flex-col items-center justify-center h-[calc(60vh-4rem)] md:h-[calc(60vh-6rem)] lg:h-[calc(60vh-7rem)]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-white leading-[1.05] drop-shadow-xl">
              About Us
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow">
              We stand by you with our justice and client satisfaction-focused service approach.
            </p>
          </div>
        </div>
      </section>


      {/* Mission & Vision */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 -mt-16 md:-mt-24 lg:-mt-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-border">
            <CardContent className="p-8 lg:p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Target className="text-accent" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                We protect the rights of our clients at international standards while adhering to ethical values.
                In every case, we aim to produce strategic, reliable, and measurable solutions; providing proactive
                legal consulting not only during disputes but also before risks arise.
                By closely following technology and current case law, we advance processes transparently,
                and stand by our clients at every stage with swift communication and regular updates.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-border">
            <CardContent className="p-8 lg:p-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Award className="text-accent" size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                We work to be an innovative, reliable, and digitally-minded legal brand that adapts to the changing
                dynamics of law. By developing strategies tailored to each client's needs, we aim to be a
                regionally and nationally referenced law firm in our areas of expertise including commercial,
                corporate, real estate, criminal, employment, family, and contract law.
                With our transparent communication and swift resolution approach supported by technology,
                we are building a sustainable legal infrastructure that secures not just today, but the future.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Values */}
      <section className="py-20 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-balance">Our Values</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Our working principles and core values
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                  <Scale className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Justice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The rule of law and the principle of fairness form the foundation of all our processes.
                  We aim to reach the most accurate outcome through impartial, careful, and objective evaluations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                  <Users className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Trust</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Confidentiality and transparency are essential. We manage your cases with regular updates,
                  open communication, and documented approval processes; planning every step together.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                  <Award className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">Professionalism</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Expertise, preparation, and timely response are our principles. We follow current legislation
                  and provide flawless, swift process management with technology and documentation standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-center text-balance">Our Story</h2>
            <div className="prose prose-lg max-w-none">

              <p className="text-muted-foreground leading-relaxed text-lg">
                Taş Law Firm & Consulting & Mediation was founded on the approach that sees law not merely
                as a profession, but as a defense of justice and a social responsibility.
                Founder Av. Kadir Taş&apos;s principle of &ldquo;every case affects a life&rdquo; continues to form the
                foundation of our working culture today.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg">
                Our firm serves with a team that has deepened expertise in many areas including criminal,
                family, commercial, employment, contract, and administrative law.
                Since each client&apos;s situation is unique, we carefully analyze processes, develop
                personalized strategies, and aim for the most effective protection of rights.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg">
                Trust-based relationships, transparent communication, and accurate information are
                indispensable for us. We accompany our clients throughout the legal process and
                provide strong and clear guidance at every stage.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg">
                By effectively utilizing technology, we produce fast, accessible, and solution-oriented
                services; handling every case with meticulous care. Our goal is not only to resolve
                current disputes, but also to foresee potential future risks and create a secure
                legal roadmap for our clients.
              </p>

              <p className="text-muted-foreground leading-relaxed text-lg">
                Today, Taş Law Firm & Consulting & Mediation is a trusted legal brand with growing
                experience and an unwavering commitment to its principles. Justice, ethics, and
                client satisfaction will always remain at the center of our journey.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-balance">
              Experience the Taş Law Firm Difference
            </h2>
            <p className="text-xl text-primary-foreground/90 text-pretty leading-relaxed">
              Let our experienced team provide the strategic legal counsel you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="secondary" className="text-base px-8">
                <Link href="/en/appointment">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/en/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}