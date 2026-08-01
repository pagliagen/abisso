const STUDY_ART = `+------------------------------------------------------------------+
|                                                                  |
| +------------+    +-----------------+          .--.       +-----+|
| | [#l:[il#:il|    | \\    \\    \\     |        ( ~~~~ )     |     ||
| | #l:[il#:il:|    |   \\    \\    \\   |       (  ~~~~~~  )  |     ||
| | l:[il#:il:[|    |     \\    \\    \\ |        ( ~~~~ )     |     ||
| +-:[il#:il:[#+    |       \\    \\    |          '--'       |     ||
| | [il#:il:[#l|    |         \\    \\  |           ||        |     ||
| | il#:il:[#l:|    |           \\    \\|      +-----------+  |     ||
| | l#:il:[#l:[|    +-----------------+      | : :  o  : :  |     ||
| | #:il:[#l:[i|                             | : :     : :  |   o ||
| +------------+                             +-----------+  |     ||
| [ porta della camera ]                                    |     ||
|                +-----------------------+                  |     ||
|                | ~~  M A P P A  ~~     |                  |     ||
|                |  .   .   .   .   .    |                  |     ||
|                |    (+)  compasso      |                  |     ||
|                |  '   '   '   '   .    |                  |     ||
|                +-----------------------+                  |     ||
|                                                           +-----+|
|  /\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/                       |
+------------------------------------------------------------------+`;

const PIER_ART = `+------------------------------------------------------------------+
|                                                                  |
|   |     .     .     .     .     .     .   | +-------------+      |
|   |     .     .     .     .     .     .   | |    ___      |      |
|   |     .     .     .     .     .     .   | |   /   \\     |      |
|   |     .     .     .     .     .     .   | |  /     \\    |      |
|   |     .     .     .     .     .     .   | | |  ()  |    |      |
|   |     .     .     .     .     .     .   | |  |     |    |      |
|   |      o    .     .     .     .     .   | |  |     |    |      |
|   |    /|\\    .     .     .     .     .   | |  |     |    |      |
|   |    / \\    .     .     .     .     .   | |  | +---+    |      |
|   |  ~~ rete ~~     .     .     .     .   | |  | |: :|    |      |
|   |     .     .     .     .     .     .   | | +--|--+|    |      |
|   |     .     .     .     .     .     .   | +----+---+----+      |
| ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~|
+------------------------------------------------------------------+`;

const ENTRANCE_ART = `+------------------------------------------------------------------+
|                                                                  |
|                       +---------------+                          |
|    Y                  |   scala a     |                          |
|  -+-                  |  ))))         |                          |
|   | |                 |      ))))     |                          |
|   | |                 |  ))))         |                          |
|  cappotto             |      ))))     |                          |
|                       |  ))))         |                          |
|                       |      ))))     |                          |
|                       |  ))))         |                          |
|                       |      ))))     |                          |
|                       |  ))))         |         +---------+      |
|                       |               |         |  : :    |      |
|                       +--chiocciola---+         |         |      |
|         . . . o . . o . .                       |         |      |
|                                                 +---------+      |
+------------------------------------------------------------------+`;

const BEDROOM_ART = `+------------------------------------------------------------------+
|                                                                  |
|  +--------------------+               +---------+                |
|  | ////////////////   |               |         |                |
|  | lenzuola a terra   |               |         |                |
|  |                    |               |  : tu : |                |
|  |                    |               |         |                |
|  |                    |               |         |                |
|  +--------------------+               |         |                |
|  +--------+                           +---------+                |
|  | lettera|                                                      |
|  |        |                                          +--------+  |
|  +--------+                                          | : :    |  |
|                                                      |        |  |
+------------------------------------------------------+--------+--+`;

const CELLAR_ART = `+------------------------------------------------------------------+
|                                                                  |
| +---------------------+                         +---------+      |
| |                     |                         | su >    |      |
| |  @ spiral @         |                         |         |      |
| |  ~ simboli ~        |                         |         |      |
| |  @ incisi  @        |                         |         |      |
| |                     |                         +---------+      |
| |                     |                         +---------+      |
| +---------------------+                         |scala di |      |
|                                                 |servizio |      |
|                           . . o . . o . .       |         |      |
|                         (scendono e svaniscono) |         |      |
|                                                 +---------+      |
+------------------------------------------------------------------+`;

