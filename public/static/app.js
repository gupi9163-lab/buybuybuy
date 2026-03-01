// PWA Service Worker qeydiyyatı
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker qeydiyyatdan keçdi'))
      .catch(err => console.log('Service Worker xətası:', err));
  });
}

// PWA quraşdırma
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installBanner').style.display = 'flex';
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('İstifadəçi quraşdırmağı qəbul etdi');
      }
      deferredPrompt = null;
      document.getElementById('installBanner').style.display = 'none';
    });
  }
}

// Səhifə naviqasiyası
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(pageId).style.display = 'block';
  
  // Info butonunu gizlət (ana səhifə istisna olmaqla)
  if (pageId !== 'mainPage') {
    document.getElementById('infoButton').style.display = 'none';
  } else {
    document.getElementById('infoButton').style.display = 'block';
  }
}

function goBack() {
  showPage('mainPage');
}

// Info butonu
function toggleInfo() {
  const info = document.getElementById('infoText');
  info.style.display = info.style.display === 'none' ? 'block' : 'none';
}

// 1. Semestr Bal Hesablama
function openSemestrCalc() {
  showPage('semestrPage');
}

function createSemestrInputs() {
  const seminarCount = parseInt(document.getElementById('seminarCount').value) || 0;
  const kollekviumCount = parseInt(document.getElementById('kollekviumCount').value) || 0;
  
  if (seminarCount > 9 || seminarCount < 1) {
    alert('Seminar bal sayı 1-9 arasında olmalıdır!');
    return;
  }
  
  if (kollekviumCount > 4 || kollekviumCount < 1) {
    alert('Kollekvium bal sayı 1-4 arasında olmalıdır!');
    return;
  }
  
  let html = '<h3 class="text-lg font-semibold mb-2">Seminar Balları (0-10)</h3>';
  for (let i = 1; i <= seminarCount; i++) {
    html += `<input type="number" id="seminar${i}" min="0" max="10" step="0.1" placeholder="Seminar ${i}" class="calc-input">`;
  }
  
  html += '<h3 class="text-lg font-semibold mb-2 mt-4">Kollekvium Balları (0-10)</h3>';
  for (let i = 1; i <= kollekviumCount; i++) {
    html += `<input type="number" id="kollekvium${i}" min="0" max="10" step="0.1" placeholder="Kollekvium ${i}" class="calc-input">`;
  }
  
  html += '<h3 class="text-lg font-semibold mb-2 mt-4">Sərbəst İş Balı (0-10)</h3>';
  html += '<input type="number" id="serbest" min="0" max="10" step="0.1" placeholder="Sərbəst iş balı" class="calc-input">';
  
  html += '<h3 class="text-lg font-semibold mb-2 mt-4">Davamiyyət</h3>';
  html += `<select id="saatlar" class="calc-input">
    <option value="">Saat seçin</option>
    <option value="30">30 saat</option>
    <option value="45">45 saat</option>
    <option value="60">60 saat</option>
    <option value="75">75 saat</option>
    <option value="90">90 saat</option>
    <option value="105">105 saat</option>
  </select>`;
  html += '<input type="number" id="qayiblar" min="0" placeholder="Qayıb sayı" class="calc-input">';
  
  html += '<button onclick="calculateSemestr()" class="submit-btn mt-4">Hesabla</button>';
  
  document.getElementById('semestrInputs').innerHTML = html;
}

function calculateDavamiyyet(saat, qayib) {
  const rules = {
    30: [[1, 2, 9], [3, 8], [4, 0]],
    45: [[1, 10], [2, 3, 9], [4, 5, 8], [6, 0]],
    60: [[1, 10], [2, 3, 4, 9], [5, 6, 7, 8], [8, 0]],
    75: [[1, 10], [2, 3, 4, 5, 9], [6, 7, 8, 9, 8], [10, 0]],
    90: [[1, 2, 10], [3, 4, 5, 6, 9], [7, 8, 9, 10, 11, 8], [12, 0]],
    105: [[1, 2, 10], [3, 4, 5, 6, 7, 9], [8, 9, 10, 11, 12, 13, 8], [14, 0]]
  };
  
  const rule = rules[saat];
  if (!rule) return 0;
  
  for (let r of rule) {
    if (qayib <= r[0] || (r.length > 2 && qayib >= r[0] && qayib <= r[r.length - 2])) {
      return r[r.length - 1];
    }
  }
  return 0;
}

