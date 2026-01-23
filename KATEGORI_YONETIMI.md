# 📁 Kategori Yönetim Sistemi - Kullanım Kılavuzu

## 🎯 Genel Bakış

Web sitenize **dinamik kategori yönetim sistemi** eklenmiştir. Artık makale kategorilerini ve alt kategorilerini admin panelinden kolayca yönetebilirsiniz.

---

## ✨ Özellikler

### 1. **Dinamik Kategori Oluşturma**
- İstediğiniz kadar kategori ekleyebilirsiniz
- Kategorilere açıklama ekleyebilirsiniz
- Kategori slug'ları (URL) otomatik oluşturulur

### 2. **Hiyerarşik Yapı (Alt Kategoriler)**
- Ana kategorilerin altına alt kategoriler ekleyebilirsiniz
- Sınırsız derinlikte kategori hiyerarşisi
- Örnek: 
  - **İş Hukuku** (Ana Kategori)
    - İşçi Hakları (Alt Kategori)
    - İşveren Yükümlülükleri (Alt Kategori)

### 3. **Kategori Yönetimi**
- Kategorileri düzenleyebilirsiniz
- Kategorileri pasif hale getirebilirsiniz
- Kategorileri silebilirsiniz (makale yoksa)
- Sıralama düzeni belirleyebilirsiniz

### 4. **Makale Entegrasyonu**
- Makale eklerken kategorileri seçebilirsiniz
- Alt kategoriler de seçilebilir
- Makaleler sayfasında kategorilere göre filtreleme
- Her makale kartında kategori etiketi

---

## 📋 Kullanım Adımları

### 1️⃣ Veritabanı Kurulumu

Öncelikle veritabanınızda kategori tablosunu oluşturun:

```bash
# Supabase SQL Editor'de veya terminalden çalıştırın
psql -h your-db-host -U your-user -d your-database -f scripts/04-create-categories.sql
```

**Veya** Supabase Dashboard > SQL Editor'de `scripts/04-create-categories.sql` dosyasını çalıştırın.

### 2️⃣ Kategori Yönetim Sayfasına Erişim

1. Admin paneline giriş yapın
2. Sol menüden **"Kategoriler"** sekmesine tıklayın
3. Kategori yönetim paneli açılır

### 3️⃣ Yeni Kategori Oluşturma

1. **"Yeni Kategori"** butonuna tıklayın
2. Formu doldurun:
   - **Kategori Adı:** Kategori ismi (Örn: "İş Hukuku")
   - **Slug:** URL için (boş bırakılırsa otomatik oluşur)
   - **Açıklama:** Kategori hakkında kısa açıklama
   - **Üst Kategori:** Alt kategori yapmak istiyorsanız seçin
   - **Sıralama:** Kategorilerin görünme sırası (0 = en üstte)
   - **Aktif:** Kategorinin aktif olup olmayacağı

3. **"Oluştur"** butonuna tıklayın

### 4️⃣ Alt Kategori Oluşturma

1. Yeni kategori oluştururken **"Üst Kategori"** dropdown'ından ana kategoriyi seçin
2. Örnek:
   ```
   Kategori Adı: İşçi Hakları
   Üst Kategori: İş Hukuku
   ```
3. Alt kategori, ana kategorinin altında girintili görünecektir

### 5️⃣ Kategori Düzenleme

1. Kategori listesinde düzenlemek istediğiniz kategorinin yanındaki **✏️ İkon**'a tıklayın
2. Form otomatik açılır ve mevcut bilgiler doldurulur
3. Değişiklikleri yapın
4. **"Güncelle"** butonuna tıklayın

### 6️⃣ Kategori Silme

1. Silmek istediğiniz kategorinin yanındaki **🗑️ İkon**'a tıklayın
2. Onay mesajını kabul edin

**⚠️ Önemli:**
- Kategoriye ait makaleler varsa silemezsiniz
- Alt kategorileri varsa silemezsiniz
- Önce makaleleri başka kategoriye taşıyın veya silin

### 7️⃣ Makale Eklerken Kategori Seçimi

1. Admin panelinde **"Makaleler"** > **"Yeni Makale Oluştur"**
2. **"Kategori"** dropdown'ından kategori seçin
3. Alt kategoriler girintili olarak görünür:
   ```
   İş Hukuku
     ↳ İşçi Hakları
     ↳ İşveren Yükümlülükleri
   Ceza Hukuku
     ↳ Suç ve Ceza
   ```
4. İstediğiniz kategoriyi seçin ve makaleyi kaydedin

---

## 🖥️ Kullanıcı Arayüzü (Frontend)

