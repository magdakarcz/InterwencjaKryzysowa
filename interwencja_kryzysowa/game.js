// game.js

// ==========================================
// PREŁADOWANIE GRAFIK W TLE
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const imagesToPreload = [
        'https://i.imgur.com/2rtSWFh.jpeg', // Tło startu
        'https://i.imgur.com/KlbtOwj.jpeg'  // Tło sceny głównej
    ];

    // Pobierz obrazki z obu intro
    introLines1.forEach(line => { const match = line.img.match(/url\(['"]?(.*?)['"]?\)/); if (match) imagesToPreload.push(match[1]); });
    introLines2.forEach(line => { const match = line.img.match(/url\(['"]?(.*?)['"]?\)/); if (match) imagesToPreload.push(match[1]); });

    // Pobierz wszystkie avatary
    for (const key in avatars) {
        if (avatars[key][0]) imagesToPreload.push(avatars[key][0]);
    }

    imagesToPreload.forEach(url => { const img = new Image(); img.src = url; });
    console.log("Wszystkie zasoby załadowane.");
});

// ==========================================
// SILNIK GRY (LOGIKA)
// ==========================================
let skipRequested = false;
let pendingChoice;

// Zmienne do omijania animacji tekstu i czekania
let isTyping = false;
let skipTyping = false;
let isWaitingDelay = false;
let skipDelay = false;

// Nasłuchiwacz kliknięć na całym ekranie (Skip Typing)
document.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'button') return;
    
    if (isTyping) {
        skipTyping = true;
    } else if (isWaitingDelay) {
        skipDelay = true;
    }
});

function typeText(el, text, speed = 25) {
    el.innerHTML = ""; 
    let i = 0; 
    let textBuffer = "";
    
    isTyping = true;
    skipTyping = false;
    
    return new Promise(resolve => {
        function t() {
            if (skipRequested && el.id === 'introStory') {
                isTyping = false;
                return resolve();
            }
            
            if (skipTyping) {
                el.innerHTML = text;
                isTyping = false;
                skipTyping = false;
                return resolve();
            }

            if (i < text.length) { 
                textBuffer += text[i];
                if (text[i] === '<') {
                    let endIdx = text.indexOf('>', i);
                    if (endIdx !== -1) {
                        textBuffer += text.substring(i + 1, endIdx + 1);
                        i = endIdx;
                    }
                }
                el.innerHTML = textBuffer;
                i++;
                setTimeout(t, speed); 
            } else {
                isTyping = false;
                resolve();
            }
        }
        t();
    });
}

async function playIntro(linesArray, nextSceneId) {
    skipRequested = false;
    
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('scene').style.display = "none";
    document.getElementById('dialogUI').style.display = "none";
    document.getElementById('stats').style.display = "none";
    
    const introPanel = document.getElementById('intro');
    introPanel.classList.add("active");
    
    for (const line of linesArray) {
        if (skipRequested) break;
        document.getElementById('introBg').style.backgroundImage = line.img;
        
        await typeText(document.getElementById('introStory'), line.text, 35);
        
        if (skipRequested) break;
        
        isWaitingDelay = true;
        skipDelay = false;
        
        await new Promise(r => {
            let elapsed = 0;
            let timer = setInterval(() => {
                elapsed += 100;
                if(elapsed >= 3500 || skipRequested || skipDelay) {
                    clearInterval(timer);
                    isWaitingDelay = false;
                    skipDelay = false;
                    r();
                }
            }, 100);
        });
    }

    introPanel.classList.remove("active");
    document.getElementById('scene').style.display = 'flex';
    document.getElementById('dialogUI').style.display = 'block';
    document.getElementById('stats').style.display = 'flex';
    
    engine.scene = nextSceneId;
    render();
}

function startIntro() { playIntro(introLines1, "act1"); }
function skipIntro() { skipRequested = true; }

class Engine {
    reset() { this.state = { trust: 50 }; this.scene = "act1"; }
    constructor() { this.reset(); }
    apply(e) { for (let k in e) { this.state[k] += e[k] || 0; } }
    choose(c) { 
        this.apply(c.effects); 
        this.scene = c.next; 
    }
}

const engine = new Engine();

function render() {
    if (engine.scene === "trigger_intro_2") {
        playIntro(introLines2, "s2_act1");
        return;
    }

    const s = scenes[engine.scene];
    const avatarKey = s.avatar || "narrator";
    
    const avatarEl = document.getElementById('avatar');
    if (avatars[avatarKey] && avatars[avatarKey][0] !== "") {
        avatarEl.style.display = "block";
        avatarEl.src = avatars[avatarKey][0];
        avatarEl.style.animation = 'none';
        avatarEl.offsetHeight; 
        avatarEl.style.animation = null;
    } else {
        avatarEl.style.display = "none";
    }

    if(avatars[avatarKey]) {
        document.getElementById('role').textContent = avatars[avatarKey][1];
    }
    
    document.getElementById('stats').textContent = `Profesjonalizm: ${engine.state.trust}`;
    document.getElementById('choices').innerHTML = ""; 
    
    typeText(document.getElementById('story'), s.text, 20).then(() => showChoices());
}

// Funkcja tasująca elementy tablicy (Algorytm Fishera-Yatesa)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showChoices() {
    const s = scenes[engine.scene];
    if (s.end) { showSummary(); return; }
    
    const choicesContainer = document.getElementById('choices');
    
    // Tasujemy wybory (tylko jeśli jest ich więcej niż 1, omijamy tasowanie przycisku "[Koniec]")
    let choicesToRender = s.choices;
    if (s.choices.length > 1) {
        choicesToRender = shuffleArray(s.choices);
    }

    choicesToRender.forEach(c => {
        // Usuwamy z labela tekst typu "[A] ", "[B] ", "[C] ", żeby po przetasowaniu nie myliły gracza
        let cleanLabel = c.label.replace(/^\[[A-Z]\]\s*/, '');
        
        let button = btn(cleanLabel, () => {
            handleChoiceClick(c);
        });
        
        if(c.next === "end_screen" || c.next === "trigger_intro_2") {
            button.classList.add("end-btn");
        }
        choicesContainer.appendChild(button);
    });
}

function handleChoiceClick(choice) {
    document.getElementById('choices').innerHTML = ""; 
    pendingChoice = choice;
    
    if(choice.feedback === "end") {
        engine.choose(pendingChoice);
        render();
        return;
    }

    document.getElementById('modalText').innerHTML = choice.feedback;
    document.getElementById('feedbackModal').classList.add('active');
}

function closeModal() {
    document.getElementById('feedbackModal').classList.remove('active');
    engine.choose(pendingChoice);
    render();
}

function btn(t, f) {
    const b = document.createElement("button");
    b.innerHTML = t;
    b.onclick = f;
    return b;
}

function showSummary() {
    document.getElementById('scene').style.display = "none";
    document.getElementById('dialogUI').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
    document.getElementById('summary').style.display = 'flex';

    let ocena = "";
    if (engine.state.trust >= 170) ocena = "🌟 Ekspert ds. Interwencji Kryzysowej";
    else if (engine.state.trust >= 100) ocena = "✅ Dobry Interwent (Solidna znajomość procedur)";
    else ocena = "❌ Szereg błędów (Zalecane doszkolenie)";

    document.getElementById('summaryText').innerHTML = `
        <strong>Twój wynik z całej zmiany: ${engine.state.trust} pkt</strong><br>
        <span style="color:#6c7cff; font-weight: bold;">${ocena}</span><br><br>
        "Przetrwaliście dyżur mobilny, zaliczając sprawy o najwyższym poziomie stresu. Widzieliście przemoc w rodzinie oraz kryzys senioralny. Zrozumieliście, że w kryzysie priorytetem jest zabezpieczyć fizjologię (ciepło), uśmierzyć wstyd ofiary i podjąć najtrudniejszą decyzję – odmówić klientowi powrotu do domu dla jego własnego bezpieczeństwa.<br><br>Wrócicie do bazy nad ranem, przemarznięci, by napisać tony dokumentacji i uruchomić Zespół Interdyscyplinarny. Witamy w pracy socjalnej!"
    `;
}

function restart() {
    engine.reset();
    document.getElementById('summary').style.display = 'none';
    startIntro(); 
}