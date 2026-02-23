"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { usePathname } from "next/navigation"

// Footer navigation configuration per locale
const FOOTER_CONFIG = {
  tr: {
    description: "Av. Kadir Taş Hukuk Bürosu olarak, müvekkillerimize en kaliteli hukuki hizmeti sunmak için çalışıyoruz.",
    practiceAreasTitle: "Çalışma Alanları",
    practiceAreas: [
      { href: "/tr/calisma-alanlari/is-hukuku", label: "İş Hukuku" },
      { href: "/tr/calisma-alanlari/ceza-hukuku", label: "Ceza Hukuku" },
      { href: "/tr/calisma-alanlari/aile-hukuku", label: "Aile Hukuku" },
      { href: "/tr/calisma-alanlari/gayrimenkul-hukuku", label: "Gayrimenkul Hukuku" },
      { href: "/tr/calisma-alanlari/miras-hukuku", label: "Miras Hukuku" },
      { href: "/tr/calisma-alanlari/ticaret-hukuku", label: "Ticaret Hukuku" },
    ],
    quickLinksTitle: "Hızlı Linkler",
    quickLinks: [
      { href: "/tr/hakkimizda", label: "Hakkımızda" },
      { href: "/tr/makaleler", label: "Makaleler" },
      { href: "/tr/iletisim", label: "İletişim" },
      { href: "/tr/online-randevu", label: "Online Randevu" },
    ],
    contactTitle: "İletişim",
    copyright: `© ${new Date().getFullYear()} Av. Kadir Taş Hukuk Bürosu. Tüm hakları saklıdır.`,
  },
  en: {
    description: "At Taş Law Firm, we work to provide our clients with the highest quality legal services.",
    practiceAreasTitle: "Practice Areas",
    practiceAreas: [
      { href: "/en/practice-areas/employment", label: "Employment Law" },
      { href: "/en/practice-areas/corporate", label: "Corporate Law" },
      { href: "/en/practice-areas/litigation", label: "Litigation" },
      { href: "/en/practice-areas/real-estate", label: "Real Estate" },
      { href: "/en/practice-areas/estate-planning", label: "Estate Planning" },
      { href: "/en/practice-areas/intellectual-property", label: "Intellectual Property" },
    ],
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { href: "/en/about", label: "About Us" },
      { href: "/en/articles", label: "Articles" },
      { href: "/en/contact", label: "Contact" },
      { href: "/en/appointment", label: "Appointment" },
    ],
    contactTitle: "Contact",
    copyright: `© ${new Date().getFullYear()} Taş Law Firm. All rights reserved.`,
  },
}

export function Footer() {
  const pathname = usePathname()
  const locale = pathname.startsWith("/en") ? "en" : "tr"
  const config = FOOTER_CONFIG[locale]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href={locale === "en" ? "/en" : "/tr"} className="inline-block">
              <Image
                src="/tas_hukuk_logo.png"
                alt="Taş Hukuk Logo"
                width={160}
                height={48}
                priority
                className="w-32 sm:w-40 md:w-48 h-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
              {config.description}
            </p>
            <div className="flex space-x-4">
              <span className="text-primary-foreground/60 hover:text-primary-foreground transition-colors cursor-pointer">
                <Linkedin size={18} />
              </span>
              <span className="text-primary-foreground/60 hover:text-primary-foreground transition-colors cursor-pointer">
                <Twitter size={18} />
              </span>
              <span className="text-primary-foreground/60 hover:text-primary-foreground transition-colors cursor-pointer">
                <Facebook size={18} />
              </span>
              <span className="text-primary-foreground/60 hover:text-primary-foreground transition-colors cursor-pointer">
                <Instagram size={18} />
              </span>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">{config.practiceAreasTitle}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {config.practiceAreas.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">{config.quickLinksTitle}</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {config.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-3 md:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">{config.contactTitle}</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-primary-foreground/50" />
                <span className="leading-relaxed">
                  Adalet Mah. Şehit Polis Fethi Sekin Cad. No.6 Ventus Tower
                  <br />
                  Bayraklı, İzmir 35530
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 text-primary-foreground/50" />
                <a href="tel:+905354000055" className="hover:text-primary-foreground transition-colors">
                  +90 535 400 00 55
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 text-primary-foreground/50" />
                <a href="mailto:av.kadir.tas@gmail.com" className="hover:text-primary-foreground transition-colors break-all">
                  av.kadir.tas@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-primary-foreground/50 text-center md:text-left">
              {config.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}