function calculateSemestr() {
  const seminarCount = parseInt(document.getElementById('seminarCount').value);
  const kollekviumCount = parseInt(document.getElementById('kollekviumCount').value);
  
  let seminarSum = 0;
  for (let i = 1; i <= seminarCount; i++) {
    seminarSum += parseFloat(document.getElementById(`seminar${i}`).value) || 0;
  }
  const seminarOrta = seminarSum / seminarCount;
  
  let kollekviumSum = 0;
  for (let i = 1; i <= kollekviumCount; i++) {
    kollekviumSum += parseFloat(document.getElementById(`kollekvium${i}`).value) || 0;
  }
  const kollekviumOrta = kollekviumSum / kollekviumCount;
  
  const serbest = parseFloat(document.getElementById('serbest').value) || 0;
  const saat = parseInt(document.getElementById('saatlar').value);
  const qayib = parseInt(document.getElementById('qayiblar').value) || 0;
  
  const davamiyyet = calculateDavamiyyet(saat, qayib);
  
  const semestrBal = (seminarOrta * 0.4 + kollekviumOrta * 0.6) * 3 + davamiyyet + serbest;
  
  let result = `<div class="result-box">`;
  result += `<h3 class="text-xl font-bold mb-4">Nəticə</h3>`;
  result += `<p class="mb-2">Semestr Balı: <strong>${semestrBal.toFixed(2)}</strong></p>`;
  result += `<p class="mb-2">Davamiyyət Balı: <strong>${davamiyyet}</strong></p>`;
  result += `<p class="mb-4">Sərbəst İş Balı: <strong>${serbest}</strong></p>`;
  
  if (semestrBal === 0) {
    result += `<div class="status-box">⚠️ 0 BAL ⚠️</div>`;
  } else if (semestrBal >= 50) {
    result += `<div class="status-box success">🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅</div>`;
  } else if (semestrBal >= 45) {
    result += `<div class="status-box good">🔥 ÇOX YAXŞI 📊</div>`;
  } else if (semestrBal >= 41) {
    result += `<div class="status-box average">💣 YAXŞI 📈</div>`;
  } else if (semestrBal >= 36) {
    result += `<div class="status-box below">🫂 KAFİ 📉</div>`;
  } else if (semestrBal >= 26) {
    result += `<div class="status-box weak">🎭 ZƏİF 📴</div>`;
  } else {
    result += `<div class="status-box fail">🗿 YAXŞI OLACAQ 🆒</div>`;
  }
  
  result += `</div>`;
  document.getElementById('semestrResult').innerHTML = result;
}

// 2. ÜOMG Hesablama
function openUOMGCalc() {
  showPage('uomgPage');
}

function createUOMGInputs() {
  const fennCount = parseInt(document.getElementById('fennCount').value) || 0;
  
  if (fennCount < 1) {
    alert('Fənn sayını daxil edin!');
    return;
  }
  
  let html = '';
  for (let i = 1; i <= fennCount; i++) {
    html += `<div class="fenn-row">
      <input type="number" id="bal${i}" min="0" max="100" placeholder="Bal ${i}" class="calc-input-inline">
      <input type="number" id="kredit${i}" min="1" max="10" placeholder="Kredit ${i}" class="calc-input-inline">
    </div>`;
  }
  
  html += '<button onclick="calculateUOMG()" class="submit-btn mt-4">Hesabla</button>';
  document.getElementById('uomgInputs').innerHTML = html;
}

function calculateUOMG() {
  const fennCount = parseInt(document.getElementById('fennCount').value);
  
  let toplamBal = 0;
  let toplamKredit = 0;
  
  for (let i = 1; i <= fennCount; i++) {
    const bal = parseFloat(document.getElementById(`bal${i}`).value) || 0;
    const kredit = parseFloat(document.getElementById(`kredit${i}`).value) || 0;
    toplamBal += bal * kredit;
    toplamKredit += kredit;
  }
  
  const uomg = toplamKredit > 0 ? toplamBal / toplamKredit : 0;
  
  let result = `<div class="result-box">`;
  result += `<h3 class="text-xl font-bold mb-4">Nəticə</h3>`;
  result += `<p class="mb-4">ÜOMG: <strong>${uomg.toFixed(2)}</strong></p>`;
  
  if (uomg === 0) {
    result += `<div class="status-box">⚠️ 0 BAL ⚠️</div>`;
  } else if (uomg >= 50) {
    result += `<div class="status-box success">🎉 MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ! ✅</div>`;
  } else if (uomg >= 45) {
    result += `<div class="status-box good">🔥 ÇOX YAXŞI 📊</div>`;
  } else if (uomg >= 41) {
    result += `<div class="status-box average">💣 YAXŞI 📈</div>`;
  } else if (uomg >= 36) {
    result += `<div class="status-box below">🫂 KAFİ 📉</div>`;
  } else if (uomg >= 26) {
    result += `<div class="status-box weak">🎭 ZƏİF 📴</div>`;
  } else {
    result += `<div class="status-box fail">🗿 YAXŞI OLACAQ 🆒</div>`;
  }
  
  result += `</div>`;
  document.getElementById('uomgResult').innerHTML = result;
}

