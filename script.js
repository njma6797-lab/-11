// تحميل المصطلحات من data.json
async function loadTerms() {
  const response = await fetch('data.json');
  const data = await response.json();
  const container = document.getElementById('terms-container');
  container.innerHTML = '';

  data.forEach(term => {
    const termBox = document.createElement('div');
    termBox.className = 'term-box';

    termBox.innerHTML = `
      <h3>${term.en} <span>(${term.ar})</span></h3>
      <button class="explain-btn" onclick="openExplanation('${term.en}', '${term.description}')">📘 شرح</button>
      <button class="listen-btn" onclick="speakText('${term.en} ${term.ar}')">🔊 سماع</button>
    `;
    container.appendChild(termBox);
  });
}

// الانتقال لصفحة الشرح
function openExplanation(title, desc) {
  localStorage.setItem('termTitle', title);
  localStorage.setItem('termDesc', desc);
  window.location.href = 'explanation.html';
}

// تحويل النص إلى صوت
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[اأإءؤئ]/.test(text) ? 'ar-SA' : 'en-US'; // تحديد اللغة تلقائيًا
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// تحميل الصفحة عند التشغيل
document.addEventListener('DOMContentLoaded', loadTerms);
