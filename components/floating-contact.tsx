'use client'

import { usePathname } from "next/navigation"
import { SITE_CONFIG } from "@/lib/constants"
import { Phone, MessageCircle } from "lucide-react"

export function FloatingContact() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  const phoneDigits = (SITE_CONFIG.phone || "").replace(/\D/g, "")
  const telHref = phoneDigits ? `tel:+${phoneDigits}` : undefined
  const whatsappHref = phoneDigits
    ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent("Merhaba bilgi almak istiyorum")}`
    : undefined

  return (
    <>
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          aria-label="WhatsApp ile iletişime geç"
        >
          <span className="wa-tooltip">Bize Yazın</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
        </a>
      ) : null}
      {telHref ? (
        <a
          href={telHref}
          className="call-btn"
          aria-label="Bizi Arayın"
        >
          <span className="call-tooltip">Bizi Arayın</span>
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28" aria-hidden="true">
            <path d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.5c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4.5c0-.6.4-1 1-1H7.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"/>
          </svg>
        </a>
      ) : null}
    </>
  )
}

