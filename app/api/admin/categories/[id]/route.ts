import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getAdminClient } from "@/lib/supabase"

const categoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  parent_id: z.number().nullable().optional(),
  display_order: z.number().optional(),
  is_active: z.boolean().optional(),
})

// GET - Tek kategori getir (check=true ile makale/alt kategori sayılarını da döndür)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)
    const { searchParams } = new URL(request.url)
    const check = searchParams.get("check") === "true"
    
    const supabase = getAdminClient()

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    // Eğer check=true ise makale/alt kategori sayılarını + silinecek içerik listesini döndür
    if (check) {
      const { count: articleCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("category_id", categoryId)

      const { count: childCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true })
        .eq("parent_id", categoryId)

      // Bu kategoriye ait makaleleri listele (UI'da göstermek için)
      const { data: articles, error: articlesError } = await supabase
        .from("articles")
        .select("id,title,slug,category_id")
        .eq("category_id", categoryId)
        .order("created_at", { ascending: false })

      if (articlesError) {
        return NextResponse.json({ error: "Makaleler getirilemedi: " + articlesError.message }, { status: 400 })
      }

      // Alt kategorileri ve onların makalelerini listele
      const { data: childCategories, error: childCategoriesError } = await supabase
        .from("categories")
        .select("id,name,slug,parent_id")
        .eq("parent_id", categoryId)
        .order("display_order", { ascending: true })

      if (childCategoriesError) {
        return NextResponse.json({ error: "Alt kategoriler getirilemedi: " + childCategoriesError.message }, { status: 400 })
      }

      const childCategoryIds = (childCategories || []).map((c) => c.id)
      let childArticles: { id: number; title: string; slug: string; category_id: number }[] = []
      let childArticleCount = 0
      if (childCategoryIds.length > 0) {
        // Alt kategorilere ait makale sayısı
        const { count: childArticlesCount } = await supabase
          .from("articles")
          .select("*", { count: "exact", head: true })
          .in("category_id", childCategoryIds)

        const { data: childArticlesData, error: childArticlesError } = await supabase
          .from("articles")
          .select("id,title,slug,category_id")
          .in("category_id", childCategoryIds)
          .order("created_at", { ascending: false })

        if (childArticlesError) {
          return NextResponse.json({ error: "Alt kategori makaleleri getirilemedi: " + childArticlesError.message }, { status: 400 })
        }

        childArticles = (childArticlesData || []) as any
        childArticleCount = childArticlesCount || childArticles.length || 0
      }

      return NextResponse.json({
        ...data,
        articleCount: articleCount || 0,
        childCount: childCount || 0,
        childArticleCount,
        totalArticleCount: (articleCount || 0) + childArticleCount,
        articles: articles || [],
        childCategories: childCategories || [],
        childArticles,
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/admin/categories/[id]:", error)
    return NextResponse.json(
      { error: "Kategori getirilemedi" },
      { status: 500 }
    )
  }
}

// PUT - Kategori güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validated = categoryUpdateSchema.parse(body)

    const supabase = getAdminClient()
    
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (validated.name !== undefined) updateData.name = validated.name
    if (validated.slug !== undefined) updateData.slug = validated.slug
    if (validated.description !== undefined) updateData.description = validated.description
    if (validated.parent_id !== undefined) updateData.parent_id = validated.parent_id
    if (validated.display_order !== undefined) updateData.display_order = validated.display_order
    if (validated.is_active !== undefined) updateData.is_active = validated.is_active

    const { data, error } = await supabase
      .from("categories")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Geçersiz veri", details: error.errors },
        { status: 400 }
      )
    }
    console.error("Error in PUT /api/admin/categories/[id]:", error)
    return NextResponse.json(
      { error: "Kategori güncellenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Kategori sil (her zaman siler - frontend onay aldıktan sonra çağırır)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)
    
    console.log(`[DELETE Category] Siliniyor ID: ${categoryId}`)
    
    const supabase = getAdminClient()

    // Makale sayısını al
    const { count: articleCount } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .eq("category_id", categoryId)

    // Alt kategori sayısını al
    const { count: childCount } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true })
      .eq("parent_id", categoryId)

    console.log(`[DELETE Category] Makaleler: ${articleCount}, Alt kategoriler: ${childCount}`)

    let deletedArticlesCount = 0
    let deletedChildrenCount = 0
    
    // Önce alt kategorileri ve onların makalelerini sil
    if (childCount && childCount > 0) {
      const { data: childCategories } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", categoryId)
      
      if (childCategories) {
        for (const child of childCategories) {
          // Alt kategorinin makale sayısını al
          const { count: childArticleCount } = await supabase
            .from("articles")
            .select("*", { count: "exact", head: true })
            .eq("category_id", child.id)
          
          // Alt kategorinin makalelerini sil
          await supabase.from("articles").delete().eq("category_id", child.id)
          deletedArticlesCount += childArticleCount || 0
          
          // Alt kategoriyi sil
          await supabase.from("categories").delete().eq("id", child.id)
          deletedChildrenCount++
        }
      }
    }

    // Bu kategorinin makalelerini sil
    if (articleCount && articleCount > 0) {
      console.log(`[DELETE Category] ${articleCount} makale siliniyor...`)
      await supabase.from("articles").delete().eq("category_id", categoryId)
      deletedArticlesCount += articleCount
    }

    // Kategoriyi sil
    console.log(`[DELETE Category] Kategori siliniyor...`)
    const { error } = await supabase.from("categories").delete().eq("id", categoryId)

    if (error) {
      console.error("Category delete error:", error)
      return NextResponse.json({ error: "Kategori silinemedi: " + error.message }, { status: 400 })
    }

    console.log(`[DELETE Category] Başarılı! Silinen: ${deletedArticlesCount} makale, ${deletedChildrenCount} alt kategori`)

    return NextResponse.json({ 
      success: true,
      deletedArticles: deletedArticlesCount,
      deletedChildCategories: deletedChildrenCount
    })
  } catch (error) {
    console.error("Error in DELETE /api/admin/categories/[id]:", error)
    return NextResponse.json(
      { error: "Kategori silinemedi: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 }
    )
  }
}

