"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, ChevronDown } from "lucide-react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

// Navigation configuration per locale
const NAV_CONFIG = {
  tr: {
    home: { href: "/tr", label: "Anasayfa" },
    links: [
      { href: "/tr/hakkimizda", label: "Hakkımızda" },
      {
        href: "/tr/calisma-alanlari",
        label: "Çalışma Alanları",
        subLinks: [
          { href: "/tr/calisma-alanlari/is-hukuku", label: "İş Hukuku" },
          { href: "/tr/calisma-alanlari/ceza-hukuku", label: "Ceza Hukuku" },
          { href: "/tr/calisma-alanlari/aile-hukuku", label: "Aile Hukuku" },
          { href: "/tr/calisma-alanlari/gayrimenkul-hukuku", label: "Gayrimenkul Hukuku" },
          { href: "/tr/calisma-alanlari/miras-hukuku", label: "Miras Hukuku" },
          { href: "/tr/calisma-alanlari/ticaret-hukuku", label: "Ticaret Hukuku" },
        ]
      },
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
      {
        href: "/en/practice-areas",
        label: "Practice Areas",
        subLinks: [
          { href: "/en/practice-areas/corporate", label: "Corporate Law" },
          { href: "/en/practice-areas/litigation", label: "Litigation" },
          { href: "/en/practice-areas/employment", label: "Employment Law" },
          { href: "/en/practice-areas/real-estate", label: "Real Estate" },
          { href: "/en/practice-areas/intellectual-property", label: "Intellectual Property" },
          { href: "/en/practice-areas/estate-planning", label: "Estate Planning" },
        ]
      },
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
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Detect locale from pathname
  const locale = pathname.startsWith("/en") ? "en" : "tr"
  const nav = (NAV_CONFIG as any)[locale]

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
            {nav.links.map((link: any) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1 ${isActive(link.href)
                    ? "text-foreground bg-secondary/60"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  {link.label}
                  {link.subLinks && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
                </Link>

                {link.subLinks && (
                  <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-background border border-border rounded-lg shadow-xl overflow-hidden py-2 backdrop-blur-lg">
                      {link.subLinks.map((sub: any) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${pathname === sub.href
                            ? "text-accent bg-accent/5 font-medium"
                            : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                            }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
          <div className="lg:hidden py-6 space-y-2 border-t border-border animate-menu-open bg-background/98 backdrop-blur-lg overflow-y-auto max-h-[calc(100vh-80px)]">
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
            {nav.links.map((link: any, index: number) => (
              <div key={link.href} className="space-y-1">
                <div className="flex items-center px-4">
                  <Link
                    href={link.href}
                    className={`flex-1 py-3 px-4 text-base font-medium rounded-l-md transition-all text-center animate-menu-item ${index === 0 ? "delay-100" : index === 1 ? "delay-150" : index === 2 ? "delay-200" : "delay-300"
                      } ${isActive(link.href)
                        ? "text-foreground bg-secondary/60"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary/50 active:scale-95"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.subLinks && (
                    <button
                      onClick={() => setMobileSubMenuOpen(mobileSubMenuOpen === link.href ? null : link.href)}
                      className="p-3 bg-secondary/30 rounded-r-md border-l border-border"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${mobileSubMenuOpen === link.href ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {link.subLinks && mobileSubMenuOpen === link.href && (
                  <div className="bg-secondary/20 mx-4 rounded-md py-1 animate-fade-in">
                    {link.subLinks.map((sub: any) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block py-2.5 px-4 text-sm text-center transition-all ${pathname === sub.href
                          ? "text-accent font-medium"
                          : "text-foreground/70 hover:text-foreground"
                          }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 px-4 space-y-3 animate-menu-item delay-400">
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
