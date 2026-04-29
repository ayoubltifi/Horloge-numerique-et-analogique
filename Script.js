// Récupération des éléments DOM
// ============================================================
const canvas         = document.getElementById('clockCanvas');
const ctx            = canvas.getContext('2d');

// Dimensions du canvas
const size = 300;
canvas.width  = size;
canvas.height = size;

// Éléments d'affichage
const digitalTimeElem = document.getElementById('digitalTime');
const dateDisplayElem = document.getElementById('dateDisplay');
const timezoneInfoElem = document.getElementById('timezoneInfo');

// Éléments de personnalisation
const dialColorPicker = document.getElementById('dialColor');
const hourColorPicker = document.getElementById('hourColor');
const minColorPicker  = document.getElementById('minColor');
const secColorPicker  = document.getElementById('secColor');
const markColorPicker = document.getElementById('markColor');
const resetBtn        = document.getElementById('resetColors');

// Sélecteur de fuseau
const timezoneSelect = document.getElementById('timezone');

// Éléments de citation
const quoteTextElem   = document.getElementById('quoteText');
const quoteAuthorElem = document.getElementById('quoteAuthor');

// Éléments de réinitialisation
const elegantResetBtn = document.getElementById('elegantResetBtn');
const resetFeedback   = document.getElementById('resetFeedback');

// ============================================================
// Collection de citations
// ============================================================
const quotes = [
    { text: "Le temps est un grand maître, il résout bien des problèmes.",             author: "— Proverbe tunisien" },
    { text: "Le temps ne respecte pas ce qui se fait sans lui.",                        author: "— Proverbe arabe" },
    { text: "Chaque seconde est une perle précieuse, à toi de l'enchâsser.",            author: "— Sagesse tunisienne" },
    { text: "Le temps est comme le vent, il emporte ceux qui ne savent pas s'y accrocher.", author: "— Proverbe de Carthage" },
    { text: "Il n'est de richesse que de temps.",                                       author: "— Honoré de Balzac" },
    { text: "Demain est un mystère, aujourd'hui est un cadeau.",                        author: "— Sagesse orientale" },
    { text: "Le temps passe, mais les souvenirs de Carthage demeurent éternels.",       author: "— Héritage tunisien" },
    { text: "Le temps est un sage qui murmure à l'oreille de ceux qui savent écouter.", author: "— Proverbe méditerranéen" },
    { text: "À Carthage, on mesurait le temps à la sagesse des hommes.",                author: "— Légende tunisienne" }
];

let currentQuoteIndex = Math.floor(Math.random() * quotes.length);

// ============================================================
// Changer la citation (évite la répétition consécutive)
// ============================================================
function changeQuote() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);

    currentQuoteIndex = newIndex;
    const quote = quotes[currentQuoteIndex];

    if (quoteTextElem && quoteAuthorElem) {
        quoteTextElem.textContent   = quote.text;
        quoteAuthorElem.textContent = quote.author;
    }
}

// Changer la citation toutes les 30 secondes
setInterval(changeQuote, 30000);

// ============================================================
// Couleurs par défaut
// ============================================================
let colors = {
    dial:   '#ffffff',
    hour:   '#1a1a2e',
    minute: '#16213e',
    second: '#ff6b6b',
    marks:  '#c44569'
};

// ============================================================
// Utilitaire : ajuster la luminosité d'une couleur hex
// percent > 0 => plus clair ; percent < 0 => plus foncé
// ============================================================
function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16); // Correction : .replace au lieu de .slice(1) pour robustesse
    const r   = Math.min(255, Math.max(0, (num >> 16) + percent));
    const g   = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
    const b   = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ============================================================
