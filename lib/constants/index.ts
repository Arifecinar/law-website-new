export const SITE_CONFIG = {
  name: "Av. Kadir Taş",
  title: "Av. Kadir Taş - Hukuk Bürosu",
  description: "Profesyonel hukuki danışmanlık ve dava takibi hizmetleri",
  phone: "+90 535 400 00 55",
  email: "av.kadir.tas@gmail.com",
  address: "Adalet Mah. Şehit Polis Fethi Sekin Cad. No.6 Ventus Tower, Bayraklı, İzmir 35530",
  addressShort: "İzmir",
  // Sosyal medya hesapları (gerçek URL eklendiğinde footer'da ve structured data'da görünür)
  socialMedia: {},
} as const

export const NAVIGATION_ITEMS = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Av. Kadir Taş", href: "/av-kadir-tas" },
  { label: "Çalışma Alanları", href: "/calisma-alanlari" },
  { label: "Makaleler", href: "/makaleler" },
  { label: "İletişim", href: "/iletisim" },
] as const
