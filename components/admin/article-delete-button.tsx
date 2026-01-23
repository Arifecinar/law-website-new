"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type Props = {
  id: number
  title: string
  categoryName?: string
}

export function ArticleDeleteButton({ id, title }: Props) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.error) throw new Error(data?.error || "Silme işlemi başarısız")

      toast({ title: "Başarılı", description: "Makale silindi" })
      window.location.reload()
    } catch (e: any) {
      toast({ title: "Hata", description: e.message || "Silme işlemi başarısız", variant: "destructive" })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Makaleyi Sil"
    >
      <Trash2 size={16} />
    </Button>
  )
}
