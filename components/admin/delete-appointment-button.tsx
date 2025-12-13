"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function DeleteAppointmentButton({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    if (!confirm("Bu randevuyu silmek istediğinize emin misiniz?")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Silme işlemi başarısız oldu")
      }
      router.refresh()
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={onDelete} variant="ghost" size="icon" title="Sil" aria-label="Sil" disabled={loading}>
      <Trash size={16} />
    </Button>
  )
}