// Dessiner le cadran
// ============================================================
function drawClockFace() {
    const radius = size / 2;
    ctx.save();
    ctx.translate(radius, radius);

    // Fond du cadran avec dégradé radial
    const gradient = ctx.createRadialGradient(-10, -10, 20, 0, 0, radius - 5);
    gradient.addColorStop(0,   colors.dial);
    gradient.addColorStop(0.7, colors.dial);
    gradient.addColorStop(1,   adjustColor(colors.dial, -30));

    ctx.beginPath();
    ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Contour doré
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth   = 3;
    ctx.stroke();

    // Graduations des heures (épaisses)
    for (let i = 1; i <= 12; i++) {
        const angle  = i * Math.PI * 2 / 12;
        const startX = (radius - 22) * Math.sin(angle);
        const startY = -(radius - 22) * Math.cos(angle);
        const endX   = (radius - 8) * Math.sin(angle);
        const endY   = -(radius - 8) * Math.cos(angle);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = colors.marks;
        ctx.lineWidth   = 4;
        ctx.stroke();
    }

    // Graduations des minutes (fines)
    for (let i = 1; i <= 60; i++) {
        if (i % 5 === 0) continue;
        const angle  = i * Math.PI * 2 / 60;
        const startX = (radius - 17) * Math.sin(angle);
        const startY = -(radius - 17) * Math.cos(angle);
        const endX   = (radius - 9) * Math.sin(angle);
        const endY   = -(radius - 9) * Math.cos(angle);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = colors.marks;
        ctx.lineWidth   = 2;
        ctx.stroke();
    }

    // Chiffres
    ctx.font         = `bold ${radius * 0.12}px "Segoe UI", "Playfair Display"`;
    ctx.fillStyle    = colors.marks;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur   = 4;
    ctx.shadowColor  = 'rgba(255, 215, 0, 0.3)';

    const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    for (let i = 0; i < 12; i++) {
        const angle = (i + 1) * Math.PI * 2 / 12;
        const numX  = (radius - 35) * Math.sin(angle);
        const numY  = -(radius - 35) * Math.cos(angle);
        ctx.fillText(numbers[i].toString(), numX, numY);
    }

    ctx.shadowBlur = 0;
    ctx.restore();
}

// ============================================================
// Dessiner les aiguilles
// ============================================================
function drawHands(hours, minutes, seconds) {
    const radius = size / 2;
    ctx.save();
    ctx.translate(radius, radius);

    ctx.shadowBlur  = 8;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

    // Aiguille des heures
    const hourAngle = (hours % 12) * (Math.PI * 2 / 12) + (minutes / 60) * (Math.PI * 2 / 12);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(hourAngle) * (radius * 0.5), -Math.cos(hourAngle) * (radius * 0.5));
    ctx.lineWidth   = 9;
    ctx.lineCap     = 'round';
    ctx.strokeStyle = colors.hour;
    ctx.stroke();

    // Aiguille des minutes
    const minuteAngle = minutes * (Math.PI * 2 / 60);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(minuteAngle) * (radius * 0.7), -Math.cos(minuteAngle) * (radius * 0.7));
    ctx.lineWidth   = 7;
    ctx.lineCap     = 'round';
    ctx.strokeStyle = colors.minute;
    ctx.stroke();

    // Aiguille des secondes
    const secondAngle = seconds * (Math.PI * 2 / 60);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(secondAngle) * (radius * 0.85), -Math.cos(secondAngle) * (radius * 0.85));
    ctx.lineWidth   = 3;
    ctx.lineCap     = 'round';
    ctx.strokeStyle = colors.second;
    ctx.stroke();

    // Effet de brillance sur la seconde
    ctx.shadowBlur  = 12;
    ctx.shadowColor = colors.second;
    ctx.stroke();

    // Centre de l'horloge (effet 3D)
    ctx.shadowBlur = 0;
    const centerGradient = ctx.createRadialGradient(-3, -3, 2, 0, 0, 8);
    centerGradient.addColorStop(0, '#ffd700');
    centerGradient.addColorStop(1, '#ffb347');
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    // Petit cercle intérieur blanc
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.restore();
}

// ============================================================
// Obtenir l'heure actuelle dans le fuseau sélectionné
// ============================================================
function getCurrentTimeInTimezone(timezone) {
    const now = new Date();

    const optionsTime = {
        timeZone: timezone,
        hour:     '2-digit',
        minute:   '2-digit',
        second:   '2-digit',
        hour12:   false
    };

    const optionsDate = {
        timeZone: timezone,
        weekday:  'long',
        year:     'numeric',
        month:    'long',
        day:      'numeric'
    };

    const timeStr = new Intl.DateTimeFormat('fr-FR', optionsTime).format(now);
    const dateStr = new Intl.DateTimeFormat('fr-FR', optionsDate).format(now);

    // Correction : certains systèmes retournent "24" pour minuit — on normalise
    const parts   = timeStr.split(':').map(Number);
    const hours   = parts[0] % 24;
    const minutes = parts[1];
    const seconds = parts[2];

    return { hours, minutes, seconds, timeString: timeStr, dateString: dateStr };
}