### Makaleler Sayfası

Ziyaretçiler artık kategorilere göre makaleleri filtreleyebilir:

1. `/makaleler` sayfasına gidin
2. Üstte kategori butonları görünür
3. Bir kategoriye tıklayınca o kategorideki makaleler listelenir
4. **"Tümü"** butonuyla tüm makalelere dönebilirsiniz

### Kategori URL Yapısı

```
/makaleler                      → Tüm makaleler
/makaleler?cat=is-hukuku       → İş Hukuku kategorisi
/makaleler?cat=ceza-hukuku     → Ceza Hukuku kategorisi
```

---

## 🔧 Teknik Detaylar

### API Endpoints

#### Kategori Listeleme
```javascript
GET /api/admin/categories
GET /api/admin/categories?include_inactive=true

Response:
{
  "categories": [...],  // Hiyerarşik yapı
  "flat": [...]         // Düz liste
}
```

#### Kategori Oluşturma
```javascript
POST /api/admin/categories
Body: {
  "name": "İş Hukuku",
  "slug": "is-hukuku",
  "description": "İş hukuku makaleleri",
  "parent_id": null,
  "display_order": 1,
  "is_active": true
}
```

#### Kategori Güncelleme
```javascript
PUT /api/admin/categories/[id]
Body: {
  "name": "Güncellenmş İsim",
  ...
}
```

#### Kategori Silme
```javascript
DELETE /api/admin/categories/[id]
```

### Veritabanı Şeması

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES categories(id),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Articles Tablosu Güncellemesi

```sql
ALTER TABLE articles 
ADD COLUMN category_id INTEGER REFERENCES categories(id);
```

---

## 💡 İpuçları ve En İyi Uygulamalar

### 1. **Kategori İsimlendirme**
- Kısa ve açıklayıcı isimler kullanın
- Tutarlı isimlendirme yapın
- SEO dostu isimler seçin

### 2. **Alt Kategori Kullanımı**
- Çok fazla alt kategori oluşturmayın (2-3 seviye yeterli)
- İlgili makaleleri gruplamak için kullanın
- Kullanıcı deneyimini düşünerek organize edin

### 3. **Sıralama**
- En popüler kategorileri üstte tutun
- Mantıklı bir sıralama kullanın
- 0 = en üstte, büyüdükçe alta kayar

### 4. **Pasif Kategoriler**
- Geçici olarak gizlemek istediğiniz kategorileri pasif yapın
- Silmek yerine pasif yaparak verilerinizi koruyun

### 5. **Kategori Silme**
- Önce makaleleri kontrol edin
- Gerekirse makaleleri yeni kategoriye taşıyın
- Kesin silmeden önce yedek alın

---

## 🎨 Özelleştirme

### Kategori Renklerini Değiştirme

`app/makaleler/page.tsx` dosyasında:

```tsx
<Link
  className={
    "px-3 py-1.5 rounded-full border text-sm transition-colors " +
    (isActive
      ? "bg-accent text-accent-foreground border-accent"  // Aktif renk
      : "bg-background text-foreground border-border")    // Pasif renk
  }
>
```

### Kategori İkonları Ekleme

`app/admin/(protected)/categories/page.tsx` dosyasında ikon kütüphanesi:

```tsx
import { Folder, FolderOpen } from "lucide-react"
```

---

## 🐛 Sorun Giderme

### "Kategoriler görünmüyor"
- Veritabanı migration'ı çalıştırıldı mı?
- SQL script başarıyla uygulandı mı?
- Supabase bağlantısı doğru mu?

### "Kategori silemiyorum"
- Kategoriye ait makale var mı kontrol edin
- Alt kategoriler var mı kontrol edin
- Önce bağımlılıkları çözün

### "Makale eklerken kategoriler çıkmıyor"
- `/api/admin/categories` endpoint'i çalışıyor mu?
- Console'da hata var mı kontrol edin
- Tarayıcıyı yenilemeyi deneyin

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:

1. Console loglarını kontrol edin
2. Network sekmesinde API isteklerini inceleyin
3. SQL sorgularınızı Supabase SQL Editor'de test edin

---

## 🚀 Gelecek Özellikler (Opsiyonel)

- [ ] Kategori görselleri
- [ ] Kategori meta description (SEO)
- [ ] Kategori bazlı RSS feed
- [ ] Kategori istatistikleri
- [ ] Toplu kategori işlemleri
- [ ] Kategori içe/dışa aktarma

---

**✅ Sistem başarıyla kuruldu ve kullanıma hazır!**

İyi çalışmalar! 🎉

