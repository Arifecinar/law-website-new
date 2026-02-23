import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, BookOpen, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getArticles, getCategories } from "@/lib/db/queries"
import type { Metadata } from "next"

// Canonical domain - www yok, https var
const CANONICAL_BASE = "https://taslawfirm.com.tr"

export const metadata: Metadata = {
  title: "Makaleler",
  description:
    "Hukuki konularda bilgilendirici makaleler: İş, Ceza, Aile, Gayrimenkul, Miras ve Ticaret Hukuku.",
  keywords: ["hukuk makaleleri", "hukuki bilgi", "avukat yazıları", "hukuk haberleri", "yasal mevzuat", "İzmir avukat"],
  alternates: {
    canonical: `${CANONICAL_BASE}/tr/makaleler`,
    languages: {
      "tr": `${CANONICAL_BASE}/tr/makaleler`,
      "en": `${CANONICAL_BASE}/en/articles`,
      "x-default": `${CANONICAL_BASE}/tr/makaleler`,
    },
  },
  openGraph: {
    type: "website",
    title: "Makaleler",
    description:
      "Hukuki konularda bilgilendirici makaleler: İş, Ceza, Aile, Gayrimenkul, Miras ve Ticaret Hukuku.",
  },
  twitter: {
    card: "summary",
    title: "Makaleler",
    description:
      "Hukuki konularda bilgilendirici makaleler: İş, Ceza, Aile, Gayrimenkul, Miras ve Ticaret Hukuku.",
  },
}

// Fallback kategoriler - veritabanında kategori yoksa bunları göster
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Genel", slug: "genel", parent_id: null },
  { id: 2, name: "İş Hukuku", slug: "is-hukuku", parent_id: null },
  { id: 3, name: "Ceza Hukuku", slug: "ceza-hukuku", parent_id: null },
  { id: 4, name: "Aile Hukuku", slug: "aile-hukuku", parent_id: null },
  { id: 5, name: "Gayrimenkul Hukuku", slug: "gayrimenkul-hukuku", parent_id: null },
  { id: 6, name: "Miras Hukuku", slug: "miras-hukuku", parent_id: null },
  { id: 7, name: "Ticaret Hukuku", slug: "ticaret-hukuku", parent_id: null },
  { id: 8, name: "Hukuk Haberleri", slug: "hukuk-haberleri", parent_id: null },
]

