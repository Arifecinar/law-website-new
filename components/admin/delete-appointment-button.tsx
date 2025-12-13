// @ts-nocheck
"use client"

import { Button } from "@/components/ui/button"

export function DeleteAppointmentButton({ id }: { id: number }) {
  const onDelete = async () => {
    if (!confirm("Bu randevuyu silmek istediğinize emin misiniz?")) return
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Silme işlemi başarısız oldu")
      }
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <Button
      type="button"
      onClick={onDelete}
      variant="ghost"
      size="icon"
      title="Sil"
      aria-label="Sil"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  )
}


