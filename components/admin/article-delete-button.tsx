"use client"

import { useState } from "react"
import { Trash2, AlertTriangle, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
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

type Props = {
  id: number
  title: string
  categoryName?: string
}

export function ArticleDeleteButton({ id, title, categoryName }: Props) {
  const { toast } = useToast()
  const [step1Open, setStep1Open] = useState(false)
  const [step2Open, setStep2Open] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function doDelete() {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.error) throw new Error(data?.error || "Silme işlemi başarısız")

      toast({ title: "Başarılı", description: "Makale silindi" })
      // En basit yol: listeyi yenile
      window.location.reload()
    } catch (e: any) {
      toast({ title: "Hata", description: e.message || "Silme işlemi başarısız", variant: "destructive" })
    } finally {
      setIsDeleting(false)
      setStep1Open(false)
      setStep2Open(false)
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setStep1Open(true)}
        aria-label="Makaleyi Sil"
      >
        <Trash2 size={16} />
      </Button>

      {/* 1. modal: bilgilendirme */}
      <AlertDialog open={step1Open} onOpenChange={setStep1Open}>
        <AlertDialogContent className="max-w-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Makale Silme
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu makaleyi silmek üzeresiniz. Devam ederseniz ikinci bir onay ekranı göreceksiniz.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2 rounded-md border bg-secondary/30 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FileText className="h-4 w-4" />
              {title}
            </div>
            {categoryName ? <div className="text-xs text-muted-foreground">Kategori: {categoryName}</div> : null}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault()
                setStep1Open(false)
                setStep2Open(true)
              }}
            >
              Devam
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 2. modal: son onay */}
      <AlertDialog open={step2Open} onOpenChange={setStep2Open}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Son Onay
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. <span className="font-semibold text-foreground">"{title}"</span> makalesi silinecek.
              Onaylıyor musunuz?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting}
              onClick={(e) => {
                e.preventDefault()
                void doDelete()
              }}
            >
              {isDeleting ? "Siliniyor..." : "Evet, Sil"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