const LAMP_ART = `+------------------------------------------------------------------+
|                                                                  |
|                         +---------------+       +-----------+    |
|                         |               |       |           |    |
|                         |  ( lampada )  |       |           |    |
|                         |  (  spenta )  |       | il mare   |    |
|                         |               |       |           |    |
|                         |               |       |           |    |
|                         +---------------+       |           |    |
|                                                 |           |    |
|                                                 +-----------+    |
| +---------+                 [ scarpe ]                           |
| |giù <    |                                                      |
| |         |                                                      |
+-+---------+------------------------------------------------------+`;

const verbLabels = { guarda: "Guarda", usa: "Usa", prendi: "Prendi", parla: "Parla", vai: "Vai" };
let currentVerb = "guarda";

const state = {
  currentLocation: "pier",
  visited: new Set(),
  clues: new Set(["anonymous_letter"]),
  cluesFound: 1,
  drawerRevealed: false,
  drawerTaken: false,
  sanCur: 51,
  sanMax: 75,
  art: {} // mutable copies of each room's ascii, per-location, persisted across visits
};

const locations = {
  pier: {
    name: "La banchina di Kingsport",
    art: PIER_ART,
    onEnterOnce: "La barca vi lascia su un molo di legno marcio. Il faro si staglia contro un cielo troppo basso. Avete in mano solo una lettera anonima e il nome di un uomo scomparso.",
    objects: {
      fisherman: {
        rect: { top: "160px", left: "7ch", width: "11ch", height: "80px" },
        name: "un vecchio pescatore",
        actions: {
          guarda: "Ripara una rete che non ripara da anni, gli occhi fissi sul faro.",
          parla: {
            text: "\"Il professore non usciva più, ultimamente. Solo di notte. E non da solo, se capite cosa intendo.\"",
            clue: { id: "fisherman_rumor", label: "Voce del pescatore", delta: 0, tag: "INDIZIO", variant: "clue", line: "Il pescatore sa più di quanto dica." }
          }
        }
      },
      lighthouse_view: {
        rect: { top: "40px", left: "46ch", width: "15ch", height: "160px" },
        name: "il faro",
        actions: {
          guarda: "Alto, bianco un tempo. Ora una crosta salmastra ne annerisce la base, come se il mare risalisse a lambirlo."
        }
      },
      lighthouse_door: {
        rect: { top: "200px", left: "51ch", width: "5ch", height: "80px" },
        name: "la porta del faro",
        actions: {
          guarda: "Una porta di legno gonfio d'acqua, socchiusa.",
          vai: { text: "Spingi la porta ed entri nel faro.", goto: "entrance" }
        }
      }
    }
  },

  entrance: {
    name: "L'ingresso del faro",
    art: ENTRANCE_ART,
    onEnterOnce: "La porta era socchiusa. Dentro, solo il rumore della vostra respirazione e una scala di ferro che sale nel buio.",
    objects: {
      coat_rack: {
        rect: { top: "60px", left: "3ch", width: "9ch", height: "100px" },
        name: "l'attaccapanni",
        actions: {
          guarda: {
            text: "Il cappotto invernale di Armitage è ancora appeso.",
            clue: { id: "coat_left_behind", label: "Il cappotto rimasto", delta: -1, tag: "INDIZIO", variant: "clue", line: "Non sarebbe uscito senza, non con questo tempo." }
          }
        }
      },
      spiral_stairs: {
        rect: { top: "40px", left: "24ch", width: "17ch", height: "260px" },
        name: "la scala a chiocciola",
        actions: {
          guarda: "Una scala di ferro sale nel buio, verso lo studio.",
          vai: { text: "Sali la scala a chiocciola.", goto: "study" }
        }
      },
      muddy_footprints: {
        rect: { top: "300px", left: "10ch", width: "18ch", height: "20px" },
        name: "impronte di fango",
        actions: {
          guarda: "Vanno e vengono dalla porta, ma un secondo set, più largo, scende verso il basso — verso una cantina.",
          vai: { text: "Segui le impronte più larghe verso il basso.", goto: "cellar" }
        }
      },
      front_door: {
        rect: { top: "240px", left: "50ch", width: "11ch", height: "100px" },
        name: "la porta d'ingresso",
        actions: {
          guarda: "La porta d'ingresso, ancora socchiusa come l'avete trovata.",
          vai: { text: "Esci di nuovo sulla banchina.", goto: "pier" }
        }
      }
    }
  },

  study: {
    name: "Lo studio del Prof. Armitage",
    art: STUDY_ART,
    onEnterOnce: "La pioggia batte sui vetri dell'oblò. L'aria sa di carta vecchia e di sale.",
    objects: {
      bookshelf: {
        rect: { top: "40px", left: "2ch", width: "14ch", height: "200px" },
        name: "la libreria",
        actions: {
          guarda: "Dorsi consumati in lingue che non riconosci. Uno dei volumi, più sottile degli altri, sporge leggermente dallo scaffale centrale.",
          prendi: {
            text: "Il diario di Armitage. Le ultime pagine parlano di 'voci nell'acqua' che lo chiamano per nome.",
            clue: { id: "armitage_diary", label: "Il diario di Armitage", delta: -3, tag: "INDIZIO", variant: "clue", line: "Voci nell'acqua che lo chiamano per nome." }
          },
          usa: "Non è il momento di leggere: fuori la tempesta cresce.",
          parla: "Le pagine restano mute. Per ora."
        }
      },
      window: {
        rect: { top: "40px", left: "20ch", width: "19ch", height: "160px" },
        name: "l'oblò piovoso",
        actions: {
          guarda: "La pioggia disegna rivoli obliqui sul vetro spesso. Oltre il faro, il mare ribolle di una luce che non dovrebbe esistere.",
          usa: "Provi ad aprirla: il legno gonfio d'umidità non cede.",
          parla: "Solo il vento risponde, sibilando qualcosa che assomiglia a delle sillabe."
        }
      },
      idol: {
        rect: { top: "40px", left: "45ch", width: "14ch", height: "200px" },
        name: "l'idolo tentacolare",
        actions: {
          guarda: "Un piccolo idolo di pietra nerastra, tentacoli scolpiti che sembrano contrarsi se lo fissi troppo a lungo. Meglio non farlo.",
          usa: {
            text: "Lo sollevi dal piedistallo. Per un istante, giureresti che i tentacoli si sono mossi sotto le tue dita.",
            clue: { id: "stone_idol", label: "L'idolo di pietra", delta: -5, tag: "PERICOLO", variant: "danger", line: "Un freddo ti sale lungo la schiena. Qualcosa, da qualche parte, si è accorto di te." }
          },
          parla: "Sussurri qualcosa. Il silenzio che segue è peggiore di qualunque risposta."
        }
      },
      desk: {
        rect: { top: "260px", left: "17ch", width: "25ch", height: "120px" },
        name: "la scrivania col planisfero",
        actions: {
          guarda: {
            text: "Una carta nautica è distesa sotto una bussola d'ottone: rotte segnate a inchiostro, tutte convergenti verso un punto al largo di Kingsport.",
            clue: { id: "nautical_chart", label: "La carta nautica", delta: -1, tag: "INDIZIO", variant: "clue", line: "Le rotte convergono tutte sullo stesso punto." }
          },
          usa: "Sposti la bussola sulla mappa per fermare un angolo che continua ad arrotolarsi."
        }
      },
      drawer: {
        rect: { top: "340px", left: "18ch", width: "23ch", height: "20px" },
        visible: false,
        name: "il cassetto socchiuso",
        actions: {
          guarda: "Fogli strappati, righe di una calligrafia febbrile: '...non è annegato, è SCESO...'",
          prendi: "Raccogli i fogli. Le parole ti si conficcano in testa più di quanto vorresti."
        }
      },
      door: {
        rect: { top: "40px", left: "60ch", width: "7ch", height: "360px" },
        name: "la porta",
        actions: {
          guarda: "Pannelli di quercia scuri, un vecchio catenaccio arrugginito accanto alla maniglia.",
          vai: { text: "Riapri la porta e scendi la scala a chiocciola verso l'ingresso.", goto: "entrance" }
        }
      },
      bedroom_door: {
        rect: { top: "240px", left: "2ch", width: "23ch", height: "20px" },
        name: "la porta della camera",
        actions: {
          guarda: "Una porta socchiusa conduce alla camera da letto.",
          vai: { text: "Attraversi la porta verso la camera da letto.", goto: "bedroom" }
        }
      }
    }
  },

  bedroom: {
    name: "La camera da letto",
    art: BEDROOM_ART,
    onEnterOnce: "Le lenzuola sono a terra. Nessuno dorme così, a meno di non aver paura del proprio letto.",
    objects: {
      bed: {
        rect: { top: "40px", left: "3ch", width: "22ch", height: "140px" },
        name: "il letto disfatto",
        actions: { guarda: "Segnato da notti insonni. Sotto il cuscino, un angolo di carta." }
      },
      nightstand: {
        rect: { top: "180px", left: "3ch", width: "10ch", height: "80px" },
        name: "il comodino",
        actions: {
          guarda: {
            text: "Una lettera mai spedita, indirizzata a un collega di Miskatonic.",
            clue: { id: "unsent_letter", label: "Lettera mai spedita", delta: -2, tag: "INDIZIO", variant: "clue", line: "\"Credo di essere osservato. Non dal mare — dal fondo del mare.\"" }
          }
        }
      },
      mirror: {
        rect: { top: "40px", left: "40ch", width: "11ch", height: "160px" },
        name: "lo specchio",
        actions: { guarda: "Il vostro riflesso vi guarda un istante più a lungo di quanto dovrebbe." }
      },
      door: {
        rect: { top: "220px", left: "55ch", width: "10ch", height: "80px" },
        name: "la porta",
        actions: {
          guarda: "La porta verso lo studio.",
          vai: { text: "Torni nello studio.", goto: "study" }
        }
      }
    }
  },

  cellar: {
    name: "La cantina",
    art: CELLAR_ART,
    onEnterOnce: "L'aria qui è più fredda, e sa di alghe marce. La roccia grezza affiora dal pavimento di cemento.",
    objects: {
      carved_wall: {
        rect: { top: "40px", left: "2ch", width: "23ch", height: "180px" },
        name: "la roccia incisa",
        actions: {
          guarda: {
            text: "Simboli spiralici, corrosi dal sale ma non dal tempo — sono recenti.",
            clue: { id: "carved_symbols", label: "Simboli incisi nella roccia", delta: -4, tag: "PERICOLO", variant: "danger", line: "Non sono opera del tempo, né del mare." }
          }
        }
      },
      wet_footprints: {
        rect: { top: "240px", left: "26ch", width: "25ch", height: "40px" },
        name: "le impronte bagnate",
        actions: {
          guarda: {
            text: "Scendono verso la roccia e lì svaniscono. Nessuna traccia di ritorno.",
            clue: { id: "footprints_trail", label: "Le impronte bagnate", delta: -2, tag: "INDIZIO", variant: "clue", line: "Nessuna traccia di ritorno." }
          }
        }
      },
      stairs_up: {
        rect: { top: "40px", left: "50ch", width: "11ch", height: "140px" },
        name: "la scala verso l'ingresso",
        actions: {
          guarda: "La scala che riporta all'ingresso.",
          vai: { text: "Risali verso l'ingresso.", goto: "entrance" }
        }
      },
      ladder_lamp: {
        rect: { top: "180px", left: "50ch", width: "11ch", height: "120px" },
        name: "la scala di servizio",
        actions: {
          guarda: "Una scala di servizio risale l'intero faro, fino alla lanterna. In fondo, una botola di ferro è chiusa con un lucchetto.",
          vai: {
            text: "Risali la scala di servizio fino alla lanterna.",
            goto: "lamp_room",
            requiresKey: true,
            lockedText: "La botola di ferro non si apre. Il lucchetto è pesante, moderno — serve una chiave, non un attrezzo di fortuna."
          }
        }
      }
    }
  },

  lamp_room: {
    name: "La lanterna in cima al faro",
    art: LAMP_ART,
    onEnterOnce: "La lampada è spenta. Sul pavimento, un paio di scarpe, allineate con cura, rivolte verso il mare.",
    objects: {
      lamp_mechanism: {
        rect: { top: "40px", left: "26ch", width: "17ch", height: "140px" },
        name: "il meccanismo della lampada",
        actions: { guarda: "La lampada è spenta. L'olio nel serbatoio è ancora pieno." }
      },
      sea_view: {
        rect: { top: "40px", left: "50ch", width: "13ch", height: "180px" },
        name: "il mare, oltre la vetrata",
        actions: { guarda: "Nessuna luce, per ora. Ma sapete che tornerete a guardare da qui, un giorno." }
      },
      shoes: {
        rect: { top: "220px", left: "30ch", width: "10ch", height: "20px" },
        name: "le scarpe di Armitage",
        actions: {
          guarda: {
            text: "Vuote. Nessun segno di violenza. Le ha tolte lui stesso, prima di scendere.",
            clue: { id: "armitage_shoes", label: "Le scarpe di Armitage", delta: -6, tag: "PERICOLO", variant: "danger", line: "Non è annegato. È sceso volontariamente, verso qualcosa che lo chiamava.", endsChapter: true }
          }
        }
      },
      stairs_down: {
        rect: { top: "220px", left: "2ch", width: "11ch", height: "80px" },
        name: "la scala di servizio",
        actions: {
          guarda: "La scala di servizio scende verso la cantina.",
          vai: { text: "Scendi verso la cantina.", goto: "cellar" }
        }
      }
    }
  }
};

