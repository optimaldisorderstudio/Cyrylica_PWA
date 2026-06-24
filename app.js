"use strict";

const SETS = [
  { id: "similar", name: "Podobne" },
  { id: "false", name: "Fałszywi znajomi" },
  { id: "new", name: "Nowe spółgłoski" },
  { id: "vowels", name: "Samogłoski" },
  { id: "signs", name: "Znaki Ъ/Ь" }
];

const LETTERS = [
  l("А", "а", "a", ["a"], "similar", 0, "Jak polskie „a”.", "Najłatwiejszy punkt startu: wygląda i brzmi prawie tak samo.", [["арбуз", "arbuz", "arbuz"], ["мама", "mama", "mama"], ["она", "ona", "ona"]]),
  l("К", "к", "k", ["k"], "similar", 0, "Jak polskie „k”.", "K jak „kot”: kształt i brzmienie są znajome.", [["кот", "kot", "kot"], ["окно", "okno", "okno"], ["мак", "mak", "mak"]]),
  l("М", "м", "m", ["m"], "similar", 0, "Jak polskie „m”.", "Litera bez pułapki: wielka i mała wyglądają znajomo.", [["мир", "mir", "pokój/świat"], ["мама", "mama", "mama"], ["дом", "dom", "dom"]]),
  l("О", "о", "o", ["o"], "similar", 0, "Jak polskie „o”, w rosyjskim nieakcentowane bywa bliższe „a”.", "O wygląda znajomo, ale w prawdziwych słowach akcent może zmieniać brzmienie.", [["он", "on", "on"], ["дом", "dom", "dom"], ["окно", "akno", "okno"]]),
  l("Т", "т", "t", ["t"], "similar", 0, "Jak polskie „t”.", "Drukowane Т/т jest proste; w piśmie odręcznym mała forma może wyglądać inaczej.", [["там", "tam", "tam"], ["это", "eto", "to"], ["кот", "kot", "kot"]]),
  l("Е", "е", "je/e", ["e", "je"], "vowels", 0, "Na początku zwykle „je”, po spółgłosce często zmiękcza i brzmi jak „e”.", "Е jest ważne, bo oprócz dźwięku często zmiękcza poprzednią spółgłoskę.", [["есть", "jest'", "jest"], ["нет", "niet", "nie"], ["море", "morje", "morze"]]),

  l("В", "в", "w", ["w", "v"], "false", 1, "Wygląda jak B, ale brzmi jak polskie „w”.", "Najważniejszy fałszywy znajomy: В nigdy nie czytaj jak polskie B.", [["вода", "wada", "woda"], ["новый", "nowyj", "nowy"], ["лев", "ljew", "lew"]]),
  l("Н", "н", "n", ["n"], "false", 1, "Wygląda jak H, ale brzmi „n”.", "Poprzeczka pomaga zapamiętać: to bardziej N niż H.", [["нос", "nos", "nos"], ["она", "ona", "ona"], ["сын", "syn", "syn"]]),
  l("Р", "р", "r", ["r"], "false", 1, "Wygląda jak P, ale brzmi „r”.", "Р to rosyjskie R, często wyraźnie drżące.", [["рука", "ruka", "ręka"], ["море", "morje", "morze"], ["мир", "mir", "pokój/świat"]]),
  l("С", "с", "s", ["s"], "false", 1, "Wygląda jak C, ale brzmi „s”.", "С czytaj jak polskie S, nie jak C.", [["сын", "syn", "syn"], ["весна", "wiesna", "wiosna"], ["нос", "nos", "nos"]]),
  l("У", "у", "u", ["u"], "false", 1, "Jak polskie „u”.", "Wygląda trochę jak Y, ale brzmi prosto: u.", [["утро", "utra", "poranek"], ["рука", "ruka", "ręka"], ["иду", "idu", "idę"]]),
  l("Х", "х", "ch", ["ch", "h"], "false", 1, "Jak polskie „ch”.", "Nie czytaj jak „ks”. To gardłowe ch.", [["хлеб", "chlieb", "chleb"], ["тихо", "ticha", "cicho"], ["мех", "miech", "futro"]]),

  l("Б", "б", "b", ["b"], "new", 2, "Jak polskie „b”.", "Daszek nad brzuszkiem: Б to b.", [["брат", "brat", "brat"], ["рыба", "ryba", "ryba"], ["хлеб", "chlieb", "chleb"]]),
  l("Г", "г", "g", ["g"], "new", 2, "Jak polskie „g”.", "Г wygląda jak hak; hak zahacza o głoskę g.", [["город", "gorod", "miasto"], ["нога", "noga", "noga"], ["друг", "druk", "przyjaciel"]]),
  l("Д", "д", "d", ["d"], "new", 2, "Jak polskie „d”.", "Д przypomina domek na nóżkach: dom zaczyna się od d.", [["дом", "dom", "dom"], ["вода", "wada", "woda"], ["сад", "sat", "sad"]]),
  l("Ж", "ж", "ż", ["ż", "z", "zh"], "new", 2, "Jak polskie „ż”.", "Żuk ma wiele odnóży; Ж też ma wiele ramion.", [["жук", "żuk", "chrząszcz"], ["жизнь", "żyzn'", "życie"], ["нож", "noż", "nóż"]]),
  l("З", "з", "z", ["z"], "new", 2, "Jak polskie „z”.", "Wygląda jak odwrócone/zaokrąglone Z.", [["зима", "zima", "zima"], ["музыка", "muzyka", "muzyka"], ["глаз", "głaz", "oko"]]),
  l("И", "и", "i", ["i"], "vowels", 2, "Jak polskie „i”.", "И wygląda jak odwrócone N, ale brzmi prosto: i.", [["имя", "imia", "imię"], ["мир", "mir", "pokój/świat"], ["такси", "taksi", "taksówka"]]),
  l("Й", "й", "j", ["j", "y"], "vowels", 2, "Krótkie „j”.", "Й to И z daszkiem: krótsze, bardziej spółgłoskowe.", [["йогурт", "jogurt", "jogurt"], ["мой", "moj", "mój"], ["твой", "twoj", "twój"]]),
  l("Л", "л", "l", ["l", "ł"], "new", 2, "Rosyjskie л bywa ciemniejsze niż polskie l; przed miękkimi samogłoskami mięknie.", "Л wygląda jak namiot oparty o ziemię.", [["луна", "luna", "księżyc"], ["молоко", "małako", "mleko"], ["стол", "stoł", "stół"]]),
  l("П", "п", "p", ["p"], "new", 2, "Jak polskie „p”.", "П wygląda jak brama: przez bramę przechodzi p.", [["папа", "papa", "tata"], ["лампа", "lampa", "lampa"], ["суп", "sup", "zupa"]]),
  l("Ф", "ф", "f", ["f"], "new", 2, "Jak polskie „f”.", "Ф wygląda jak kółko przecięte pionową kreską: łatwo odróżnić od łacinki.", [["фото", "foto", "zdjęcie"], ["кафе", "kafe", "kawiarnia"], ["шарф", "szarf", "szalik"]]),
  l("Ц", "ц", "c", ["c", "ts"], "new", 2, "Jak polskie „c” w „co”.", "Ц ma ogonek: to c, nie cz.", [["центр", "centr", "centrum"], ["улица", "ulica", "ulica"], ["отец", "atiec", "ojciec"]]),
  l("Ч", "ч", "cz", ["cz", "ch"], "new", 2, "Jak polskie „cz”.", "Ч wygląda jak mała filiżanka: „czarka” zaczyna się od cz.", [["чай", "czaj", "herbata"], ["вечер", "wieczer", "wieczór"], ["ночь", "nocz'", "noc"]]),
  l("Ш", "ш", "sz", ["sz", "sh"], "new", 2, "Jak polskie „sz”.", "Trzy pionowe kreski robią szerokie sz.", [["школа", "szkoła", "szkoła"], ["машина", "maszyna", "samochód"], ["душ", "dusz", "prysznic"]]),

  l("Ё", "ё", "jo", ["jo", "yo"], "vowels", 3, "Jak „jo”; zawsze akcentowane, choć kropki w tekstach bywają pomijane.", "Dwie kropki są sygnałem: czytaj jo.", [["ёлка", "jołka", "choinka"], ["моё", "majo", "moje"], ["бельё", "bieljo", "bielizna"]]),
  l("Ы", "ы", "y", ["y"], "vowels", 3, "Twarde rosyjskie „y”, zwykle po twardej spółgłosce.", "Ы nie występuje na początku rodzimych rosyjskich słów; ćwicz ją w środku i na końcu.", [["—", "—", "rzadko na początku"], ["сыр", "syr", "ser"], ["ты", "ty", "ty"]]),
  l("Э", "э", "e", ["e"], "vowels", 3, "Twarde „e”, bez początkowego j i bez zmiękczenia.", "Э mówi: tu ma być zwykłe e, nie je.", [["это", "eta", "to"], ["поэт", "paet", "poeta"], ["кафе", "kafe", "kawiarnia"]]),
  l("Ю", "ю", "ju", ["ju", "yu"], "vowels", 3, "Jak „ju”; po spółgłosce zmiękcza ją i daje dźwięk u.", "Ю wygląda jak O podłączone do kreski: zapamiętaj jako ju.", [["юг", "juk", "południe"], ["люблю", "lublu", "kocham"], ["мою", "maju", "moją/myję"]]),
  l("Я", "я", "ja", ["ja", "ya"], "vowels", 3, "Jak „ja”; po spółgłosce zmiękcza ją i daje dźwięk a.", "Я wygląda obco, ale mówi „ja”.", [["я", "ja", "ja"], ["мясо", "miaso", "mięso"], ["семья", "siemja", "rodzina"]]),
  l("Щ", "щ", "szcz", ["szcz", "shch"], "new", 3, "Zbliżone do polskiego „szcz”, często bardziej miękkie.", "Щ to Ш z ogonkiem: do sz dodaj cz.", [["щука", "szczuka", "szczupak"], ["овощи", "owoszczi", "warzywa"], ["борщ", "borszcz", "barszcz"]]),
  l("Ъ", "ъ", "twardy znak", ["twardy znak", "ъ"], "signs", 3, "Nie ma własnego dźwięku. Oddziela spółgłoskę od jotowanej samogłoski.", "Ъ jest separatorem: po nim słyszysz wyraźne j w е/ё/ю/я.", [["съезд", "sjezd", "zjazd"], ["объём", "objom", "objętość"], ["—", "—", "nie występuje typowo na końcu"]]),
  l("Ь", "ь", "miękki znak", ["miękki znak", "miekki znak", "ь"], "signs", 3, "Nie ma własnego dźwięku. Zmiękcza poprzednią spółgłoskę.", "Ь działa jak znak miękkości. Porównaj: брат/brat i брать/brat' = brać.", [["день", "dien'", "dzień"], ["письмо", "pismo", "list"], ["конь", "kon'", "koń"]])
];

