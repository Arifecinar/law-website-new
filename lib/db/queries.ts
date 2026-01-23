import { getAdminClient } from "@/lib/supabase"

// ================= PRACTICE AREAS =================

export async function getPracticeAreas() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("practice_areas")
    .select("*")
    .order("display_order", { ascending: true })
    .order("title", { ascending: true })
  
  if (error) {
    console.error("Error fetching practice areas:", error)
    return []
  }
  
  return data || []
}

export async function getPracticeAreaBySlug(slug: string) {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("practice_areas")
    .select("*")
    .eq("slug", slug)
    .single()
  
  if (error) {
    console.error("Error fetching practice area by slug:", error)
    return null
  }
  
  return data
}

// ================= ARTICLES =================

export async function getArticles() {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from("articles")
      .select("*")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false })
  
    if (error) {
    console.error("Error fetching articles:", error)
    return []
  }
  
  return data || []
}

export async function getArticleById(id: number) {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching article by ID:", error)
    return null
  }
  
  return data
}

export async function getArticleBySlug(slug: string) {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single()
  
  if (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
  
  return data
}

export async function createArticle(article: {
  title: string
  slug: string
  excerpt?: string
  content: string
  author?: string
  image_url?: string
  category?: string
  category_id?: number
  published?: boolean
}) {
  const supabase = getAdminClient()
  
  const now = new Date().toISOString()
  const published_at = article.published ? now : null
  
  const { data, error } = await supabase
    .from("articles")
    .insert([
      {
        ...article,
        published_at,
        created_at: now,
        updated_at: now,
      },
    ])
    .select()
    .single()
  
  if (error) {
    console.error("Error creating article:", error)
    throw new Error(error.message)
  }
  
  return data
}

export async function updateArticle(
  id: number,
  updates: {
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    author?: string
    image_url?: string | null
    category?: string | null
    category_id?: number | null
    published?: boolean
    published_at?: string | null
  }
) {
  const supabase = getAdminClient()
  
  const { data, error } = await supabase
    .from("articles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()
  
  if (error) {
    console.error("Error updating article:", error)
    throw new Error(error.message)
  }
  
  return data
}

export async function deleteArticle(id: number) {
  const supabase = getAdminClient()
  
  const { error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id)
  
  if (error) {
    console.error("Error deleting article:", error)
    throw new Error(error.message)
  }
  
  return true
}

// ================= APPOINTMENTS =================

export async function getAppointments() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching appointments:", error)
    return []
  }
  
  return data || []
}

export async function getAppointmentById(id: number) {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    console.error("Error fetching appointment by ID:", error)
    return null
  }
  
  return data
}

export async function createAppointment(appointment: {
  name: string
  phone: string
  email?: string
  practice_area?: string
  subject?: string
  message: string
  preferred_date?: string
  status?: string
}) {
  const supabase = getAdminClient()
  
  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        name: appointment.name,
        phone: appointment.phone,
        email: appointment.email,
        practice_area: appointment.practice_area,
        subject: appointment.subject,
        message: appointment.message,
        preferred_datetime: appointment.preferred_date,
        status: appointment.status || "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()
  
  if (error) {
    console.error("Error creating appointment:", error)
    throw new Error(error.message)
  }
  
  return data
}

export async function updateAppointmentStatus(id: number, status: string) {
  const supabase = getAdminClient()
  
  const { data, error } = await supabase
    .from("appointments")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()
  
  if (error) {
    console.error("Error updating appointment status:", error)
    throw new Error(error.message)
  }
  
  return data
}

export async function deleteAppointment(id: number) {
  const supabase = getAdminClient()
  
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id)
  
  if (error) {
    console.error("Error deleting appointment:", error)
    throw new Error(error.message)
  }
  
  return true
}

// ================= CONTACT MESSAGES =================

export async function getContactMessages() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
  
  if (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }
  
  return data || []
}

export async function createContactMessage(message: {
  full_name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status?: string
}) {
  const supabase = getAdminClient()
  
  // full_name -> name mapping for database
  const { full_name, ...rest } = message
  
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        name: full_name,
        ...rest,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()
  
  if (error) {
    console.error("Error creating contact message:", error)
    throw new Error(error.message)
  }
  
  return data
}

export async function updateContactMessageStatus(id: number, status: string) {
  const supabase = getAdminClient()
  
  const { data, error } = await supabase
    .from("contact_messages")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()
  
  if (error) {
    console.error("Error updating contact message status:", error)
    throw new Error(error.message)
  }
  
  return data
}

export async function deleteContactMessage(id: number) {
  const supabase = getAdminClient()
  
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id)
  
  if (error) {
    console.error("Error deleting contact message:", error)
    throw new Error(error.message)
  }
  
  return true
}

// ================= CATEGORIES =================

export async function getCategories() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true })
  
  if (error) {
    console.error("Error fetching categories:", error)
    return []
}

  return data || []
}
