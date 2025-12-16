'use client'

import { usePathname } from "next/navigation"
import { SITE_CONFIG } from "@/lib/constants"

export function FloatingContact() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  const phoneDigits = (SITE_CONFIG.phone || "").replace(/\D/g, "")
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
          <span className="wa-tooltip">Bize Ulaşın</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
          />
        </a>
      ) : null}
    </>
  )
}

