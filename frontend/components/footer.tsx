import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
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
              Av. Kadir Taş Hukuk Bürosu olarak, müvekkillerimize en kaliteli hukuki hizmeti sunmak için çalışıyoruz.
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

          {/* Çalışma Alanları */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Çalışma Alanları</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link href="/calisma-alanlari" className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">İş Hukuku</Link>
              </li>
              <li>
                <Link href="/calisma-alanlari" className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Ceza Hukuku</Link>
              </li>
              <li>
                <Link href="/calisma-alanlari" className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Aile Hukuku</Link>
              </li>
              <li>
                <Link href="/calisma-alanlari" className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Gayrimenkul Hukuku</Link>
              </li>
              <li>
                <Link href="/calisma-alanlari" className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Miras Hukuku</Link>
              </li>
              <li>
                <Link href="/calisma-alanlari" className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Ticaret Hukuku</Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Hızlı Linkler</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/makaleler"
                  className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Makaleler
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href="/online-randevu"
                  className="text-xs sm:text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Online Randevu
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1 space-y-3 md:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider">İletişim</h4>
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
              © {new Date().getFullYear()} Av. Kadir Taş Hukuk Bürosu. Tüm hakları saklıdır.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="/gizlilik-politikasi"
                className="text-xs sm:text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="text-xs sm:text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}