function l(upper, lower, latin, aliases, set, level, hint, memo, examples) {
  return {
    c: upper,
    lower,
    latin,
    aliases,
    set,
    level,
    hint,
    memo,
    examples: examples.map(([word, transcription, meaning]) => ({ word, transcription, meaning })),
    say: (examples.find((item) => item[0] !== "—") || [upper])[0]
  };
}

const STORAGE_KEY = "cyrylica-pwa-state-v2";
const state = loadState();
let currentView = "start";
let currentFlash = null;
let currentQuiz = null;
let currentTyping = null;
let selectedPair = null;
let audioContext = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function loadState() {
  const base = {
    level: 0,
    selectedSets: SETS.map((set) => set.id),
    displayMode: "pair",
    theme: "light",
    sound: true,
    stats: { correct: 0, total: 0, streak: 0 },
    progress: {}
  };
  try {
    return { ...base, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeLetters() {
  const sets = state.selectedSets && state.selectedSets.length ? state.selectedSets : SETS.map((set) => set.id);
  const letters = LETTERS.filter((letter) => letter.level <= state.level && sets.includes(letter.set));
  return letters.length ? letters : LETTERS.filter((letter) => letter.level <= state.level);
}

function progressFor(letter) {
  if (!state.progress[letter.c]) {
    state.progress[letter.c] = { seen: 0, correct: 0, mastery: 0 };
  }
  return state.progress[letter.c];
}

function weightedLetter() {
  const pool = activeLetters();
  const weighted = [];
  pool.forEach((letter) => {
    const progress = progressFor(letter);
    const weight = Math.max(1, 5 - progress.mastery) + (progress.seen === 0 ? 3 : 0);
    for (let i = 0; i < weight; i += 1) weighted.push(letter);
  });
  return weighted[Math.floor(Math.random() * weighted.length)] || pool[0] || LETTERS[0];
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function normalize(value) {
  return value.trim().toLowerCase()
    .replace(/ó/g, "o")
    .replace(/ą/g, "a")
    .replace(/ę/g, "e")
    .replace(/ł/g, "l")
    .replace(/ż/g, "z")
    .replace(/ź/g, "z")
    .replace(/ś/g, "s")
    .replace(/ć/g, "c")
    .replace(/ń/g, "n");
}

function updateProgress(letter, correct, strength = 1) {
  const progress = progressFor(letter);
  progress.seen += 1;
  if (correct) {
    progress.correct += 1;
    progress.mastery = Math.min(5, progress.mastery + strength);
    state.stats.correct += 1;
    state.stats.streak += 1;
  } else {
    progress.mastery = Math.max(0, progress.mastery - 1);
    state.stats.streak = 0;
  }
  state.stats.total += 1;
  saveState();
  renderStats();
}

function renderStats() {
  const known = LETTERS.filter((letter) => progressFor(letter).mastery >= 4).length;
  const accuracy = state.stats.total ? Math.round((state.stats.correct / state.stats.total) * 100) : 0;
  $("#statKnown").textContent = String(known);
  $("#statStreak").textContent = String(state.stats.streak || 0);
  $("#statAccuracy").textContent = `${accuracy}%`;
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  saveState();
}

function setLevel(level) {
  state.level = Number(level);
  renderLevelSelect();
  saveState();
  rerenderLearningViews();
  toast(`Poziom ${state.level}`);
}

function setView(view) {
  currentView = view;
  $$(".view").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
  $$(".nav-link").forEach((node) => node.classList.toggle("active", node.dataset.view === view));
  location.hash = view;
  $("#sidebar").classList.remove("open");
  if (view === "fiszki") nextFlash();
  if (view === "quiz") nextQuiz();
  if (view === "pisanie") nextTyping();
  if (view === "pary") buildPairs();
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 3200);
}

function ensureAudio() {
  if (!state.sound) return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function chime(type = "ok") {
  const ctx = ensureAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  const notes = type === "ok" ? [523, 659, 784] : type === "bad" ? [220, 185] : [392, 523];
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.055, now + index * 0.08 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.2);
  });
}

function speak(letter) {
  chime("tap");
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(letter.say);
  utterance.lang = "ru-RU";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function speakText(text) {
  chime("tap");
  if (!text || text === "—" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function flagLabel(kind) {
  const isLatin = kind === "latin";
  return `<span class="script-label ${isLatin ? "latin" : ""}" aria-label="${isLatin ? "Zapis polski" : "Zapis rosyjski"}">${isLatin ? "🇵🇱" : "🇷🇺"}</span>`;
}

function displayCyr(letter) {
  if (state.displayMode === "upper") return letter.c;
  if (state.displayMode === "lower") return letter.lower;
  if (state.displayMode === "mixed") return Math.random() > 0.5 ? letter.c : letter.lower;
  return `${letter.c} ${letter.lower}`;
}

function exampleHtml(letter, compact = false) {
  const rows = letter.examples.map((example, index) => {
    const label = ["początek", "środek", "koniec"][index] || "przykład";
    return `<li><button type="button" data-say-word="${example.word}" ${example.word === "—" ? "disabled" : ""}><span>${label}</span><b lang="ru">${example.word}</b><em>${example.transcription}</em><small>${example.meaning}</small></button></li>`;
  }).join("");
  return `<ul class="${compact ? "examples compact" : "examples"}">${rows}</ul>`;
}

function firstExample(letter) {
  const item = letter.examples.find((example) => example.word !== "—") || letter.examples[0];
  return `${item.word} - ${item.transcription} - ${item.meaning}`;
}

function renderSetSelect() {
  $("#setSelect").innerHTML = SETS.map((set) => `
    <label class="set-option">
      <input type="checkbox" value="${set.id}" ${state.selectedSets.includes(set.id) ? "checked" : ""}>
      <span>${set.name}</span>
    </label>
  `).join("");
}

function renderLevelSelect() {
  $$("#levelSelect button").forEach((button) => {
    button.classList.toggle("selected", Number(button.dataset.level) === state.level);
  });
}

function renderDisplayMode() {
  $$("#displayMode button").forEach((button) => {
    button.classList.toggle("selected", button.dataset.mode === state.displayMode);
  });
}

function rerenderLearningViews() {
  renderLetters();
  nextFlash();
  nextQuiz();
  nextTyping();
  buildPairs();
}

function renderLetters() {
  const search = $("#letterSearch");
  const query = normalize(search ? search.value : "");
  const grid = $("#lettersGrid");
  if (!grid) return;
  const cards = activeLetters().filter((letter) => {
    const blob = normalize(`${letter.c} ${letter.lower} ${letter.latin} ${letter.hint} ${letter.memo} ${letter.set} ${letter.examples.map((e) => `${e.word} ${e.transcription} ${e.meaning}`).join(" ")}`);
    return !query || blob.includes(query);
  });
  grid.innerHTML = cards.map((letter) => {
    const progress = progressFor(letter);
    const foundSet = SETS.find((set) => set.id === letter.set);
    const setName = foundSet ? foundSet.name : letter.set;
    return `
      <article class="letter-card">
        <div class="letter-main">
          <span>${displayCyr(letter)}</span>
        </div>
        <div class="letter-meta">
          <b>${flagLabel("latin")} ${letter.latin}</b>
          <span>${letter.hint}</span>
          <small class="muted">${setName} · poziom ${letter.level} · opanowanie ${progress.mastery}/5</small>
          <p class="memo">${letter.memo}</p>
          ${exampleHtml(letter)}
        </div>
      </article>`;
  }).join("");
}

function nextFlash() {
  currentFlash = weightedLetter();
  const flashcard = $("#flashcard");
  if (flashcard) flashcard.classList.remove("flipped");
  $("#flashLetter").textContent = displayCyr(currentFlash);
  $("#flashAnswer").textContent = currentFlash.latin;
  $("#flashHint").textContent = currentFlash.hint;
  $("#flashExamples").innerHTML = exampleHtml(currentFlash, true);
}

function scoreFlash(score) {
  if (!currentFlash) return;
  const value = Number(score);
  updateProgress(currentFlash, value > 0, value || 1);
  chime(value > 0 ? "ok" : "bad");
  nextFlash();
}

function nextQuiz() {
  currentQuiz = weightedLetter();
  const pool = activeLetters().filter((letter) => letter.c !== currentQuiz.c);
  const options = shuffle([currentQuiz, ...shuffle(pool).slice(0, 3)]);
  $("#quizLetter").textContent = displayCyr(currentQuiz);
  $("#quizExample").textContent = firstExample(currentQuiz);
  $("#quizExample").dataset.sayWord = currentQuiz.say;
  $("#quizFeedback").textContent = "";
  $("#quizOptions").innerHTML = options.map((letter) => (
    `<button class="option-button" type="button" data-answer="${letter.c}">${flagLabel("latin")}${letter.latin}</button>`
  )).join("");
}

function answerQuiz(char, button) {
  const correct = char === currentQuiz.c;
  button.classList.add(correct ? "correct" : "wrong");
  updateProgress(currentQuiz, correct, 1);
  $("#quizFeedback").textContent = correct ? `Dobrze: ${currentQuiz.c}/${currentQuiz.lower} = ${currentQuiz.latin}` : `Poprawnie: ${currentQuiz.latin}.`;
  chime(correct ? "ok" : "bad");
  setTimeout(nextQuiz, 1100);
}

function nextTyping() {
  currentTyping = weightedLetter();
  $("#typingLetter").textContent = displayCyr(currentTyping);
  $("#typingExample").textContent = firstExample(currentTyping);
  $("#typingExample").dataset.sayWord = currentTyping.say;
  $("#typingInput").value = "";
  $("#typingFeedback").textContent = "";
}

function answerTyping() {
  const value = normalize($("#typingInput").value);
  const accepted = currentTyping.aliases.map(normalize);
  const correct = accepted.includes(value);
  updateProgress(currentTyping, correct, 2);
  $("#typingFeedback").textContent = correct ? "Dobrze." : `Poprawnie: ${currentTyping.latin}`;
  chime(correct ? "ok" : "bad");
  setTimeout(nextTyping, correct ? 750 : 1500);
}

function buildPairs() {
  const sample = shuffle(activeLetters()).slice(0, 4);
  const cards = shuffle([
    ...sample.map((letter) => ({ id: letter.c, label: displayCyr(letter), type: "CYRYLICA" })),
    ...sample.map((letter) => ({ id: letter.c, label: letter.latin, type: "ŁACINKA" }))
  ]);
  selectedPair = null;
  $("#pairsBoard").innerHTML = cards.map((card, index) => (
    `<button class="pair-card" type="button" data-id="${card.id}" data-type="${card.type}" data-index="${index}">
      ${flagLabel(card.type === "ŁACINKA" ? "latin" : "cyr")}
      <b>${card.label}</b>
    </button>`
  )).join("");
}

function pickPair(button) {
  if (button.classList.contains("matched")) return;
  if (!selectedPair) {
    selectedPair = button;
    button.classList.add("selected");
    chime("tap");
    return;
  }
  if (selectedPair === button) {
    selectedPair.classList.remove("selected");
    selectedPair = null;
    return;
  }
  const match = selectedPair.dataset.id === button.dataset.id && selectedPair.dataset.type !== button.dataset.type;
  const letter = LETTERS.find((item) => item.c === button.dataset.id);
  button.classList.add(match ? "matched" : "wrong");
  selectedPair.classList.add(match ? "matched" : "wrong");
  selectedPair.classList.remove("selected");
  updateProgress(letter, match, 1);
  chime(match ? "ok" : "bad");
  const previous = selectedPair;
  selectedPair = null;
  if (!match) {
    setTimeout(() => {
      button.classList.remove("wrong");
      previous.classList.remove("wrong");
    }, 800);
  } else if ($$(".pair-card:not(.matched)").length === 0) {
    setTimeout(() => {
      toast("Runda ukończona");
      buildPairs();
    }, 900);
  }
}

function resetProgress() {
  state.stats = { correct: 0, total: 0, streak: 0 };
  state.progress = {};
  saveState();
  renderStats();
  renderLetters();
  toast("Postęp wyczyszczony");
}

function bindEvents() {
  $("#navToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#soundToggle").addEventListener("click", () => {
    state.sound = !state.sound;
    $("#soundToggle").setAttribute("aria-label", state.sound ? "Dźwięk włączony" : "Dźwięk wyłączony");
    $("#soundToggle").textContent = state.sound ? "♪" : "×";
    saveState();
    chime("tap");
  });
  $("#themeToggle").addEventListener("click", () => setTheme(state.theme === "dark" ? "light" : "dark"));

  $$(".nav-link").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    setView(link.dataset.view);
  }));
  $$("[data-jump]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.jump)));
  $$("#levelSelect button").forEach((button) => button.addEventListener("click", () => setLevel(button.dataset.level)));

  $("#setSelect").addEventListener("change", () => {
    state.selectedSets = $$("#setSelect input:checked").map((input) => input.value);
    if (!state.selectedSets.length) {
      state.selectedSets = SETS.map((set) => set.id);
      renderSetSelect();
      toast("Zostawiam wszystkie zestawy, żeby ćwiczenia nie były puste.");
    }
    saveState();
    rerenderLearningViews();
  });
  $("#selectAllSets").addEventListener("click", () => {
    state.selectedSets = SETS.map((set) => set.id);
    renderSetSelect();
    saveState();
    rerenderLearningViews();
  });
  $$("#displayMode button").forEach((button) => button.addEventListener("click", () => {
    state.displayMode = button.dataset.mode;
    renderDisplayMode();
    saveState();
    rerenderLearningViews();
  }));

  $("#letterSearch").addEventListener("input", renderLetters);
  $("#lettersGrid").addEventListener("click", (event) => {
    const exampleButton = event.target.closest("[data-say-word]");
    if (exampleButton) speakText(exampleButton.dataset.sayWord);
  });
  $("#flashExamples").addEventListener("click", (event) => {
    const exampleButton = event.target.closest("[data-say-word]");
    if (exampleButton) {
      event.stopPropagation();
      speakText(exampleButton.dataset.sayWord);
    }
  });

  $("#flashcard").addEventListener("click", () => {
    $("#flashcard").classList.toggle("flipped");
    chime("tap");
  });
  $("#flashcard").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      $("#flashcard").click();
    }
  });
  $("#flashNext").addEventListener("click", nextFlash);
  $$("[data-flash-score]").forEach((button) => button.addEventListener("click", () => scoreFlash(button.dataset.flashScore)));

  $("#quizSpeak").addEventListener("click", () => speak(currentQuiz));
  $("#quizExample").addEventListener("click", () => speakText($("#quizExample").dataset.sayWord));
  $("#quizOptions").addEventListener("click", (event) => {
    const button = event.target.closest(".option-button");
    if (button) answerQuiz(button.dataset.answer, button);
  });

  $("#typingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    answerTyping();
  });
  $("#typingExample").addEventListener("click", () => speakText($("#typingExample").dataset.sayWord));

  $("#pairsReset").addEventListener("click", buildPairs);
  $("#pairsBoard").addEventListener("click", (event) => {
    const button = event.target.closest(".pair-card");
    if (button) pickPair(button);
  });

  $("#resetProgress").addEventListener("click", resetProgress);

  window.addEventListener("hashchange", () => {
    const view = location.hash.replace("#", "") || "start";
    if (view !== currentView && $(`#view-${view}`)) setView(view);
  });
}

function init() {
  if (!Array.isArray(state.selectedSets)) state.selectedSets = SETS.map((set) => set.id);
  if (!state.displayMode) state.displayMode = "pair";
  setTheme(state.theme || "light");
  $("#soundToggle").textContent = state.sound ? "♪" : "×";
  renderLevelSelect();
  renderSetSelect();
  renderDisplayMode();
  bindEvents();
  renderStats();
  rerenderLearningViews();
  const initialView = location.hash.replace("#", "") || "start";
  setView($(`#view-${initialView}`) ? initialView : "start");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

document.addEventListener("DOMContentLoaded", init);