export default async function MakalelerPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>
}) {
  const data = (await getArticles()).filter((a: any) => a.published !== false)
  let allCategories = await getCategories()

  // Veritabanında kategori yoksa fallback kullan
  if (!allCategories || allCategories.length === 0) {
    allCategories = FALLBACK_CATEGORIES
  }

  const sp = await searchParams
  const q = (sp?.q || "").toString().trim()
  const selectedCat = (sp?.cat || "").toString().trim()
  const hasQuery = q.length > 0

  // Build category list with hierarchy
  // Separate "Genel" category from others
  const genelCategory = allCategories.find((cat: any) =>
    cat.slug === "genel" || cat.name.toLowerCase() === "genel"
  )
  const otherCategories = allCategories.filter((cat: any) =>
    cat.slug !== "genel" && cat.name.toLowerCase() !== "genel"
  )

  // Sort other categories by created_at (newest first) or id (newest first) as fallback
  const sortedOtherCategories = otherCategories.sort((a: any, b: any) => {
    // First try to sort by created_at (newest first)
    if (a.created_at && b.created_at) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    // Fallback to id (newest first)
    return (b.id || 0) - (a.id || 0)
  })

  // Build final category list: Tümü -> Genel -> Others
  const categories = [
    { id: 0, name: "Tümü", slug: "" },
    ...(genelCategory ? [{
      id: genelCategory.id,
      name: genelCategory.name,
      slug: genelCategory.slug,
      parent_id: genelCategory.parent_id,
    }] : []),
    ...sortedOtherCategories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      parent_id: cat.parent_id,
    })),
  ]

  // Türkçe karakterleri normalize eden fonksiyon
  function normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/İ/g, "i")
      .replace(/Ğ/g, "g")
      .replace(/Ü/g, "u")
      .replace(/Ş/g, "s")
      .replace(/Ö/g, "o")
      .replace(/Ç/g, "c")
  }

  let articles = data
  if (hasQuery) {
    const qNormalized = normalizeText(q)
    const qLower = q.toLowerCase()

    articles = articles.filter((a: any) => {
      const title = (a.title || "").toString()
      const excerpt = (a.excerpt || "").toString()
      const content = (a.content || "").toString()
      const category = (a.category || "").toString()

      // Normal arama (küçük harf)
      const titleLower = title.toLowerCase()
      const excerptLower = excerpt.toLowerCase()
      const contentLower = content.toLowerCase()
      const categoryLower = category.toLowerCase()

      // Normalize edilmiş arama (Türkçe karaktersiz)
      const titleNorm = normalizeText(title)
      const excerptNorm = normalizeText(excerpt)
      const contentNorm = normalizeText(content)
      const categoryNorm = normalizeText(category)

      // Her iki yöntemle de ara
      return (
        titleLower.includes(qLower) ||
        excerptLower.includes(qLower) ||
        contentLower.includes(qLower) ||
        categoryLower.includes(qLower) ||
        titleNorm.includes(qNormalized) ||
        excerptNorm.includes(qNormalized) ||
        contentNorm.includes(qNormalized) ||
        categoryNorm.includes(qNormalized)
      )
    })
  } else if (selectedCat) {
    // Seçilen kategoriyi bul
    const selectedCategory = allCategories.find((c: any) => c.slug === selectedCat)

    // Seçilen kategorinin tüm alt kategorilerinin ID'lerini bul
    const getCategoryAndChildIds = (parentSlug: string): number[] => {
      const parent = allCategories.find((c: any) => c.slug === parentSlug)
      if (!parent) return []

      const ids = [parent.id]
      // Alt kategorileri bul
      const children = allCategories.filter((c: any) => c.parent_id === parent.id)
      children.forEach((child: any) => {
        ids.push(child.id)
        // Alt kategorilerin de alt kategorilerini bul (recursive)
        const grandChildren = allCategories.filter((c: any) => c.parent_id === child.id)
        grandChildren.forEach((gc: any) => ids.push(gc.id))
      })

      return ids
    }

    const validCategoryIds = getCategoryAndChildIds(selectedCat)

    // Hem category_id hem de eski category text alanını destekle
    articles = articles.filter((a: any) => {
      // Önce category_id'ye bak (ana kategori + alt kategoriler dahil)
      if (a.category_id && validCategoryIds.includes(a.category_id)) {
        return true
      }
      // Sonra eski category text alanına bak (backward compatibility)
      if (a.category) {
        const categoryText = a.category.toLowerCase()
          .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
          .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
          .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        return categoryText === selectedCat || a.category.toLowerCase().includes(selectedCat.replace(/-/g, " "))
      }
      return false
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Compact header (no large hero) */}
      <section className="pt-28 pb-4">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-light">Makaleler</h1>
              {hasQuery && (
                <p className="text-sm text-muted-foreground mt-1">
                  "{q}" için {articles.length} sonuç bulundu
                </p>
              )}
            </div>
            <div className="w-full max-w-sm">
              <form className="relative flex gap-2" method="get" action="/tr/makaleler">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input name="q" defaultValue={q} placeholder="Makalelerde ara..." className="pl-9" />
                </div>
                <Button type="submit" size="sm" variant="default">
                  Ara
                </Button>
                {hasQuery && (
                  <Button asChild size="sm" variant="outline">
                    <Link href="/tr/makaleler">Temizle</Link>
                  </Button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 -mt-4 md:-mt-6">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Categories row */}
          {!hasQuery && (
            <div className="flex items-center gap-2 flex-wrap mb-8">
              {categories
                .filter((cat: any) => !cat.parent_id || cat.parent_id === null || cat.id === 0)
                .map((cat: any) => {
                  const isActive = cat.slug === selectedCat || (cat.id === 0 && !selectedCat)
                  const href = cat.slug ? `/tr/makaleler?cat=${encodeURIComponent(cat.slug)}` : "/tr/makaleler"
                  return (
                    <Link
                      key={cat.id}
                      href={href}
                      className={
                        "px-3 py-1.5 rounded-full border text-sm transition-colors " +
                        (isActive
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-background text-foreground border-border hover:bg-secondary/50")
                      }
                      aria-current={isActive ? "true" : undefined}
                    >
                      {cat.name}
                    </Link>
                  )
                })}
            </div>
          )}

          {articles.length === 0 ? (
            <div className="text-center py-20">
              {hasQuery ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">"{q}" araması için sonuç bulunamadı.</p>
                  <Button asChild variant="outline">
                    <Link href="/tr/makaleler">Tüm Makalelere Dön</Link>
                  </Button>
                </div>
              ) : selectedCat ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">Bu kategoride henüz makale bulunmuyor.</p>
                  <Button asChild variant="outline">
                    <Link href="/tr/makaleler">Tüm Makalelere Dön</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">Henüz yayınlanmış makale bulunmuyor.</p>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => {
                const image = article.image_url || "/placeholder.svg"
                // Önce category_id'den kategori bul, yoksa eski category text kullan
                const categoryObj = article.category_id
                  ? allCategories.find((c: any) => c.id === article.category_id)
                  : null
                const category = categoryObj?.name || article.category || "Genel"
                const author = article.author || "Taş Hukuk"
                const dateSrc = article.published_at || article.created_at
                const dateText = dateSrc ? new Date(dateSrc).toLocaleDateString("tr-TR") : ""
                return (
                  <Card
                    key={article.id}
                    className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-secondary/20">
                      <Image
                        src={image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300"

                      />
                    </div>


                    <CardContent className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                          <span className="text-xs font-medium text-accent">{category}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-serif font-semibold mb-4 group-hover:text-accent transition-colors break-words line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-6 flex-1 break-words text-pretty line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{dateText}</span>
                          </div>
                        </div>

                        <Link
                          href={`/tr/makaleler/${article.slug}`}
                          className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all"
                        >
                          Devamını Oku
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Daha fazla makale yakında eklenecektir.</p>
            <Button asChild variant="outline" size="lg" className="border-2 bg-transparent">
              <Link href="/tr/iletisim">
                Soru Sormak İster misiniz?
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto border-2 border-accent/20">
              <BookOpen className="text-accent" size={36} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-balance">Hukuki Bilgi Bankası</h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Makalelerimiz, hukuki konularda bilgilenmeniz ve haklarınızı öğrenmeniz için hazırlanmıştır. Kişisel
              durumunuz için mutlaka uzman bir avukata danışmanızı öneririz.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/tr/online-randevu">
                Hukuki Danışmanlık Alın
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}