import { Header } from "@/components/header"
import { Footer } from "@/frontend/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Scale, Briefcase, Users, Award, Shield, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Suspense } from "react"
import { getArticles, getCategories } from "@/lib/db/queries"
import { ScrollReveal } from "@/components/scroll-reveal"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Taş Hukuk & Danışmanlık - İzmir",
  description:
    "İş, ceza, aile, miras, ticaret ve gayrimenkul hukuku alanlarında uzman avukatlık ve danışmanlık.",
  keywords: [
    "izmir avukat",
    "hukuk bürosu izmir",
    "iş hukuku avukatı",
    "ceza avukatı izmir",
    "aile hukuku",
    "gayrimenkul avukatı",
    "miras hukuku",
    "ticaret hukuku",
  ],
  alternates: {
    canonical: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/",
  },
  openGraph: {
    type: "website",
    title: "Taş Hukuk & Danışmanlık",
    description:
      "İş, ceza, aile, miras, ticaret ve gayrimenkul hukuku alanlarında uzman avukatlık ve danışmanlık.",
    images: ["/law-firm-hero-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taş Hukuk & Danışmanlık",
    description:
      "İş, ceza, aile, miras, ticaret ve gayrimenkul hukuku alanlarında uzman avukatlık ve danışmanlık.",
    images: ["/law-firm-hero-image.jpg"],
  },
}
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="relative mt-20 min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] flex items-center justify-center py-12 md:py-0 pb-16 md:pb-24 lg:pb-36 overflow-hidden">

  {/* Arka plan görseli with Ken Burns effect */}
  <Image
    src="/law-firm-hero-image.jpg"
    alt="Taş Hukuk & Danışmanlık Hero"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center animate-kenburns"
  />

  {/* Koyu overlay – yazıyı görünür yapan kısım */}
  <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

  {/* İçerik */}
  <div className="relative z-10 flex items-center justify-center h-full w-full">
    <div className="text-center max-w-4xl mx-auto px-5 md:px-6">
      <div className="inline-block px-4 py-2 bg-white/10 rounded-full border border-white/30 mb-5 md:mb-6 backdrop-blur-sm animate-fade-in-down">
        <span className="text-xs sm:text-sm font-medium text-white tracking-wide">
          Profesyonel Hukuki Danışmanlık
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-semibold text-white text-balance leading-[1.1] md:leading-[1.05] tracking-tight animate-fade-in-up delay-100 drop-shadow-2xl">
        Haklarınızı En İyi Şekilde Korumanın Etkili Çözümleri
      </h1>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-pretty leading-relaxed max-w-3xl mx-auto animate-fade-in-up delay-200 drop-shadow-md mt-4 md:mt-6 px-2">
        Yasal sorunlarınıza etkili ve hızlı çözümler sunuyoruz.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 md:pt-8 px-4 sm:px-0">
        {/* Ana buton */}
        <Button
          asChild
          size="lg"
          className="bg-[#7A2420] text-white hover:bg-[#8A2B26] text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 shadow-lg hover:shadow-2xl transition-all animate-fade-in-up delay-300 btn-hover-scale animate-glow"
        >
          <Link href="/online-randevu">
            Hemen Randevu Alın
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </Button>

        {/* İkincil buton */}
        <Button
          asChild
          size="lg"
          variant="outline"
          className="text-white border-white text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 border-2 bg-transparent hover:bg-white hover:text-black transition-all animate-fade-in-up delay-400"
        >
          <Link href="/calisma-alanlari">
            Çalışma Alanlarımız
          </Link>
        </Button>
      </div>
    </div>
  </div>

  {/* Scroll indicator for mobile */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-subtle hidden sm:block">
    <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
      <div className="w-1.5 h-2.5 bg-white/60 rounded-full animate-fade-in" />
    </div>
  </div>
</section>


      

      {/* Son Makaleler */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-8 md:mb-12 space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-balance">Son Makaleler</h2>
            <p className="text-base md:text-lg text-muted-foreground">Güncel hukuki içeriklerden öne çıkanlar</p>
          </ScrollReveal>

          <Suspense fallback={<div className="text-center text-muted-foreground py-12">Yükleniyor...</div>}>
            <LatestArticles />
          </Suspense>

          <ScrollReveal delay={400} className="text-center mt-8 md:mt-10">
            <Button asChild variant="outline" size="lg" className="border-2 bg-transparent btn-hover-scale">
              <Link href="/makaleler">
                Tüm Makaleler
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-10 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance">Çalışma Alanlarımız</h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed px-4">
              Geniş yelpazede hukuki danışmanlık ve dava takibi hizmetleri sunuyoruz
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <ScrollReveal delay={0}>
              <Card className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group card-hover-lift h-full">
                <CardContent className="p-6 md:p-8 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                    <Briefcase className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">İş Hukuku</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    İşçi ve işveren haklarının korunması, iş sözleşmeleri, tazminat davaları ve iş kazaları konularında
                    uzman hukuki destek.
                  </p>
                  <Link
                    href="/calisma-alanlari"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base"
                  >
                    Detaylı Bilgi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Card className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group card-hover-lift h-full">
                <CardContent className="p-6 md:p-8 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                    <Scale className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">Ceza Hukuku</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Ceza davalarında savunma, suç duyuruları, şikayetler ve ceza hukuku kapsamındaki tüm hukuki süreçlerde
                    profesyonel temsil.
                  </p>
                  <Link
                    href="/calisma-alanlari"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base"
                  >
                    Detaylı Bilgi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group card-hover-lift h-full">
                <CardContent className="p-6 md:p-8 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                    <Users className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">Aile Hukuku</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Boşanma, velayet, nafaka, mal paylaşımı ve aile içi hukuki sorunların çözümünde deneyimli avukatlık
                    hizmeti.
                  </p>
                  <Link
                    href="/calisma-alanlari"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base"
                  >
                    Detaylı Bilgi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <Card className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group card-hover-lift h-full">
                <CardContent className="p-6 md:p-8 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                    <Shield className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">Gayrimenkul Hukuku</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Tapu işlemleri, kira sözleşmeleri, tahliye davaları ve gayrimenkul alım-satım süreçlerinde hukuki
                    danışmanlık.
                  </p>
                  <Link
                    href="/calisma-alanlari"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base"
                  >
                    Detaylı Bilgi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <Card className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group card-hover-lift h-full">
                <CardContent className="p-6 md:p-8 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                    <FileText className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">Miras Hukuku</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Miras paylaşımı, vasiyetname düzenleme, terekenin tespiti ve miras hukukundan kaynaklanan
                    uyuşmazlıkların çözümü.
                  </p>
                  <Link
                    href="/calisma-alanlari"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base"
                  >
                    Detaylı Bilgi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <Card className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group card-hover-lift h-full">
                <CardContent className="p-6 md:p-8 space-y-4 md:space-y-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors group-hover:scale-110 duration-300">
                    <Award className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold">Ticaret Hukuku</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Şirket kuruluşu, ticari sözleşmeler, ortaklık anlaşmazlıkları ve ticari alacak davalarında hukuki
                    destek.
                  </p>
                  <Link
                    href="/calisma-alanlari"
                    className="inline-flex items-center text-accent hover:text-accent/80 font-medium group-hover:gap-3 gap-2 transition-all text-sm md:text-base"
                  >
                    Detaylı Bilgi
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 bg-transparent text-foreground hover:bg-secondary/50 hover:text-foreground active:bg-secondary/60 active:text-foreground focus:text-foreground"
            >
              <Link href="/calisma-alanlari">
                Tüm Çalışma Alanları
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-10 md:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance">
              Neden Bizi Seçmelisiniz?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed px-4">
              Müvekkil memnuniyeti ve başarı odaklı çalışma prensibimizle fark yaratıyoruz
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            <ScrollReveal delay={0} className="text-center space-y-4 md:space-y-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto border-2 border-accent/20 group hover:bg-accent/20 transition-all duration-300 hover:scale-105">
                <Award className="text-accent animate-float" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold">Kanıtlanmış Başarı</h3>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Yılların deneyimi ve yüzlerce başarılı dava ile müvekkillerimize en iyi sonuçları sağlıyoruz.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} className="text-center space-y-4 md:space-y-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto border-2 border-accent/20 group hover:bg-accent/20 transition-all duration-300 hover:scale-105">
                <Users className="text-accent animate-float" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold">Müvekkil Odaklı</h3>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Her müvekkilimize özel çözümler üretir, hukuki süreçte yanınızda olur ve haklarınızı sonuna kadar
                savunuruz.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} className="text-center space-y-4 md:space-y-5 sm:col-span-2 md:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto border-2 border-accent/20 group hover:bg-accent/20 transition-all duration-300 hover:scale-105">
                <Scale className="text-accent animate-float" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold">Uzman Kadro</h3>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                Alanında uzman avukatlarımız ile her türlü hukuki konuda profesyonel danışmanlık ve temsil hizmeti
                sunuyoruz.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/legal-scales-pattern.jpg')] opacity-5 bg-cover bg-center" />
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-shift" style={{ backgroundSize: '200% 100%' }} />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <ScrollReveal className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance leading-tight">
              Hukuki Danışmanlığa İhtiyacınız mı Var?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 text-pretty leading-relaxed px-4">
              Deneyimli avukatlarımızla hemen iletişime geçin. Size özel çözümler üretelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 md:pt-6 px-4 sm:px-0">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 shadow-lg hover:shadow-xl transition-all btn-hover-scale"
              >
                <Link href="/online-randevu">
                  Online Randevu Al
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <Link href="/iletisim">Bize Ulaşın</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}

async function LatestArticles() {
  const data = await getArticles()
  const allCategories = await getCategories()
  
  const articles = (data || [])
    .filter((a: any) => a.published !== false)
    .slice(0, 3)

  if (!articles.length) {
    return (
      <div className="text-center text-muted-foreground">Henüz makale bulunmuyor.</div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article: any) => {
        const image = article.image_url || "/placeholder.svg"
        // Önce category_id ile veritabanından kategori adını bul, yoksa eski category alanını kullan
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
            className="border-2 border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden h-full"
          >
            <div className="relative h-52 w-full overflow-hidden bg-secondary/20 flex-shrink-0">
              <Image
                src={image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                  <span className="text-xs font-medium text-accent">{category}</span>
                </div>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-accent transition-colors break-words line-clamp-2">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-muted-foreground leading-relaxed mb-4 flex-1 break-words text-pretty line-clamp-3 text-sm">
                  {article.excerpt}
                </p>
              )}
              <div className="space-y-3 mt-auto">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{author}</span>
                    <span>{dateText}</span>
                </div>
                <Link
                  href={`/makaleler/${article.slug}`}
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
  )
}