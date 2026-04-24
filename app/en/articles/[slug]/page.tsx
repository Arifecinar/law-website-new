import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"
import { getArticleBySlug, getArticles } from "@/lib/db/queries"
import { SITE_CONFIG } from "@/lib/constants"

export const revalidate = 60

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Related articles for internal linking (SEO)
  const related = (await getArticles())
    .filter((a: any) => a.published !== false && a.slug !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Article Header */}
      <article className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/en/articles"
              className="inline-flex items-center text-accent hover:text-accent/80 font-medium mb-8"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to articles
            </Link>

            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider rounded">
                {article.category}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>
                    {new Date(article.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{article.read_time} min read</span>
                </div>
              </div>

              {article.author && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    By <span className="font-semibold text-foreground">{article.author}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="mt-12 prose prose-lg max-w-none">
              <div className="text-xl text-muted-foreground leading-relaxed mb-8">{article.excerpt}</div>
              <div
                className="space-y-6 text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 bg-secondary/30 rounded-2xl border-2 border-border text-center space-y-4">
              <h3 className="text-2xl font-serif font-semibold">Have Questions About This Topic?</h3>
              <p className="text-muted-foreground">
                Our experienced attorneys are here to provide personalized guidance.
              </p>
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/en/appointment">Schedule a Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 bg-transparent">
                  <Link href="/en/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SEO: Article JSON-LD */}
        <Script
          id="ld-json-article-en"
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.taslawfirm.com.tr"}/en/articles/${article.slug}`,
              },
            }),
          }}
        />
      </article>

      {/* Related Articles - SEO: Internal Linking */}
      {related.length > 0 && (
        <section className="py-16 lg:py-24 bg-secondary/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((relatedArticle: any) => (
                  <Link key={relatedArticle.id} href={`/en/articles/${relatedArticle.slug}`} className="group">
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
                          <span className="text-xs font-medium text-accent">{relatedArticle.category || "General"}</span>
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
      )}

      <Footer />
    </div>
  )
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const base = "https://www.taslawfirm.com.tr"
  if (!article) {
    return {
      title: "Article",
      description: SITE_CONFIG.description,
      alternates: {
        canonical: `${base}/en/articles/${slug}`,
      },
    }
  }
  const title = article.title
  const description = article.excerpt || SITE_CONFIG.description
  const url = `${base}/en/articles/${article.slug}`
  const image = article.image_url || "/placeholder.jpg"
  const published = article.published_at || article.created_at
  const author = article.author || SITE_CONFIG.name

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: image ? [image] : undefined,
      locale: "en_US",
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