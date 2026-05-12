// data.js

// ==========================================
// WSTĘP DO HISTORII 1
// ==========================================
const introLines1 = [
    { text: "Jest 23:45. Dostajecie telefon z komisariatu.", img: "url('https://i.imgur.com/s6RhFkY.jpeg')" },
    { text: "Patrol policji prosi o pilny przyjazd zespołu mobilnego OIK do mieszkania w starym bloku.", img: "url('https://i.imgur.com/RiYj5Fy.jpeg')" },
    { text: "Sąsiedzi zgłosili awanturę. Wchodzicie na czwarte piętro. Drzwi są otwarte.", img: "url('https://i.imgur.com/3NJd82o.jpeg')" },
    { text: "W środku jest duszno, śmierdzi alkoholem i dymem. Dwóch policjantów próbuje uspokoić pijanego mężczyznę.", img: "url('https://i.imgur.com/uELPwPb.jpeg')" },
    { text: "Na kanapie siedzi zapłakana matka (Monika, 32 lata), a w wózku obok zanosi się płaczem 8-miesięczne niemowlę.", img: "url('https://i.imgur.com/v08COdY.jpeg')" }
];

// ==========================================
// WSTĘP DO HISTORII 2
// ==========================================
const introLines2 = [
    { text: "Jest wtorek, godzina 1:30 w nocy.", img: "url('https://i.imgur.com/3azTAWw.jpeg')" },
    { text: "Dostajecie zgłoszenie od patrolu policji, który właśnie kończy interwencję domową w kamienicy w centrum.", img: "url('https://i.imgur.com/jEmVNNS.jpeg')" },
    { text: "Syn (40 lat) wraz z żoną wyrzucił z mieszkania swoją matkę, Panią Marię (76 lat).", img: "url('https://i.imgur.com/fTwUe0h.jpeg')" },
    { text: "Syn jest trzeźwy, ale agresywny słownie. Policja nie ma podstaw do zatrzymania go, bo nie doszło do rękoczynów.", img: "url('https://i.imgur.com/jdHnVuO.jpeg')" },
    { text: "Wysiadacie z samochodu, uderza was przeraźliwy ziąb.", img: "url('https://i.imgur.com/T4lnp5Z.jpeg')" }
];

// ==========================================
// BAZA POSTACI
// ==========================================
const avatars = {
    police: ["https://i.imgur.com/Oki1vh9.jpeg", "Policjant"],
    monika_angry: ["https://i.imgur.com/aBwsX53.jpeg", "Monika (32 lata)"],
    narrator: ["", "Narrator"],
    medic: ["https://i.imgur.com/WYuZ8RJ.jpeg", "Lekarz Pogotowia"],
    maria: ["https://i.imgur.com/Cr9oSrW.jpeg", "Pani Maria (76 lat)"]
};