for (const id in locations) {
  state.art[id] = locations[id].art;
}

let log, statusline, cabinet, hotspotsLayer, pre, chapterLabel;

function appendLog(text, variant, tag) {
  const el = document.createElement("div");
  el.className = "log-entry" + (variant ? " " + variant : "");
  if (tag) {
    const t = document.createElement("span");
    t.className = "tag";
    t.textContent = tag;
    el.appendChild(t);
  }
  el.appendChild(document.createTextNode(text));
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}

function setSanity(delta) {
  if (!delta) return;
  state.sanCur = Math.max(0, Math.min(state.sanMax, state.sanCur + delta));
  const pct = Math.round((state.sanCur / state.sanMax) * 100);
  document.getElementById("san-num").textContent = state.sanCur + " / " + state.sanMax;
  const fill = document.getElementById("san-fill");
  fill.style.width = pct + "%";
  fill.classList.remove("low", "critical");
  if (pct <= 20) fill.classList.add("critical");
  else if (pct <= 45) fill.classList.add("low");
}

function addClue(label) {
  state.cluesFound++;
  document.getElementById("clue-count").textContent = state.cluesFound;
  const li = document.createElement("li");
  li.className = "fresh";
  li.textContent = label;
  document.getElementById("clue-list").appendChild(li);
}

