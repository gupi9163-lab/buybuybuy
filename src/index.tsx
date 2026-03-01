import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/manifest.json', serveStatic({ path: './public/manifest.json' }))
app.use('/sw.js', serveStatic({ path: './public/sw.js' }))
app.use('/icon-192.png', serveStatic({ path: './public/icon-192.png' }))
app.use('/icon-512.png', serveStatic({ path: './public/icon-512.png' }))

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#1e40af">
        <meta name="description" content="Bakı Dövlət Universiteti Hesablayıcı Tətbiqi">
        <title>BDU Hesablayıcı</title>
        <link rel="manifest" href="/manifest.json">
        <link rel="icon" type="image/png" href="/icon-192.png">
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/style.css" rel="stylesheet">
    </head>
    <body>
        <!-- WhatsApp Banner -->
        <div class="whatsapp-banner">
            <div class="whatsapp-banner-text">
                Ən ucuz sərbəst iş hazırlanması
            </div>
            <a href="https://wa.me/994559406018" target="_blank" style="text-decoration: none;">
                <button class="whatsapp-btn">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </button>
            </a>
        </div>

        <!-- Install Banner -->
        <div id="installBanner">
            <i class="fas fa-download" style="font-size: 32px; color: #1e40af;"></i>
            <div style="flex: 1;">
                <strong>Tətbiqi Quraşdırın</strong>
                <p style="font-size: 12px; color: #64748b; margin-top: 5px;">Oflayn istifadə üçün ana ekrana əlavə edin</p>
            </div>
            <button onclick="installApp()">Quraşdır</button>
        </div>

        <div class="container">
            <div class="main-card">
                <!-- Main Page -->
                <div id="mainPage" class="page">
                    <div class="header">
                        <h1><i class="fas fa-calculator"></i> BDU Hesablayıcı</h1>
                        <p>Bakı Dövlət Universiteti</p>
                    </div>

                    <div class="menu-grid">
                        <button class="menu-item" onclick="openSemestrCalc()">
                            <i class="fas fa-book"></i>
                            <span>Semestr Bal Hesablama</span>
                        </button>

                        <button class="menu-item" onclick="openUOMGCalc()">
                            <i class="fas fa-chart-line"></i>
                            <span>ÜOMG Hesablama</span>
                        </button>

                        <button class="menu-item" onclick="openKesrCalc()">
                            <i class="fas fa-money-bill"></i>
                            <span>25% İmtahan (Kəsr Pulu)</span>
                        </button>

                        <button class="menu-item" onclick="openYasCalc()">
                            <i class="fas fa-birthday-cake"></i>
                            <span>Yaş Hesablayıcı</span>
                        </button>

                        <button class="menu-item" onclick="openLuget()">
                            <i class="fas fa-language"></i>
                            <span>Lüğət</span>
                        </button>

                        <button class="menu-item" onclick="openMelumat()">
                            <i class="fas fa-info-circle"></i>
                            <span>Məlumat</span>
                        </button>

                        <button class="menu-item" onclick="openLinks()">
                            <i class="fas fa-link"></i>
                            <span>Sürətli Linklər</span>
                        </button>
                    </div>
                </div>

                <!-- Semestr Bal Hesablama Page -->
                <div id="semestrPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">Semestr Bal Hesablama</h2>
                    
                    <div class="section-title">Başlanğıc Məlumatlar</div>
                    <input type="number" id="seminarCount" min="1" max="9" placeholder="Seminar bal sayı (1-9)" class="calc-input">
                    <input type="number" id="kollekviumCount" min="1" max="4" placeholder="Kollekvium bal sayı (1-4)" class="calc-input">
                    <button onclick="createSemestrInputs()" class="submit-btn">Davam et</button>
                    
                    <div id="semestrInputs" style="margin-top: 20px;"></div>
                    <div id="semestrResult"></div>
                </div>

                <!-- ÜOMG Hesablama Page -->
                <div id="uomgPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">ÜOMG Hesablama</h2>
                    
                    <input type="number" id="fennCount" min="1" placeholder="Fənn sayı" class="calc-input">
                    <button onclick="createUOMGInputs()" class="submit-btn">Davam et</button>
                    
                    <div id="uomgInputs" style="margin-top: 20px;"></div>
                    <div id="uomgResult"></div>
                </div>

                <!-- Kəsr Pulu Page -->
                <div id="kesrPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">25% İmtahan (Kəsr Pulu)</h2>
                    
                    <input type="number" id="illikOdenis" min="0" placeholder="İllik ödəniş (₼)" class="calc-input">
                    <input type="number" id="kreditSayi" min="1" placeholder="Fənnin kredit sayı" class="calc-input">
                    <button onclick="calculateKesr()" class="submit-btn">Hesabla</button>
                    
                    <div id="kesrResult"></div>
                </div>

                <!-- Yaş Hesablayıcı Page -->
                <div id="yasPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">Yaş Hesablayıcı</h2>
                    
                    <input type="text" id="dogumTarixi" placeholder="Doğum tarixi (GG.AA.IIII)" class="calc-input">
                    <p style="font-size: 12px; color: #64748b; margin-bottom: 15px;">Məsələn: 15.03.2000</p>
                    <button onclick="calculateYas()" class="submit-btn">Hesabla</button>
                    
                    <div id="yasResult"></div>
                </div>

                <!-- Lüğət Page -->
                <div id="lugetPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">Akademik Lüğət</h2>
                    
                    <div class="list-item">
                        <h3>Mühazirə</h3>
                        <p>Müəllimin keçdiyi dərs</p>
                    </div>
                    
                    <!-- Digər lüğət elementləri buraya əlavə ediləcək -->
                </div>

                <!-- Məlumat Page -->
                <div id="melumatPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">Məlumat</h2>
                    
                    <div class="list-item">
                        <h3>Əlaçı olmaq üçün</h3>
                        <p>Bütün fənnlər 91+ bal olmalıdır</p>
                    </div>
                    
                    <!-- Digər məlumat elementləri buraya əlavə ediləcək -->
                </div>

                <!-- Sürətli Linklər Page -->
                <div id="linksPage" class="page">
                    <button class="back-btn" onclick="goBack()">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                    <h2 class="page-title">Sürətli Linklər</h2>
                    
                    <a href="https://bsu.edu.az" target="_blank" class="link-item">
                        <i class="fas fa-university"></i>
                        <span>BDU Rəsmi Saytı</span>
                    </a>
                    
                    <a href="https://semslogin.bsu.edu.az" target="_blank" class="link-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>SemsLogin - Akademik Portal</span>
                    </a>
                    
                    <a href="https://whatsapp.com/channel/0029Va85Ls85q08WyYoGeJ3r" target="_blank" class="link-item">
                        <i class="fab fa-whatsapp"></i>
                        <span>BDU WhatsApp Kanal</span>
                    </a>
                    
                    <a href="https://www.instagram.com/bdu_eduaz" target="_blank" class="link-item">
                        <i class="fab fa-instagram"></i>
                        <span>BDU Instagram</span>
                    </a>
                    
                    <a href="https://t.me/bdu_eduaz" target="_blank" class="link-item">
                        <i class="fab fa-telegram"></i>
                        <span>BDU Telegram</span>
                    </a>
                    
                    <a href="https://www.instagram.com/desespere_etoile" target="_blank" class="link-item">
                        <i class="fab fa-instagram"></i>
                        <span>Sayt Sahibi Instagram</span>
                    </a>
                    
                    <a href="https://t.me/+WUKxtnDjo2E5YTcy" target="_blank" class="link-item">
                        <i class="fab fa-telegram"></i>
                        <span>Tələbə Chat Qrupu</span>
                    </a>
                </div>
            </div>
        </div>

        <!-- Info Button -->
        <button id="infoButton" onclick="toggleInfo()">
            <i class="fas fa-info"></i>
        </button>
        <div id="infoText">O, boşluq yaradır.</div>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
