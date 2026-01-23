"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit2, Trash2, ChevronRight, Folder, FolderOpen, AlertTriangle, FileText } from "lucide-react"

type Category = {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number | null
  display_order: number
  is_active: boolean
  children?: Category[]
}

type ArticlePreview = {
  id: number
  title: string
  slug: string
  category_id: number | null
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [flatCategories, setFlatCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null)
  const [deleteArticles, setDeleteArticles] = useState<ArticlePreview[]>([])
  const [deleteChildCategories, setDeleteChildCategories] = useState<{ id: number; name: string; slug: string }[]>([])
  const [deleteChildArticles, setDeleteChildArticles] = useState<ArticlePreview[]>([])
  const [deleteTotalArticleCount, setDeleteTotalArticleCount] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parent_id: null as number | null,
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      setIsLoading(true)
      const res = await fetch("/api/admin/categories?include_inactive=true")
      if (!res.ok) throw new Error("Kategoriler yüklenemedi")
      const data = await res.json()
      setCategories(data.categories || [])
      setFlatCategories(data.flat || [])
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kategoriler yüklenemedi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      slug: "",
      description: "",
      parent_id: null,
      display_order: 0,
      is_active: true,
    })
    setEditingCategory(null)
    setShowForm(false)
  }

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      parent_id: category.parent_id || null,
      display_order: category.display_order,
      is_active: category.is_active,
    })
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories"
      
      const method = editingCategory ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "İşlem başarısız")
      }

      toast({
        title: "Başarılı",
        description: editingCategory ? "Kategori güncellendi" : "Kategori oluşturuldu",
      })

      resetForm()
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function handleDelete(id: number, name: string) {
    try {
      // Önce kontrol et - silinecek makaleleri listelemek için
      const checkRes = await fetch(`/api/admin/categories/${id}?check=true`)
      const checkData = await checkRes.json()

      const articles: ArticlePreview[] = checkData.articles || []
      const childCategories = checkData.childCategories || []
      const childArticles: ArticlePreview[] = checkData.childArticles || []
      const totalArticleCount =
        typeof checkData.totalArticleCount === "number"
          ? checkData.totalArticleCount
          : (checkData.articleCount || 0) + (checkData.childArticleCount || 0)
      const childCount = checkData.childCount || 0

      // Eğer içerik varsa modal aç (alt kategori veya makale)
      if (totalArticleCount > 0 || childCount > 0) {
        setDeleteTarget({ id, name })
        setDeleteArticles(articles)
        setDeleteChildCategories(childCategories)
        setDeleteChildArticles(childArticles)
        setDeleteTotalArticleCount(totalArticleCount)
        setDeleteDialogOpen(true)
        return
      }

      // Makale yoksa basit onay
      if (!confirm(`"${name}" kategorisini silmek istediğinize emin misiniz?`)) return
      await performDelete(id)
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  async function performDelete(id: number) {
    try {
      setIsDeleting(true)
      const deleteRes = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
      const deleteData = await deleteRes.json()

      if (!deleteRes.ok || deleteData.error) {
        throw new Error(deleteData.error || "Silme başarısız")
      }

      let successMsg = "Kategori silindi"
      if (deleteData.deletedArticles > 0) {
        successMsg += ` (${deleteData.deletedArticles} makale silindi)`
      }
      if (deleteData.deletedChildCategories > 0) {
        successMsg += ` (${deleteData.deletedChildCategories} alt kategori silindi)`
      }

      toast({ title: "Başarılı", description: successMsg })

      setDeleteDialogOpen(false)
      setDeleteTarget(null)
      setDeleteArticles([])
      setDeleteChildCategories([])
      setDeleteChildArticles([])
      setDeleteTotalArticleCount(0)
      fetchCategories()
    } catch (error: any) {
      toast({
        title: "Hata",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  function renderCategory(category: Category, level = 0) {
    const hasChildren = category.children && category.children.length > 0
    const Icon = hasChildren ? FolderOpen : Folder

    return (
      <div key={category.id}>
        <div
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-border"
          style={{ marginLeft: `${level * 24}px` }}
        >
          {level > 0 && (
            <ChevronRight size={16} className="text-muted-foreground" />
          )}
          <Icon size={18} className="text-accent" />
          <div className="flex-1">
            <div className="font-medium">{category.name}</div>
            <div className="text-xs text-muted-foreground">{category.slug}</div>
          </div>
          {!category.is_active && (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
              Pasif
            </span>
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleEdit(category)}
            >
              <Edit2 size={14} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDelete(category.id, category.name)}
            >
              <Trash2 size={14} className="text-red-500" />
            </Button>
          </div>
        </div>
        {hasChildren && (
          <div>
            {category.children!.map((child) => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-light mb-2">Kategori Yönetimi</h1>
          <p className="text-muted-foreground">
            Makale kategorilerini ve alt kategorilerini yönetin
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={16} className="mr-2" />
          Yeni Kategori
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-lg font-semibold mb-4">
                {editingCategory ? "Kategori Düzenle" : "Yeni Kategori Oluştur"}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Kategori Adı *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Örn: İş Hukuku"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="Otomatik oluşturulacak"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Kategori açıklaması..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parent_id">Üst Kategori</Label>
                  <Select
                    value={formData.parent_id?.toString() || "none"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        parent_id: value === "none" ? null : parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ana Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Ana Kategori</SelectItem>
                      {flatCategories
                        .filter((c) => c.id !== editingCategory?.id)
                        .filter((c) => c.parent_id === null)
                        .map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Sıralama</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  Aktif
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit">
                  {editingCategory ? "Güncelle" : "Oluştur"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Yükleniyor...
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Henüz kategori eklenmemiş
              </div>
            ) : (
              categories.map((category) => renderCategory(category))
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Kategori Silme Uyarısı
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold text-foreground">"{deleteTarget?.name}"</span> kategorisini silerseniz aşağıdaki makaleler de silinecek.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4">
            {deleteArticles.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium text-destructive flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Bu kategoriye ait {deleteArticles.length} makale silinecek:
                </div>
                <div className="rounded-md border bg-destructive/5 p-3 max-h-52 overflow-y-auto">
                  <ul className="space-y-1">
                    {deleteArticles.map((a) => (
                      <li key={a.id} className="text-sm">
                        {a.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {deleteChildArticles.length > 0 && (
              <div className="space-y-2">
                <div className="font-medium text-destructive flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Alt kategorilerdeki {deleteChildArticles.length} makale de silinecek:
                </div>
                {deleteChildCategories.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Alt kategoriler: {deleteChildCategories.map((c) => c.name).join(", ")}
                  </div>
                )}
                <div className="rounded-md border bg-destructive/5 p-3 max-h-52 overflow-y-auto">
                  <ul className="space-y-1">
                    {deleteChildArticles.map((a) => (
                      <li key={a.id} className="text-sm">
                        {a.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="rounded-md border bg-yellow-50 p-3 text-sm text-yellow-900">
              Bu işlem geri alınamaz.
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              onClick={() => {
                toast({ title: "İptal Edildi", description: "Silme işlemi iptal edildi" })
                setDeleteDialogOpen(false)
                setDeleteTarget(null)
                setDeleteArticles([])
                setDeleteChildCategories([])
                setDeleteChildArticles([])
                setDeleteTotalArticleCount(0)
              }}
            >
              İptal
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting || !deleteTarget}
              onClick={(e) => {
                e.preventDefault()
                if (!deleteTarget) return
                void performDelete(deleteTarget.id)
              }}
            >
              {isDeleting ? "Siliniyor..." : "Evet, Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

