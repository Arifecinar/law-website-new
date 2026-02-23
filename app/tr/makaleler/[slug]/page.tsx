import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import Script from "next/script"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getArticleBySlug, getArticles, getCategories } from "@/lib/db/queries"
import { ShareButton } from "@/components/share-button"
import { SITE_CONFIG } from "@/lib/constants"

export default async function MakaleDetayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) {
    notFound()
  }

  // Kategori adını veritabanından çek
  const allCategories = await getCategories()
  const categoryObj = article.category_id
    ? allCategories.find((c: any) => c.id === article.category_id)
    : null
  const categoryName = categoryObj?.name || article.category || "Genel"

  const dateSrc = article.published_at || article.created_at
  const dateText = dateSrc ? new Date(dateSrc).toLocaleDateString("tr-TR") : ""
  const related = (await getArticles())
    .filter((a: any) => a.published !== false && a.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Image */}
      <section className="relative pt-32 pb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/tr/makaleler" className="inline-flex items-center text-accent hover:text-accent/80 mb-8 group">
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Makalelere Dön
            </Link>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-accent/10 rounded-full border border-accent/20">
                  <span className="text-sm font-medium text-accent">{categoryName}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance leading-tight break-words">
                {article.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t">
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{dateText}</span>
                  </div>
                </div>

                <ShareButton title={article.title} text={article.excerpt || undefined} className="gap-2 bg-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* SEO: Article JSON-LD */}
        <Script
          id="ld-json-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.excerpt || SITE_CONFIG.description,
              image: article.image_url ? [article.image_url] : undefined,
              datePublished: article.published_at || article.created_at,
              dateModified: article.updated_at || article.published_at || article.created_at,
              author: article.author
                ? { "@type": "Person", name: article.author }
                : { "@type": "Organization", name: SITE_CONFIG.name },
              publisher: {
                "@type": "Organization",
                name: SITE_CONFIG.name,
                logo: {
                  "@type": "ImageObject",
                  url: "/tas_hukuk_logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://taslawfirm.com.tr"}/tr/makaleler/${article.slug}`,
              },
            }),
          }}
        />
        <Script
          id="ld-json-breadcrumb-tr"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Ana Sayfa",
                  item: process.env.NEXT_PUBLIC_SITE_URL || "https://taslawfirm.com.tr",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Makaleler",
                  item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://taslawfirm.com.tr"}/tr/makaleler`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: article.title,
                  item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://taslawfirm.com.tr"}/tr/makaleler/${article.slug}`,
                },
              ],
            }),
          }}
        />

        {/* Article Image */}
        <div className="container mx-auto px-4 lg:px-8 mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border-2 border-border">
              <Image
                src={(article as any).image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none break-words
                prose-headings:font-serif prose-headings:font-light
                prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-muted-foreground
                prose-strong:text-foreground prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-secondary/30 rounded-2xl border-2 border-border">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-serif font-semibold">Hukuki Danışmanlığa İhtiyacınız mı Var?</h3>
                <p className="text-muted-foreground">
                  Bu makale genel bilgilendirme amaçlıdır. Kişisel durumunuz için uzman görüşü almak isterseniz, bizimle
                  iletişime geçebilirsiniz.
                </p>
                <div className="flex gap-4 justify-center flex-wrap pt-4">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/tr/online-randevu">Online Randevu Al</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 bg-transparent">
                    <Link href="/tr/iletisim">İletişime Geç</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 text-center">İlgili Makaleler</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((relatedArticle: any) => (
                <Link key={relatedArticle.id} href={`/tr/makaleler/${relatedArticle.slug}`} className="group">
                  <div className="border-2 border-border rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300 h-[420px]">
                    <div className="relative h-48 bg-secondary/20">
                      <Image
                        src={relatedArticle.image_url || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="px-3 py-1 bg-accent/10 rounded-full border border-accent/20 inline-block mb-3">
                        <span className="text-xs font-medium text-accent">{relatedArticle.category || "Genel"}</span>
                      </div>
                      <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{relatedArticle.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const base = "https://taslawfirm.com.tr"
  if (!article) {
    return {
      title: "Makale",
      description: SITE_CONFIG.description,
      alternates: {
        canonical: `${base}/tr/makaleler/${slug}`,
        languages: {
          "tr": `${base}/tr/makaleler/${slug}`,
          "en": `${base}/en/articles/${slug}`,
          "x-default": `${base}/tr/makaleler/${slug}`,
        },
      },
    }
  }
  const title = article.title
  const description = article.excerpt || SITE_CONFIG.description
  const url = `${base}/tr/makaleler/${article.slug}`
  const image = article.image_url || "/placeholder.jpg"
  const published = article.published_at || article.created_at
  const author = article.author || SITE_CONFIG.name

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "tr": `${base}/tr/makaleler/${article.slug}`,
        "en": `${base}/en/articles/${article.slug}`,
        "x-default": `${base}/tr/makaleler/${article.slug}`,
      },
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: image ? [image] : undefined,
      locale: "tr_TR",
      siteName: "Taş Hukuk",
      publishedTime: published || undefined,
      authors: [author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
