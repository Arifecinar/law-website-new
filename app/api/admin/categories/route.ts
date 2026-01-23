import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAdminClient } from "@/lib/supabase"

// Validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Kategori adı gereklidir"),
  slug: z.string().optional(),
  description: z.string().optional(),
  parent_id: z.number().nullable().optional(),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
})

// GET - Tüm kategorileri getir (hierarchical)
export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminClient()
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("include_inactive") === "true"

    let query = supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true })

    if (!includeInactive) {
      query = query.eq("is_active", true)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching categories:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Organize into hierarchical structure
    const categoriesMap = new Map()
    const rootCategories: any[] = []

    // First pass: create map
    data.forEach((cat: any) => {
      categoriesMap.set(cat.id, { ...cat, children: [] })
    })

    // Second pass: build hierarchy
    data.forEach((cat: any) => {
      if (cat.parent_id === null) {
        rootCategories.push(categoriesMap.get(cat.id))
      } else {
        const parent = categoriesMap.get(cat.parent_id)
        if (parent) {
          parent.children.push(categoriesMap.get(cat.id))
        }
      }
    })

    return NextResponse.json({ categories: rootCategories, flat: data })
  } catch (error) {
    console.error("Error in GET /api/admin/categories:", error)
    return NextResponse.json(
      { error: "Kategoriler getirilemedi" },
      { status: 500 }
    )
  }
}

// POST - Yeni kategori oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = categorySchema.parse(body)

    // Generate slug if not provided
    let slug = validated.slug
    if (!slug) {
      slug = validated.name
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    }

    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          name: validated.name,
          slug,
          description: validated.description || null,
          parent_id: validated.parent_id || null,
          display_order: validated.display_order,
          is_active: validated.is_active,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating category:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error in POST /api/admin/categories:", error)
    return NextResponse.json(
      { error: "Kategori oluşturulamadı" },
      { status: 500 }
    )
  }
}