// ==========================================
// SCENY I DECYZJE
// ==========================================
const scenes = {
    // --- HISTORIA 1: Monice ---
    act1: { 
        avatar: "police",
        text: "(Mężczyzna szarpie się w tle. Monika krzyczy: 'Zostawcie go, nic się nie stało, wypier*** z mojego domu!'. Niemowlę dławi się od płaczu.)<br><br><b>Policjant:</b> Dobrze, że jesteście. My bierzemy gościa na izbę, zróbcie coś z tą kobietą i dzieckiem.", 
        choices: [
            { label: "[A] Pouczenie: 'Pani Moniko, jeśli natychmiast pani nie wytrzeźwieje i nie uspokoi dziecka, odbierzemy je pani!'", effects: { trust: -15 }, next: "act2", 
              feedback: "<strong>Poważny błąd.</strong> Straszenie pijanej matki odebraniem dziecka wywoła agresję skierowaną na Was." },
            { label: "[B] Dzielicie się zadaniami: Jedna osoba odciąga policję i mężczyznę na klatkę, druga podchodzi sprawdzić stan dziecka.", effects: { trust: 15 }, next: "act2", 
              feedback: "<strong>Doskonale!</strong> Złota zasada w terenie: separacja bodźców i podział ról. Dopóki w pokoju jest agresor, matka będzie w amoku. Triaż medyczny niemowlęcia to priorytet." },
            { label: "[C] Wyciągacie alkomat i żądacie od matki, żeby natychmiast dmuchnęła dla celów dowodowych.", effects: { trust: -15 }, next: "act2", 
              feedback: "<strong>Poważny błąd.</strong> Próba badania alkomatem skrajnie pobudzonej matki w tym momencie to eskalacja konfliktu." }
        ]
    },
    act2: { 
        avatar: "monika_angry",
        text: "(Policjanci wyprowadzili partnera. Zrobiło się ciszej, słychać płacz dziecka. Monika patrzy na Was agresywnie i zasłania wózek ciałem.)<br><br><b>Monika (bełkocząc):</b> Nie dam wam mojego synka! Wy z opieki tylko zabieracie dzieci! Wyjdźcie stąd!", 
        choices: [
            { label: "[A] Zbliżacie się szybko, odpychacie ją od wózka w imieniu prawa i wyjmujecie dziecko.", effects: { trust: -20 }, next: "act3", 
              feedback: "<strong>Błąd.</strong> Użycie siły doprowadzi do szarpaniny. Matka pod wpływem alkoholu i w stresie będzie fizycznie walczyć o dziecko, narażając je na niebezpieczeństwo." },
            { label: "[B] Zachowując dystans, spokojnym głosem: 'Pani Moniko, chcemy pomóc. Synkowi jest gorąco. Proszę go przytulić, pomożemy zrobić mleko.'", effects: { trust: 20 }, next: "act3", 
              feedback: "<strong>Świetny ruch!</strong> Zamiast walczyć, wspieracie jej kompetencje rodzicielskie. Dajecie proste zadanie fizyczne. To odwraca ją od agresji i pozwala ocenić, czy w ogóle trzyma się na nogach." },
            { label: "[C] Ignorujecie matkę i dzwonicie po pogotowie, uznając, że rozmowa z nietrzeźwą nie ma sensu.", effects: { trust: -10 }, next: "act3", 
              feedback: "<strong>Niepoprawnie.</strong> Całkowite ignorowanie matki, która wciąż fizycznie zasłania wózek, potęguje jej paranoję i poczucie zagrożenia." }
        ]
    },
    act3: { 
        avatar: "narrator",
        text: "(Monika próbuje wziąć dziecko, ale chwieje się tak mocno, że prawie je upuszcza. Bełkocze coś, kładzie się na kanapie, odwraca plecami i... zasypia z upojenia alkoholowego. Dziecko leży w zabrudzonym pampersie w zimnym pokoju. Brak trzeźwej rodziny.)", 
        choices: [
            { label: "[A] Zabieracie dziecko do swojego samochodu i wieziecie prosto do Domu Dziecka, żeby miało ciepło.", effects: { trust: -15 }, next: "act4", 
              feedback: "<strong>Błąd proceduralny (samowolka).</strong> Pracownik OIK nie może prywatnym transportem wywieźć dziecka bez uruchomienia oficjalnej procedury na miejscu zdarzenia." },
            { label: "[B] Z policjantem i lekarzem podejmujecie decyzję o odebraniu dziecka (Art. 12a Ustawy o przemocy).", effects: { trust: 25 }, next: "act4", 
              feedback: "<strong>Poprawnie!</strong> Zastosowaliście Art. 12a. W sytuacji bezpośredniego zagrożenia życia/zdrowia pracownik socjalny odbiera dziecko, ale musi to zrobić wspólnie z policjantem i medykiem." },
            { label: "[C] Zamykacie mieszkanie na klucz zostawiając matkę z niemowlęciem (skoro śpi, nie jest agresywna).", effects: { trust: -35 }, next: "act4", 
              feedback: "<strong>Krytyczny błąd!</strong> Zostawienie 8-miesięcznego dziecka z nieprzytomną matką to narażenie na utratę życia i prokurator dla Was. Musisz natychmiast wezwać pogotowie." }
        ]
    },
    act4: {
        avatar: "medic",
        text: "(Przyjechało pogotowie. Lekarz zbadał wychłodzone niemowlę. Życiu nie zagraża niebezpieczeństwo.)<br><br><b>Lekarz:</b> Dziecko nie wymaga hospitalizacji, jest po prostu zaniedbane. Co z nim robimy, bierzemy na oddział dziecięcy?",
        choices: [
            { label: "[A] 'Tak, weźcie go na pediatrię, niech poleży tam kilka dni, aż matka wytrzeźwieje.'", effects: { trust: -10 }, next: "s1_end", 
              feedback: "<strong>Błąd.</strong> Szpital to ostateczność dla zdrowych dzieci – generuje to straumatyzowanie. Dziecko w szpitalu często leży samo w metalowym łóżeczku bez bliskości." },
            { label: "[B] Wzywacie pracownika PCPR i kierujecie dziecko do Pogotowia Rodzinnego.", effects: { trust: 20 }, next: "s1_end", 
              feedback: "<strong>Idealnie!</strong> Znasz system pieczy zastępczej. Pogotowie Rodzinne to przeszkoleni opiekunowie, u których dziecko spędzi noc w ciepłych, domowych warunkach." },
            { label: "[C] Zabieracie niemowlę ze sobą na dyżurkę OIK-u i kładziecie spać w wolnym pokoju.", effects: { trust: -15 }, next: "s1_end", 
              feedback: "<strong>Błąd.</strong> OIK nie posiada personelu medycznego ani uprawnień do całodobowej opieki nad osamotnionym niemowlęciem." }
        ]
    },
    s1_end: {
        avatar: "narrator",
        text: "Służby przejęły kontrolę. Mężczyzna został zatrzymany, matka odsypia alkohol, a niemowlę zostało bezpiecznie przekazane do Pogotowia Rodzinnego.<br><br>Wracacie do samochodu, napięcie opada. Nagle jednak radio w policyjnym radiowozie obok ożywa. Oficer dyżurny przekazuje wam kolejny adres...",
        choices: [
            { label: "[Kolejne wezwanie] Ruszajcie w drogę", effects: {}, next: "trigger_intro_2", feedback: "end" }
        ]
    },

    // --- HISTORIA 2: Pani Maria ---
    s2_act1: { 
        avatar: "narrator",
        text: "(Pani Maria siedzi na drewnianej ławce pod blokiem, pod jedyną działającą latarnią. Ma na sobie cienki płaszcz zarzucony na koszulę nocną i domowe kapcie. Trzęsie się z zimna. Kiedy podchodzicie, patrzy tępo w okno na trzecim piętrze.)", 
        choices: [
            { label: "[A] Szybko i głośno pytacie: 'Pani Mario, proszę nam opowiedzieć co syn dokładnie powiedział', by sporządzić notatkę.", effects: { trust: -15 }, next: "s2_act2", 
              feedback: "<strong>Błąd.</strong> W tym stanie kobieta nie udzieli Wam logicznego wywiadu. Oczekiwanie od ofiary zeznań w głębokim stresie na mrozie to niepotrzebne obciążenie." },
            { label: "[B] Zabezpieczacie ją fizycznie: Jedna osoba prowadzi ją do ciepłego samochodu, druga daje koc termiczny i herbatę.", effects: { trust: 20 }, next: "s2_act2", 
              feedback: "<strong>Doskonale!</strong> W interwencji kryzysowej u seniorów fizjologia wyprzedza psychologię. Seniorzy szybciej wpadają w hipotermię i stany majaczeniowe ze stresu. Samochód to teraz neutralna strefa." },
            { label: "[C] Wyciągacie druk Niebieskiej Karty i zaczynacie go wypełniać na ławce.", effects: { trust: -15 }, next: "s2_act2", 
              feedback: "<strong>Błąd.</strong> Wypełnianie papierów na mrozie i ignorowanie stanu fizycznego starszej, zziębniętej kobiety zagraża jej zdrowiu i buduje barierę z interwentem." }
        ]
    },
    s2_act2: { 
        avatar: "maria",
        text: "(Pani Maria siedzi w ciepłym samochodzie. Powoli przestaje się trząść. Zaczyna płakać bezgłośnie.)<br><br><b>Pani Maria:</b> Ja przepraszam, że robię kłopot... To wszystko moja wina, nie powinnam się odzywać do synowej. To dobre dzieci, tylko ja jestem już taka stara...", 
        choices: [
            { label: "[A] Psychoedukujecie ją agresywnie: 'To nie pani wina! Syn nie ma prawa, to przemoc domowa! Musi pani walczyć!'", effects: { trust: -15 }, next: "s2_act3", 
              feedback: "<strong>Błąd (reakcja ratownika).</strong> Próba siłowej zmiany jej myślenia o 'walce z przemocą' uderzy w jej system obronny. Seniorzy boją się tego słowa, bo chronią swoje dzieci przed więzieniem." },
            { label: "[B] Kojącym głosem: 'To musiało być dla pani straszne przeżycie. Naturalne, że czuje się pani zawstydzona, ale pomożemy pani przetrwać tę noc.'", effects: { trust: 20 }, next: "s2_act3", 
              feedback: "<strong>Strzał w dziesiątkę.</strong> Użycie empatii i unieważnienie winy bez rzucania oskarżeń w stronę syna to klucz, który pozwala otworzyć ofiarę i zbudować zaufanie." },
            { label: "[C] Krótko: 'Dobrze, skoro tak pani uważa, to nie piszemy notatek, tylko zawieziemy panią w bezpieczne miejsce.'", effects: { trust: -10 }, next: "s2_act3", 
              feedback: "<strong>Niewłaściwe.</strong> Zignorowanie jej emocji sprawia, że czuje się zbywana, a rezygnacja z notatki służbowej to niedopełnienie obowiązków dokumentacyjnych z interwencji." }
        ]
    },
    s2_act3: { 
        avatar: "maria",
        text: "(Zegary wybijają 2:30. Nie możecie trzymać jej w aucie. Mieszkanie formalnie należy do syna, choć Maria ma dożywotnią służebność osobistą.)<br><br><b>Pani Maria:</b> Proszę... zawieźcie mnie do nich pod drzwi. Ja przeproszę, będę cicho w swoim pokoju. Nie przeżyję nocy w żadnym przytułku.", 
        choices: [
            { label: "[A] Zwozicie ją na górę i zmuszacie syna, by ją wpuścił na podstawie Aktu Notarialnego.", effects: { trust: -15 }, next: "s2_act4", 
              feedback: "<strong>Niebezpieczne.</strong> Służebność to prawo cywilne, którego nie egzekwuje się siłą o 2 w nocy. Zostawienie jej u rozwścieczonego syna to skazanie jej na pewną eskalację przemocy." },
            { label: "[B] Szanujecie jej autonomię, zostawiacie ją pod klatką i obiecujecie wrócić rano.", effects: { trust: -30 }, next: "s2_act4", 
              feedback: "<strong>Krytyczny błąd!</strong> Zostawienie wyrzuconej na bruk seniorki pod blokiem grozi jej utratą życia z wychłodzenia." },
            { label: "[C] Kategorycznie odmawiacie powrotu, tłumacząc, że w mieszkaniu trwa kryzys i musicie zabrać ją w bezpieczne miejsce.", effects: { trust: 25 }, next: "s2_act4", 
              feedback: "<strong>Poprawnie.</strong> To jedyna właściwa decyzja w fazie ostrej. Waszym obowiązkiem w OIK jest przede wszystkim ochrona zdrowia i bezpieczeństwa ofiary, nawet jeśli ta w emocjach chce wrócić do oprawcy." }
        ]
    },
    s2_act4: {
        avatar: "narrator",
        text: "(Pani Maria niechętnie godzi się na wyjazd, ale błaga: 'Tylko nie do umieralni, proszę...').<br><br><b>Dokąd decydujecie się ją przetransportować tej nocy?</b>",
        choices: [
            { label: "[A] Do noclegowni dla osób bezdomnych w trybie interwencyjnym.", effects: { trust: -10 }, next: "s2_end", 
              feedback: "<strong>Zła decyzja.</strong> Noclegownia to miejsce głośne i nieodpowiednie dla straumatyzowanego seniora po epizodzie przemocy domowej." },
            { label: "[B] Do Hostelu Ośrodka Interwencji Kryzysowej (OIK), do pokoju dla seniorów.", effects: { trust: 20 }, next: "s2_end", 
              feedback: "<strong>Idealnie.</strong> OIK to placówka specjalistyczna dla ofiar nagłych kryzysów, zapewniająca ciszę, bezpieczeństwo i opiekę psychologiczną od rana." },
            { label: "[C] Wzywacie pogotowie ratunkowe i zawozicie ją na SOR, żeby przeczekała do rana.", effects: { trust: -15 }, next: "s2_end", 
              feedback: "<strong>Błąd.</strong> Odsyłanie pacjentki bez obrażeń fizycznych na SOR to straumatyzowanie jej w warunkach szpitalnych i blokowanie zasobów medycznych ratujących życie." }
        ]
    },
    s2_end: {
        avatar: "narrator",
        text: "Starsza pani bezpiecznie zasnęła w ciepłym pokoju Hostelu OIK. Będzie miała zapewnioną pomoc psychologiczną i prawną po przebudzeniu. Ciężka noc powoli przechodzi w świt.<br><br>Wracacie do swojego gabinetu. Czas napisać tony dokumentacji i założyć Niebieską Kartę.",
        choices: [
            { label: "[Zakończ Zmianę] Przejdź do debriefingu", effects: {}, next: "end_screen", feedback: "end" }
        ]
    },
    end_screen: { end: true, text: "" }
};