function flashDanger() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  cabinet.classList.add("danger-flash");
  setTimeout(() => cabinet.classList.remove("danger-flash"), reduced ? 50 : 700);
}

function applyClue(clue) {
  if (!clue || state.clues.has(clue.id)) return;
  state.clues.add(clue.id);
  addClue(clue.label);
  setSanity(clue.delta);
  if (clue.variant === "danger") flashDanger();
  appendLog(clue.line || clue.label, clue.variant || "clue", clue.tag || "INDIZIO");
  if (clue.endsChapter) {
    setTimeout(() => {
      appendLog("— Fine del Capitolo 1 · Il Faro di Kingsport — continua nel Capitolo 2 —", "chapter-end");
    }, 900);
  }
}

function revealDrawer() {
  state.drawerRevealed = true;
  const rows = state.art.study.split("\n");
  rows[17] = rows[17].slice(0, 18) + " [cassetto socchiuso]  " + rows[17].slice(41);
  state.art.study = rows.join("\n");
  if (state.currentLocation === "study") pre.textContent = state.art.study;

  const btn = document.createElement("button");
  btn.className = "hotspot is-new";
  btn.dataset.id = "drawer";
  btn.dataset.name = "il cassetto socchiuso";
  btn.style.top = "340px";
  btn.style.left = "18ch";
  btn.style.width = "23ch";
  btn.style.height = "20px";
  hotspotsLayer.appendChild(btn);
  wireHotspot(btn);

  appendLog("Uno dei cassetti della scrivania non è chiuso del tutto.", "clue", "SCENA AGGIORNATA");
}