// 3. 25% İmtahan (Kəsr Pulu) Hesablama
function openKesrCalc() {
  showPage('kesrPage');
}

function calculateKesr() {
  const illikOdenis = parseFloat(document.getElementById('illikOdenis').value) || 0;
  const kreditSayi = parseFloat(document.getElementById('kreditSayi').value) || 0;
  
  if (illikOdenis <= 0 || kreditSayi <= 0) {
    alert('Zəhmət olmasa bütün məlumatları daxil edin!');
    return;
  }
  
  const kesrPulu = ((illikOdenis / 60) * kreditSayi) / 4 + 1;
  
  let result = `<div class="result-box">`;
  result += `<h3 class="text-xl font-bold mb-4">Nəticə</h3>`;
  result += `<p class="text-2xl font-bold text-blue-600">${kesrPulu.toFixed(2)} ₼</p>`;
  result += `</div>`;
  
  document.getElementById('kesrResult').innerHTML = result;
}

// 4. Yaş Hesablayıcı
function openYasCalc() {
  showPage('yasPage');
}

function calculateYas() {
  const dogumInput = document.getElementById('dogumTarixi').value;
  
  if (!dogumInput) {
    alert('Zəhmət olmasa doğum tarixini daxil edin!');
    return;
  }
  
  const parts = dogumInput.split(/[./-]/);
  if (parts.length !== 3) {
    alert('Düzgün format: GG.AA.IIII (məsələn: 15.03.2000)');
    return;
  }
  
  const dogumGun = parseInt(parts[0]);
  const dogumAy = parseInt(parts[1]);
  const dogumIl = parseInt(parts[2]);
  
  const dogum = new Date(dogumIl, dogumAy - 1, dogumGun);
  const indi = new Date();
  
  // Yaş hesablama
  let yas = indi.getFullYear() - dogum.getFullYear();
  const ayFerq = indi.getMonth() - dogum.getMonth();
  if (ayFerq < 0 || (ayFerq === 0 && indi.getDate() < dogum.getDate())) {
    yas--;
  }
  
  // Gün fərqi
  const ferg = indi - dogum;
  const gunler = Math.floor(ferg / (1000 * 60 * 60 * 24));
  
  // Növbəti ad günü
  const novbetiAdGunu = new Date(indi.getFullYear(), dogumAy - 1, dogumGun);
  if (novbetiAdGunu < indi) {
    novbetiAdGunu.setFullYear(indi.getFullYear() + 1);
  }
  const qalanGunler = Math.ceil((novbetiAdGunu - indi) / (1000 * 60 * 60 * 24));
  
  let result = `<div class="result-box">`;
  result += `<h3 class="text-xl font-bold mb-4">Nəticə</h3>`;
  result += `<p class="mb-2">Yaşınız: <strong>${yas}</strong></p>`;
  result += `<p class="mb-2">Yaşadığınız günlər: <strong>${gunler}</strong></p>`;
  result += `<p>Növbəti ad gününə: <strong>${qalanGunler} gün</strong></p>`;
  result += `</div>`;
  
  document.getElementById('yasResult').innerHTML = result;
}

// 5. Lüğət
function openLuget() {
  showPage('lugetPage');
}

// 6. Məlumat
function openMelumat() {
  showPage('melumatPage');
}

// 7. Sürətli Linklər
function openLinks() {
  showPage('linksPage');
}

function openLink(url, isApp = false) {
  if (isApp) {
    // Mobil tətbiqi açmağa çalış
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
}

// Yükləndikdə ana səhifəni göstər
window.addEventListener('load', () => {
  showPage('mainPage');
});
