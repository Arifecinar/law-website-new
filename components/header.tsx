"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

// Navigation configuration per locale
const NAV_CONFIG = {
  tr: {
    home: { href: "/tr", label: "Anasayfa" },
    links: [
      { href: "/tr/hakkimizda", label: "Hakkımızda" },
      { href: "/tr/calisma-alanlari", label: "Çalışma Alanları" },
      { href: "/tr/makaleler", label: "Makaleler" },
      { href: "/tr/iletisim", label: "İletişim" },
    ],
    cta: { href: "/tr/online-randevu", label: "Online Randevu" },
    adminLabel: "Avukat girişi",
    menuAriaLabel: "Menüyü aç/kapat",
  },
  en: {
    home: { href: "/en", label: "Home" },
    links: [
      { href: "/en/about", label: "About" },
      { href: "/en/practice-areas", label: "Practice Areas" },
      { href: "/en/articles", label: "Articles" },
      { href: "/en/contact", label: "Contact" },
    ],
    cta: { href: "/en/appointment", label: "Appointment" },
    adminLabel: "Attorney Login",
    menuAriaLabel: "Toggle menu",
  },
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Detect locale from pathname
  const locale = pathname.startsWith("/en") ? "en" : "tr"
  const nav = NAV_CONFIG[locale]

  const isActive = (href: string) => pathname === href || (href !== nav.home.href && pathname.startsWith(href))

  // Language switcher: map current path to the other locale
  const switchLocale = locale === "tr" ? "en" : "tr"
  const switchLabel = locale === "tr" ? "EN" : "TR"
  const switchHref = locale === "tr"
    ? pathname.replace(/^\/tr/, "/en")
      .replace("/hakkimizda", "/about")
      .replace("/iletisim", "/contact")
      .replace("/makaleler", "/articles")
      .replace("/calisma-alanlari", "/practice-areas")
      .replace("/online-randevu", "/appointment")
      .replace("/av-kadir-tas", "/about")
    : pathname.replace(/^\/en/, "/tr")
      .replace("/about", "/hakkimizda")
      .replace("/contact", "/iletisim")
      .replace("/articles", "/makaleler")
      .replace("/practice-areas", "/calisma-alanlari")
      .replace("/appointment", "/online-randevu")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={nav.home.href} className="inline-block" onClick={(e) => { if (pathname === nav.home.href) { e.preventDefault(); router.refresh() } }}>
            <img
              src="/tas_hukuk_logo.png"
              alt="Taş Hukuk Logo"
              width={100}
              height={100}
              className="w-40 md:w-48 h-auto object-contain"
              loading="eager"
            />
          </Link>


          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href={nav.home.href}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${isActive(nav.home.href)
                ? "text-foreground bg-secondary/60"
                : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                }`}
              onClick={(e) => { if (pathname === nav.home.href) { e.preventDefault(); router.refresh() } }}
            >
              {nav.home.label}
            </Link>
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${isActive(link.href)
                  ? "text-foreground bg-secondary/60"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {/* Language Switcher */}
            <Link
              href={switchHref}
              className="px-3 py-1.5 text-xs font-semibold rounded-md border border-border hover:bg-secondary/50 transition-all uppercase tracking-wider"
              title={switchLocale === "en" ? "Switch to English" : "Türkçe'ye geç"}
            >
              {switchLabel}
            </Link>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              <Link href={nav.cta.href}>{nav.cta.label}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
            >
              <Link href="/admin/login" title={nav.adminLabel} aria-label={nav.adminLabel}>
                <User size={18} />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:bg-secondary/50 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={nav.menuAriaLabel}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu with animations */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-2 border-t border-border text-center animate-menu-open bg-background/98 backdrop-blur-lg">
            <Link
              href={nav.home.href}
              className={`block py-3 px-4 text-base font-medium rounded-md transition-all text-center animate-menu-item delay-75 ${isActive(nav.home.href)
                ? "text-foreground bg-secondary/60"
                : "text-foreground/70 hover:text-foreground hover:bg-secondary/50 active:scale-95"
                }`}
              onClick={(e) => { if (pathname === nav.home.href) { e.preventDefault(); router.refresh() } setMobileMenuOpen(false) }}
            >
              {nav.home.label}
            </Link>
            {nav.links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 text-base font-medium rounded-md transition-all text-center animate-menu-item ${index === 0 ? "delay-100" : index === 1 ? "delay-150" : index === 2 ? "delay-200" : "delay-300"
                  } ${isActive(link.href)
                    ? "text-foreground bg-secondary/60"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50 active:scale-95"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3 animate-menu-item delay-400">
              {/* Mobile Language Switcher */}
              <Link
                href={switchHref}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-4 text-sm font-semibold text-center border border-border rounded-md hover:bg-secondary/50 transition-all uppercase tracking-wider"
              >
                {switchLocale === "en" ? "🇬🇧 English" : "🇹🇷 Türkçe"}
              </Link>
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 btn-hover-scale shadow-lg">
                <Link href={nav.cta.href} onClick={() => setMobileMenuOpen(false)}>
                  {nav.cta.label}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)} title={nav.adminLabel} aria-label={nav.adminLabel}>
                  {nav.adminLabel}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