function takeDrawer(btn) {
  state.drawerTaken = true;
  btn.setAttribute("disabled", "disabled");
  btn.classList.remove("is-new");
  const rows = state.art.study.split("\n");
  rows[17] = rows[17].slice(0, 18) + "   [cassetto vuoto]    " + rows[17].slice(41);
  state.art.study = rows.join("\n");
  if (state.currentLocation === "study") pre.textContent = state.art.study;
  applyClue({ id: "torn_notes", label: "Appunti strappati", delta: -3, tag: "INDIZIO", variant: "clue", line: "\"...non è annegato, è SCESO...\"" });
}

function gotoLocation(id) {
  state.currentLocation = id;
  renderLocation(id);
}

function handleInteract(el) {
  const id = el.dataset.id;
  const verb = currentVerb;
  const loc = locations[state.currentLocation];
  const obj = loc.objects[id];
  const raw = obj.actions[verb];

  if (id === "drawer") {
    if (state.drawerTaken) return;
    if (verb === "guarda" || verb === "prendi") {
      appendLog(typeof raw === "string" ? raw : raw.text);
      if (verb === "prendi") takeDrawer(el);
      return;
    }
  }

  if (!raw) {
    appendLog("Non sembra un'azione sensata, per ora.");
    return;
  }
  const action = typeof raw === "string" ? { text: raw } : raw;
  appendLog(action.text);
  applyClue(action.clue);

  if (id === "desk" && verb === "guarda" && !state.drawerRevealed) {
    setTimeout(revealDrawer, 450);
  }
  if (action.goto) {
    setTimeout(() => gotoLocation(action.goto), 500);
  }
}

