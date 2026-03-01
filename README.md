# BDU Hesablayıcı 🎓

Bakı Dövlət Universiteti tələbələri üçün hərtərəfli hesablayıcı tətbiqi - Progressive Web App (PWA) texnologiyası ilə.

## 🌟 Xüsusiyyətlər

### ✅ Tamamlanmış Funksiyalar

1. **Semestr Bal Hesablama** 📚
   - Seminar balları hesablama (maksimum 9 bal)
   - Kollekvium balları hesablama (maksimum 4 bal)
   - Sərbəst iş balı daxil etmə (0-10)
   - Davamiyyət balı avtomatik hesablama (saat və qayıblara əsasən)
   - Düstur: (seminar orta × 0.4 + kollekvium orta × 0.6) × 3 + davamiyyət + sərbəst iş

2. **ÜOMG Hesablama** 📊
   - Fənn sayına uyğun dinamik input sahələri
   - Bal və kredit daxil etmə
   - Ağırlıqlı orta hesablama
   - Düstur: (bal₁×kredit₁ + ... + balₙ×kreditₙ) / (kredit₁ + ... + kreditₙ)

3. **25% İmtahan (Kəsr Pulu) Hesablama** 💰
   - İllik ödəniş və kredit sayına əsasən hesablama
   - Düstur: ((illik ödəniş / 60) × kredit sayı) / 4 + 1

4. **Yaş Hesablayıcı** 🎂
   - Doğum tarixi əsasında yaş hesablama
   - Yaşadığınız günlərin sayı
   - Növbəti ad gününə qalan günlər

5. **Akademik Lüğət** 📖
   - Akademik həyatda istifadə olunan terminlər
   - Azərbaycan dilində izahlar

6. **Məlumat Bölməsi** ℹ️
   - Əlaçı olmaq şərtləri
   - Akademik qaydalar haqqında məlumatlar

7. **Sürətli Linklər** 🔗
   - BDU rəsmi saytı
   - SemsLogin akademik portal
   - BDU WhatsApp kanal
   - BDU Instagram və Telegram
   - Tələbə chat qrupu

8. **PWA Dəstəyi** 📱
   - Oflayn işləmə qabiliyyəti
   - Ana ekrana əlavə etmə
   - Mobil tətbiq kimi istifadə
   - Service Worker ilə keşləmə

9. **WhatsApp Reklam Banneri** 💬
   - Sabit yuxarı banner
   - Birbaşa WhatsApp mesaj göndərmə

### 📋 Funksional URI-lər

- **Ana səhifə**: `/`
- **Static fayllar**: `/static/*`
- **PWA manifest**: `/manifest.json`
- **Service Worker**: `/sw.js`
- **İkonlar**: `/icon-192.png`, `/icon-512.png`

### 🎯 Ballandırma Nəticələri

Bütün hesablayıcılarda:
- **50+**: 🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅
- **45-49**: 🔥 ÇOX YAXŞI 📊
- **41-44**: 💣 YAXŞI 📈
- **36-40**: 🫂 KAFİ 📉
- **26-35**: 🎭 ZƏİF 📴
- **0-25**: 🗿 YAXŞI OLACAQ 🆒
- **0**: ⚠️ 0 BAL ⚠️

## 🚀 URLs

- **Test URL**: https://3000-i18uczyni5bgw4i0uw8un-0e616f0a.sandbox.novita.ai
- **GitHub**: https://github.com/gupi9163-lab/buybuybuy
- **Production** (Cloudflare Pages): Deploy etdikdən sonra əlavə ediləcək

## 💾 Data Arxitekturası

- **Data Modeli**: Client-side yaddaş (LocalStorage istifadə edilə bilər)
- **Storage Xidmətləri**: Yoxdur (tam statik sayt)
- **Data Axını**: Təmiz frontend JavaScript hesablamaları

## 📖 İstifadə Təlimatı

1. **Saytı Quraşdırma**:
   - Sayta daxil olun
   - "Tətbiqi Quraşdırın" bannerinə klikləyin
   - Ana ekrana əlavə edin

2. **Hesablama**:
   - Lazım olan hesablayıcını seçin
   - Məlumatları daxil edin
   - "Hesabla" düyməsinə basın
   - Nəticələri görün

3. **Oflayn İstifadə**:
   - Tətbiqi bir dəfə yükləyin
   - İnternetdən asılı olmayaraq istifadə edin
   - Bütün hesablama funksiyaları oflayn işləyir

## 🛠️ Texnologiya

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Hono (Cloudflare Workers)
- **PWA**: Service Worker, Web App Manifest
- **Hosting**: Cloudflare Pages
- **Icons**: Font Awesome 6.4.0
- **Mobile**: Responsive dizayn

## 📦 Deploy

```bash
# Build
npm run build

# Local test
npm run dev:sandbox

# Deploy to Cloudflare Pages
npm run deploy:prod
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Build project
npm run build

# Start dev server with PM2
pm2 start ecosystem.config.cjs

# Test
curl http://localhost:3000

# Check logs
pm2 logs webapp --nostream
```

## 📝 Qeydlər

- Davamiyyət hesablama qaydaları dəqiq tətbiq edilib
- Bütün hesablama düsturları test edilib
- PWA oflayn rejimində tam işləyir
- Mobil cihazlarda mükəmməl görünür
- WhatsApp linkləri mobil tətbiqi açır

## 🎨 Dizayn Xüsusiyyətləri

- Modern gradient dizayn (mor-bənövşəyi tema)
- Responsive layout
- Animasiyalı düymələr
- İstifadəçi dostu interfeys
- Azərbaycan dili dəstəyi

## 👨‍💻 Yaradıcı

**Instagram**: [@desespere_etoile](https://www.instagram.com/desespere_etoile)

**WhatsApp**: +994559406018

## 📅 Son Yeniləmə

**Tarix**: 1 Mart 2026

**Status**: ✅ Aktiv - Tam funksional

---

**O, boşluq yaradır.** ℹ️
