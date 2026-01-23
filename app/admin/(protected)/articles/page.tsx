import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { getArticles, getCategories } from "@/lib/db/queries"
import { CategoryManager } from "@/components/admin/category-manager"
import { ArticleDeleteButton } from "@/components/admin/article-delete-button"

export const dynamic = "force-dynamic"

export default async function AdminArticlesPage() {
  const articles = await getArticles()
  const categories = await getCategories()

  return (
    <div className="space-y-8">
      {/* Kategori Yönetimi Bölümü */}
      <CategoryManager />

      {/* Makaleler Bölümü */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-serif font-light mb-2">Makaleler</h1>
          <p className="text-muted-foreground">Blog içeriklerinizi yönetin</p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus size={16} className="mr-2" />
            Yeni Makale
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {articles.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">Henüz makale yok. İlk makalenizi oluşturun!</p>
              <Button asChild>
                <Link href="/admin/articles/new">
                  <Plus size={16} className="mr-2" />
                  Makale Oluştur
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          articles.map((article: any) => {
            // Kategori adını bul
            const categoryObj = article.category_id 
              ? categories.find((c: any) => c.id === article.category_id)
              : null
            const categoryName = categoryObj?.name || article.category || "Kategorisiz"
            
            return (
            <Card key={article.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{article.title}</h3>
                      <Badge variant={article.published ? "default" : "secondary"}>
                        {article.published ? "Yayında" : "Taslak"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold uppercase">
                        {categoryName}
                      </span>
                      <span>
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString("tr-TR")
                          : new Date(article.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <span className="text-muted-foreground/60">/{article.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Edit size={16} className="mr-2" />
                        Düzenle
                      </Link>
                    </Button>
                    <ArticleDeleteButton id={article.id} title={article.title} categoryName={categoryName} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )})
        )}
      </div>
    </div>
  )
}