function wireHotspot(el) {
  const loc = locations[state.currentLocation];
  const obj = loc.objects[el.dataset.id];
  el.addEventListener("mouseenter", () => {
    statusline.innerHTML = '<span class="verb">' + verbLabels[currentVerb] + "</span>: " + (obj ? obj.name : el.dataset.name);
  });
  el.addEventListener("mouseleave", () => {
    statusline.textContent = "pronta.";
  });
  el.addEventListener("click", () => handleInteract(el));
}

function renderLocation(id) {
  const loc = locations[id];

  chapterLabel.textContent = "Cap. I — Il Faro di Kingsport · " + loc.name;
  pre.textContent = state.art[id];

  hotspotsLayer.innerHTML = "";
  for (const objId in loc.objects) {
    const obj = loc.objects[objId];
    if (obj.visible === false) continue;
    const btn = document.createElement("button");
    btn.className = "hotspot";
    btn.dataset.id = objId;
    btn.dataset.name = obj.name;
    Object.assign(btn.style, obj.rect);
    hotspotsLayer.appendChild(btn);
    wireHotspot(btn);
  }
  if (id === "study" && state.drawerRevealed) {
    const btn = document.createElement("button");
    btn.className = "hotspot" + (state.drawerTaken ? "" : " is-new");
    btn.dataset.id = "drawer";
    btn.dataset.name = "il cassetto socchiuso";
    btn.style.top = "340px";
    btn.style.left = "18ch";
    btn.style.width = "23ch";
    btn.style.height = "20px";
    if (state.drawerTaken) btn.setAttribute("disabled", "disabled");
    hotspotsLayer.appendChild(btn);
    wireHotspot(btn);
  }

  statusline.textContent = "pronta.";

  if (!state.visited.has(id)) {
    state.visited.add(id);
    appendLog(loc.onEnterOnce, "system");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  log = document.getElementById("log");
  statusline = document.getElementById("statusline");
  cabinet = document.querySelector(".cabinet");
  hotspotsLayer = document.getElementById("hotspots");
  pre = document.getElementById("scene");
  chapterLabel = document.getElementById("chapter-label");

  document.querySelectorAll(".verb-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".verb-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentVerb = btn.dataset.verb;
      statusline.innerHTML = '<span class="verb">' + verbLabels[currentVerb] + "</span> selezionata.";
    });
  });

  setSanity(0);
  renderLocation(state.currentLocation);
});