// ============================================================
// Mettre à jour l'horloge (analogique ET numérique)
// ============================================================
function updateClock() {
    const selectedTimezone = timezoneSelect.value;
    const timeData         = getCurrentTimeInTimezone(selectedTimezone);

    // Affichage numérique
    if (digitalTimeElem) {
        digitalTimeElem.textContent = timeData.timeString;
    }

    if (dateDisplayElem) {
        const dated = timeData.dateString;
        dateDisplayElem.textContent = dated.charAt(0).toUpperCase() + dated.slice(1);
    }

    if (timezoneInfoElem) {
        const displayName = selectedTimezone === 'Africa/Tunis'
            ? 'Tunisie (CET)'
            : selectedTimezone.replace(/_/g, ' '); // Correction : remplace _ par espace pour lisibilité
        timezoneInfoElem.textContent = `Fuseau : ${displayName}`;
    }

    // Redessiner l'horloge analogique
    ctx.clearRect(0, 0, size, size);
    drawClockFace();
    drawHands(timeData.hours, timeData.minutes, timeData.seconds);
}

// ============================================================
// Appliquer les changements de couleurs
// ============================================================
function applyColorChanges() {
    colors.dial   = dialColorPicker.value;
    colors.hour   = hourColorPicker.value;
    colors.minute = minColorPicker.value;
    colors.second = secColorPicker.value;
    colors.marks  = markColorPicker.value;
    updateClock();
}

// ============================================================
// Réinitialiser les couleurs par défaut
// ============================================================
function resetColors() {
    dialColorPicker.value = '#ffffff';
    hourColorPicker.value = '#1a1a2e';
    minColorPicker.value  = '#16213e';
    secColorPicker.value  = '#ff6b6b';
    markColorPicker.value = '#c44569';
    applyColorChanges();

    showFeedback('🎨 Couleurs restaurées avec élégance');
}

// ============================================================
// Afficher un message feedback temporaire
// Correction : fonction réutilisable au lieu de code dupliqué
// ============================================================
function showFeedback(message) {
    if (!resetFeedback) return;

    resetFeedback.textContent = message;
    resetFeedback.classList.remove('show'); // Reset l'animation si déjà visible

    // Forcer un reflow pour relancer l'animation CSS
    void resetFeedback.offsetWidth;

    resetFeedback.classList.add('show');

    setTimeout(() => {
        resetFeedback.classList.remove('show');
    }, 2000);
}

// ============================================================
// Réinitialisation élégante — resynchronisation du temps
// ============================================================
function elegantReset() {
    updateClock();
    showFeedback('✨ Temps resynchronisé avec précision ✨');

    // Animation de flash sur le canvas
    const clockCanvas = document.getElementById('clockCanvas');
    if (clockCanvas) {
        clockCanvas.style.transition  = 'box-shadow 0.3s ease';
        clockCanvas.style.boxShadow   = '0 0 30px rgba(255, 215, 0, 0.8), 0 0 0 8px rgba(255, 215, 0, 0.3)';
        setTimeout(() => {
            clockCanvas.style.boxShadow = '';
        }, 500);
    }
}

// ============================================================
// Démarrer l'horloge
// ============================================================
let clockInterval = null;

function startClock() {
    if (clockInterval) {
        clearInterval(clockInterval);
    }
    clockInterval = setInterval(updateClock, 1000);
    updateClock(); // Premier affichage immédiat sans délai d'une seconde
}

// ============================================================
// Écouteurs d'événements
// ============================================================
if (dialColorPicker) dialColorPicker.addEventListener('input',  applyColorChanges);
if (hourColorPicker) hourColorPicker.addEventListener('input',  applyColorChanges);
if (minColorPicker)  minColorPicker.addEventListener('input',   applyColorChanges);
if (secColorPicker)  secColorPicker.addEventListener('input',   applyColorChanges);
if (markColorPicker) markColorPicker.addEventListener('input',  applyColorChanges);
if (resetBtn)        resetBtn.addEventListener('click',         resetColors);
if (timezoneSelect)  timezoneSelect.addEventListener('change',  updateClock);
if (elegantResetBtn) elegantResetBtn.addEventListener('click',  elegantReset);

// ============================================================
// Lancement
// ============================================================
startClock();

// Nettoyage à la fermeture de la page
window.addEventListener('beforeunload', () => {
    if (clockInterval) {
        clearInterval(clockInterval);
    }
});

// Animation subtile du point central de l'horloge
let angle = 0;
setInterval(() => {
    const center = document.querySelector('.clock-center');
    if (center) {
        angle += 0.02;
        center.style.transform = `scale(${1 + Math.sin(angle) * 0.05})`;
    }
}, 100);
