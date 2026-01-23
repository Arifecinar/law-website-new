"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Plus, Edit2, Trash2, ChevronRight, Folder, FolderOpen, X, Check, AlertTriangle, FileText } from "lucide-react"

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

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [flatCategories, setFlatCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
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
    parent_id: null as number | null,
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
      console.error("Error fetching categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setFormData({ name: "", parent_id: null })
    setEditingCategory(null)
    setShowForm(false)
  }

  function handleEdit(category: Category) {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      parent_id: category.parent_id || null,
    })
    setShowForm(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name.trim()) return

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : "/api/admin/categories"
      
      const method = editingCategory ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          parent_id: formData.parent_id,
          is_active: true,
        }),
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

      // İçerik varsa 1. modal aç
      if (totalArticleCount > 0 || childCount > 0) {
        setDeleteTarget({ id, name })
        setDeleteArticles(articles)
        setDeleteChildCategories(childCategories)
        setDeleteChildArticles(childArticles)
        setDeleteTotalArticleCount(totalArticleCount)
        setDeleteDialogOpen(true)
        return
      }

      // İçerik yoksa basit onay
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
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.error) throw new Error(data?.error || "Silme başarısız")

      let successMsg = "Kategori silindi"
      if (data.deletedArticles > 0) successMsg += ` (${data.deletedArticles} makale silindi)`
      if (data.deletedChildCategories > 0) successMsg += ` (${data.deletedChildCategories} alt kategori silindi)`

      toast({ title: "Başarılı", description: successMsg })

      setDeleteDialogOpen(false)
      setDeleteTarget(null)
      setDeleteArticles([])
      setDeleteChildCategories([])
      setDeleteChildArticles([])
      setDeleteTotalArticleCount(0)
      fetchCategories()
    } catch (error: any) {
      toast({ title: "Hata", description: error.message, variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  function renderCategoryItem(category: Category, level = 0) {
    const hasChildren = category.children && category.children.length > 0
    const Icon = hasChildren ? FolderOpen : Folder

    return (
      <div key={category.id}>
        <div
          className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-secondary/50 transition-colors group"
          style={{ marginLeft: `${level * 16}px` }}
        >
          {level > 0 && (
            <ChevronRight size={12} className="text-muted-foreground" />
          )}
          <Icon size={14} className="text-accent" />
          <span className="flex-1 text-sm font-medium">{category.name}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => handleEdit(category)}
              className="p-1 hover:bg-background rounded"
            >
              <Edit2 size={12} className="text-muted-foreground hover:text-foreground" />
            </button>
            <button
              onClick={() => handleDelete(category.id, category.name)}
              className="p-1 hover:bg-background rounded"
            >
              <Trash2 size={12} className="text-red-500" />
            </button>
          </div>
        </div>
        {hasChildren && (
          <div>
            {category.children!.map((child) => renderCategoryItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Kategori Yönetimi</h2>
            <p className="text-sm text-muted-foreground">Makale kategorilerini ve alt kategorileri yönetin</p>
          </div>
          <Button 
            size="sm" 
            variant={showForm ? "outline" : "default"}
            onClick={() => {
              if (showForm) {
                resetForm()
              } else {
                setShowForm(true)
              }
            }}
          >
            {showForm ? (
              <>
                <X size={14} className="mr-1" />
                İptal
              </>
            ) : (
              <>
                <Plus size={14} className="mr-1" />
                Yeni Kategori
              </>
            )}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 bg-secondary/30 rounded-lg mb-4">
            <div className="flex items-end gap-3">
              <div className="flex-1 space-y-1">
                <Label htmlFor="name" className="text-xs">Kategori Adı</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Örn: İş Hukuku"
                  className="h-9"
                  autoFocus
                />
              </div>
              <div className="w-48 space-y-1">
                <Label htmlFor="parent" className="text-xs">Üst Kategori (opsiyonel)</Label>
                <Select
                  value={formData.parent_id?.toString() || "none"}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      parent_id: value === "none" ? null : parseInt(value),
                    })
                  }
                >
                  <SelectTrigger className="h-9">
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
              <Button type="submit" size="sm" className="h-9">
                <Check size={14} className="mr-1" />
                {editingCategory ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        )}

        {/* Category List */}
        <div className="border rounded-lg p-3 max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Yükleniyor...
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Henüz kategori eklenmemiş. Yukarıdan yeni kategori ekleyin.
            </div>
          ) : (
            <div className="space-y-0.5">
              {categories.map((category) => renderCategoryItem(category))}
            </div>
          )}
        </div>

        {/* 1. Modal: Makale listesi */}
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
                  <div className="rounded-md border bg-destructive/5 p-3 max-h-44 overflow-y-auto">
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
                    <div className="text-xs text-muted-foreground">
                      Alt kategoriler: {deleteChildCategories.map((c) => c.name).join(", ")}
                    </div>
                  )}
                  <div className="rounded-md border bg-destructive/5 p-3 max-h-44 overflow-y-auto">
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
      </CardContent>
    </Card>
  )
}

