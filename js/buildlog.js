/* ==========================================================================
   buildlog.js -- surinkimo zurnalo logika (P500 zalias kanalas)
   Sitas failas tvarko visa zurnalo kurima, pazymejima ir issaugojima.
   ========================================================================== */


/* ==========================================================================
   BUILD_DATA -- visi surinkimo zingsniai is vadovo
   Kiekvienas objektas = viena surinkimo sekcija
   id    -- unikalus identifikatorius (naudojamas DOM ir localStorage)
   title -- sekcijos pavadinimas
   steps -- masyvas su žingsniais kaip tekstas
   Saltinis: DynoSaw Workshop Manual, psl. 15-31
   ========================================================================== */
const BUILD_DATA = [

    { // variklio surinkimas
        id: "engine",
        title: "Engine Assembly",
        steps: [
            "Crankshaft into block (no bolts)",
            "Main Bearings x5 -- 10x2",
            "Pistons x4 -- 8x2",
            "Crankshaft Pulley -- 13x1",
            "Align Crankshaft Pulley (see alignment guide)",
            "Aux Shaft -- 6x3",
            "Aux Shaft Sprocket -- 14x1",
            "Head Gasket (no bolts)",
            "Cylinder Head -- 9x10",
            "Camshaft -- 6x2",
            "Camshaft Sprocket -- 14x1",
            "Align Camshaft Sprocket (see alignment guide)",
            "Remove Crankshaft Pulley",
            "Fit Timing Belt (no crankshaft pulley)",
            "Refit Crankshaft Pulley -- 13x1",
            "Water Pump -- 7x4",
            "Water Pump Pulley -- 8x4 (fit fan first if using one)",
            "Distributor -- Screwdriver x1",
            "Rockers x8 -- tighten each twice with screwdriver",
            "Tune Rockers with size 12 wrench (58 turns down)",
            "Rocker Cover -- 7x8",
            "Thermostat (no bolts)",
            "Thermostat Housing -- 8x2",
            "Fuel Pump -- 7x2",
            "Timing Belt Cover -- 6x2",
            "Alternator -- 11x1",
            "Loosen Alternator fully by hand",
            "Attach Fan Belt",
            "Tighten Alternator fully by hand, then back 2 clicks, then bolt",
            "Sparkplugs -- sparkplug wrench",
            "Attach engine to Engine Hoist (size 10) -- do NOT continue until done",
            "Oil Filter -- hand tight",
            "Oil Pump -- 6x2",
            "Oil Pan -- 7x10 | Drain Plug size 13",
            "Rear Plate (no bolts)",
            "Starter -- bolt in ONLY after wiring complete (8x3, 6x1)"
        ]
    },

    { // variklio montavimas i kebula
        id: "engine-mount",
        title: "Engine Mounting",
        steps: [
            "Complete suspension BEFORE mounting engine",
            "Attach engine to subframe -- fan facing front -- 2x size 12 bolts",
            "Detach hoist from engine block -- size 10",
            "Carburettor -- 9x5",
            "Exhaust Manifold / Headers -- 9x8",
            "Air Cleaner / Air Filter -- 7x1 (not needed for inspection)"
        ]
    },

    { // ismetimo sistema
        id: "exhaust",
        title: "Exhaust System",
        steps: [
            "Complete suspension and gearbox before exhaust",
            "Exhaust Front -- 8x2, 7x1",
            "Exhaust Rear -- 7x2, 9x1",
            "Muffler -- 8x1"
        ]
    },

    { // kebulo surinkimas
        id: "bodywork",
        title: "Bodywork Assembly",
        steps: [
            "Fender Left -- 8x6",
            "Fender Right -- 8x6",
            "Front Bumper -- 10x2",
            "Rear Bumper -- 10x2",
            "Place lamps into Headlight Assembly L+R",
            "Headlight Assembly L+R -- 9x2",
            "Taillight Left -- 8x2",
            "Taillight Right -- 8x2",
            "Grille -- 9x2",
            "Bootlid -- 8x4",
            "Door Left -- 8x4",
            "Door Right -- 8x4",
            "Hood -- 7x4 (suggested post vehicle completion)"
        ]
    },

    { // pakabos surinkimas
        id: "suspension",
        title: "Suspension Assembly",
        steps: [
            "FRONT: Front Lower Control Arm L+R -- 14x1",
            "FRONT: Front Upper Control Arm L+R -- 14x2",
            "FRONT: Attach Springs",
            "FRONT: Brake Assembly L+R -- 12x2",
            "FRONT: Front Shock Absorber L+R -- 12x1 on FUCA, 8x2 under FLCA",
            "FRONT: Steering Rack -- 9x4, 11x2",
            "FRONT: Front Link L+R -- 12x1, 11x2",
            "FRONT: Steering Shaft -- 6x1",
            "FRONT: Wheels x2 -- 15x4",
            "REAR: Rear Lower Control Arm L+R -- 13x1",
            "REAR: Rear Upper Control Arm L+R -- 15x1",
            "REAR: Attach Springs",
            "REAR: Rear Differential -- 15x4",
            "REAR: Rear Shock Absorber L+R -- 13x2",
            "REAR: Wheels x2 -- 15x4"
        ]
    },

    { // variklio skyriaus dalys
        id: "engine-bay",
        title: "Engine Bay Generic Parts",
        steps: [
            "Heaterbox -- 7x4",
            "Ventilation Box -- 7x4",
            "Fresh Air Duct -- 8x1",
            "Wiper Motor Assembly -- 7x4",
            "Radiator -- 10x4",
            "Steering Column -- 12x2",
            "Ignition Coil -- 8x2",
            "Radiator Hose Top -- screwdriver x2",
            "Radiator Hose Bottom -- screwdriver x2",
            "Heater Hose Inlet -- screwdriver x2",
            "Heater Hose Outlet -- screwdriver x2",
            "Clutch Cable -- 7x1",
            "Brake Master Cylinder -- 8x4",
            "Brake Lines -- 7x6, 10x2",
            "Chassis Earth Cables -- 8x3 (DO AFTER WIRING)"
        ]
    },

    { // pavaru dezės surinkimas
        id: "gearbox",
        title: "Gearbox Assembly",
        steps: [
            "Confirm Rear Plate is attached to rear of engine",
            "Assemble Clutch: Pressure Plate into Cover Plate",
            "Put Clutch Disc into Clutch Assembly",
            "Flywheel (manual) OR Flexplate (automatic) -- 12x6",
            "Clutch -- 8x6",
            "Gearbox -- 11x6 (easiest from underside)",
            "Driveshaft -- 8x4",
            "Gearbox Crossmember -- 14x2"
        ]
    },

    { // salonas
        id: "interior",
        title: "Interior Assembly",
        steps: [
            "Pedal Box Manual/Automatic -- 8x4",
            "Driver Seat -- 10x3, 8x1",
            "Passenger Seat -- 10x3, 8x1",
            "Dashboard -- 7x2",
            "Dashboard Top Cover (no bolts)",
            "Dashboard Bottom Cover -- screwdriver x2",
            "Instrument Panel -- screwdriver x2",
            "Column Shroud Left -- 8x1",
            "Column Shroud Right -- 8x1",
            "Steering Wheel -- 14x1",
            "Handbrake -- 7x2, 6x1",
            "Rear Bench Seat -- 12x2",
            "Rear Bench Seat Backrest -- 12x2",
            "Manual Shifter (hand tighten) OR Automatic Shifter (6x1)",
            "Parcel Shelf (no bolts)",
            "Centre Console -- 6x2 (optional)"
        ]
    },

    { // papildomos dalys
        id: "auxiliary",
        title: "Auxiliary Parts",
        steps: [
            "Fuel Tank -- 10x2",
            "AFR Gauge -- screwdriver x1"
        ]
    },

    { // variklio skyriaus laidai
        id: "wiring-engine",
        title: "Engine Bay Wiring",
        steps: [
            "Battery Positive Terminal -----> Starter",
            "Alternator -----> Regulator",
            "Regulator -----> Main Connector",
            "Main Connector -----> Front Headlights Connector (FHC)",
            "FHC -----> Headlight Left",
            "FHC -----> Headlight Right",
            "Battery Positive Terminal -----> Main Connector",
            "Engine Block -----> Chassis Earth",
            "Battery Negative Terminal -----> Chassis Earth",
            "Ignition Coil -----> Main Connector",
            "Fusebox -----> Wiper Motor",
            "Fusebox -----> Heater Blower"
        ]
    },

    { // salonas laidai
        id: "wiring-interior",
        title: "Interior Wiring",
        steps: [
            "Fusebox -----> Ignition Switch",
            "Dash Harness Connector -----> Dash Switches",
            "Dash Harness Connector -----> Turn Signal Switch",
            "Dash Harness Connector -----> Instrument Panel",
            "Dash Harness Connector -----> Light Switch",
            "Heater Control -----> Fusebox",
            "Radio -----> Radio Harness (if fitted)"
        ]
    },

    { // bagažines laidai
        id: "wiring-trunk",
        title: "Trunk Wiring",
        steps: [
            "Rear Harness Connector -----> Rear Light Left",
            "Rear Harness Connector -----> Rear Light Right",
            "Rear Harness Connector -----> Fuel Tank",
            "Rear Harness Connector -----> Window Heater (only if factory fitted)"
        ]
    },

    { // derinimas ir sulygiavimas
        id: "tuning",
        title: "Tuning & Alignment",
        steps: [
            "Crankshaft Alignment -- size 13, scroll to 11 o'clock position",
            "Camshaft Alignment -- size 14, align arrow with bolt",
            "Wheel Alignment -- size 15, scroll to stop then back 60 times",
            "Rocker Tuning -- size 12, scroll to top then back 58 times",
            "Distributor Tuning -- screw in fully, unscrew 1 click, tune to 1 pos before chirp",
            "Carburettor Tuning -- tune to 14.0-15.0 AFR at idle (engine running)",
            "Suspension Tuning (if rally) -- front Blue=Max, Red=Max-5 | rear Blue=Max-5, Red=Max"
        ]
    }
];


const STORAGE_KEY = "corris_buildlog_v1"; // localStorage raktas -- visi pazymejimo duomenys saugojami cia


/* ==========================================================================
   renderLog()
   Sukuria visa zurnalo DOM is BUILD_DATA masyvo ir ideda i puslapi.
   Iškviesta vieną karta kai DOM uzsikrecia.
   ========================================================================== */
function renderLog() {
    const saved = loadState(); // nuskaito issaugota buvusio sesijos pazymejima

    const container = document.getElementById("build-log-container");
    container.innerHTML = ""; // isvalo ankstesni turini jei toks buvo

    BUILD_DATA.forEach(function(section) { // eina per kiekviena sekcija

        const sectionEl = document.createElement("div");
        sectionEl.className = "log-section";
        sectionEl.id = "section-" + section.id;

        // -- antraste su pavadinmu ir baigtumo skaitikliu --
        const header = document.createElement("div");
        header.className = "log-section-header";
        header.setAttribute("role", "button");
        header.setAttribute("tabindex", "0");          // leidzia valdyti klaviatura
        header.setAttribute("aria-expanded", "true");
        header.setAttribute("aria-controls", "steps-" + section.id);

        header.addEventListener("click", function() {
            toggleSection(section.id); // paspaudus antraste -- sulankstyti arba issklesti sekcija
        });

        header.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") { // Enter arba tarpas taip pat suveikia
                e.preventDefault();
                toggleSection(section.id);
            }
        });

        const titleEl = document.createElement("span");
        titleEl.className = "log-section-title";
        titleEl.textContent = section.title.toUpperCase();

        const countEl = document.createElement("span");
        countEl.className = "log-section-count";
        countEl.id = "count-" + section.id;
        countEl.textContent = "0/" + section.steps.length + " DONE"; // bus atnaujintas po uzsikreties

        header.appendChild(titleEl);
        header.appendChild(countEl);

        // -- zingsniu sarasas --
        const stepList = document.createElement("ul");
        stepList.className = "log-step-list";
        stepList.id = "steps-" + section.id;

        section.steps.forEach(function(stepText, stepIndex) {
            const cbId = "cb-" + section.id + "-" + stepIndex; // unikalus ID naudojamas localStorage

            const li = document.createElement("li");
            li.className = "log-step";

            const isChecked = saved[cbId] === true; // atstatoma issaugota buvusio sesijos busena
            if (isChecked) li.classList.add("done");

            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.id = cbId;
            cb.checked = isChecked;
            cb.setAttribute("aria-label", stepText);

            cb.addEventListener("change", function() {
                if (this.checked) {
                    li.classList.add("done"); // perbraukiamas tekstas kai pazymeta
                } else {
                    li.classList.remove("done");
                }
                saveState();           // issaugoma i localStorage
                updateProgress();      // atnaujinamas progreso juostelė
                updateSectionCount(section.id); // atnaujinamas skaitiklis antraštėje
            });

            li.addEventListener("click", function(e) {
                if (e.target !== cb) { // isvengti dvigubo suveikimo kai spaudžiama tiesiogiai ant checkbox
                    cb.checked = !cb.checked;
                    cb.dispatchEvent(new Event("change"));
                }
            });

            const label = document.createElement("label");
            label.className = "log-step-text";
            label.setAttribute("for", cbId);
            label.textContent = stepText;

            li.appendChild(cb);
            li.appendChild(label);
            stepList.appendChild(li);
        });

        sectionEl.appendChild(header);
        sectionEl.appendChild(stepList);
        container.appendChild(sectionEl);

        updateSectionCount(section.id); // atnaujinamas skaitiklis pagal issaugota buvusio sesijos busena
    });

    updateProgress(); // apskaičiuojamas pradinis progreso procentas
}


/* ==========================================================================
   toggleSection(sectionId)
   Sulankstyti arba issklesti viena sekcija pagal jos id.
   ========================================================================== */
function toggleSection(sectionId) {
    const stepList = document.getElementById("steps-" + sectionId);
    const header   = stepList.previousElementSibling;

    if (stepList.style.display === "none") {
        stepList.style.display = "block";       // isskleidžiama
        header.setAttribute("aria-expanded", "true");
    } else {
        stepList.style.display = "none";        // sulankstyti
        header.setAttribute("aria-expanded", "false");
    }
}


/* ==========================================================================
   expandAll() / collapseAll()
   Vienu mygtuku isskleidžia arba sulankstyti visas sekcijas.
   ========================================================================== */
function expandAll() {
    BUILD_DATA.forEach(function(section) {
        const stepList = document.getElementById("steps-" + section.id);
        stepList.style.display = "block";
        stepList.previousElementSibling.setAttribute("aria-expanded", "true");
    });
}

function collapseAll() {
    BUILD_DATA.forEach(function(section) {
        const stepList = document.getElementById("steps-" + section.id);
        stepList.style.display = "none";
        stepList.previousElementSibling.setAttribute("aria-expanded", "false");
    });
}


/* ==========================================================================
   updateProgress()
   Suskaiciuoja kiek checkboxu pazymeta ir atnaujina progreso juostele,
   procento teksta ir zingsniu skaitiklį.
   ========================================================================== */
function updateProgress() {
    const allCbs     = document.querySelectorAll(".log-step input[type='checkbox']");
    const checkedCbs = document.querySelectorAll(".log-step input[type='checkbox']:checked");

    const total   = allCbs.length;
    const checked = checkedCbs.length;

    const pct = total > 0 ? Math.round((checked / total) * 100) : 0; // procentas -- saugoma nuo dalybos is nulio

    const bar = document.getElementById("progress-bar");
    bar.style.width = pct + "%"; // keičiamas juosteles plotis

    document.getElementById("progress-bar-wrapper").setAttribute("aria-valuenow", pct); // ekrano skaitytuvams
    document.getElementById("progress-percent").textContent = pct + "%";
    document.getElementById("progress-steps").textContent = checked + " / " + total + " STEPS COMPLETED";

    if (pct === 100) {
        bar.style.backgroundColor = "var(--tt-yellow)"; // geltonai kai viskas baigta
    } else {
        bar.style.backgroundColor = "var(--green-accent-primary)";
    }
}


/* ==========================================================================
   updateSectionCount(sectionId)
   Atnaujina "X/Y DONE" teksta vienos sekcijos antrašteje.
   ========================================================================== */
function updateSectionCount(sectionId) {
    const stepList   = document.getElementById("steps-" + sectionId);
    const allCbs     = stepList.querySelectorAll("input[type='checkbox']");
    const checkedCbs = stepList.querySelectorAll("input[type='checkbox']:checked");

    document.getElementById("count-" + sectionId).textContent =
        checkedCbs.length + "/" + allCbs.length + " DONE";
}


/* ==========================================================================
   saveState()
   Issaugo visus checkboxu ID ir ju busenas i localStorage kaip JSON.
   Iškviesta kiekvieną karta kai checkbox pasikeicia.
   ========================================================================== */
function saveState() {
    const state = {};

    document.querySelectorAll(".log-step input[type='checkbox']").forEach(function(cb) {
        state[cb.id] = cb.checked; // pvz. { "cb-engine-0": true, "cb-engine-1": false }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); // irasoma i naršykles atminti

    const indicator = document.getElementById("save-indicator");
    indicator.classList.add("visible"); // trumpai parodo "SAVED" zinute
    setTimeout(function() {
        indicator.classList.remove("visible"); // paslepiama po 1.5 sekundes
    }, 1500);
}


/* ==========================================================================
   loadState()
   Nuskaito issaugotus checkboxu duomenis is localStorage.
   Grazina tuscia objekta jei nieko nera arba jei duomenys sugadinti.
   ========================================================================== */
function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {}; // grazina objekta arba tuscia {} jei nieko nera
    } catch (e) {
        console.warn("Corris Build Log: nepavyko nuskaityti issaugotu duomenu.", e);
        return {}; // jei klaida -- pradedam is naujo
    }
}


/* ==========================================================================
   confirmReset()
   Paklausia vartotojo ar tikrai nori išvalyti progresa.
   Jei patvirtina -- isvalo localStorage ir visus checkboxus.
   ========================================================================== */
function confirmReset() {
    const confirmed = window.confirm(
        "RESET ALL PROGRESS?\n\nThis will clear every checked step. This cannot be undone."
    ); // confirm() grazina true jei vartotojas paspaudzė OK

    if (confirmed) {
        localStorage.removeItem(STORAGE_KEY); // istrinama is naršykles atminties

        document.querySelectorAll(".log-step input[type='checkbox']").forEach(function(cb) {
            cb.checked = false;
            cb.closest(".log-step").classList.remove("done"); // pašalinamas perbrauktas stilius
        });

        updateProgress();
        BUILD_DATA.forEach(function(section) {
            updateSectionCount(section.id); // atnaujinami visi skaitikliai
        });
    }
}


/* ==========================================================================
   copySummary()
   Suformuoja teksta su visomis sekcijomis ir jų atliktais žingsniais,
   tada irasoma i istrizma lenta.
   ========================================================================== */
function copySummary() {
    let text = "CORRIS RIVETT -- BUILD LOG SUMMARY\n";
    text += "===================================\n\n";

    BUILD_DATA.forEach(function(section) {
        const stepList   = document.getElementById("steps-" + section.id);
        const allCbs     = stepList.querySelectorAll("input[type='checkbox']");
        const checkedCbs = stepList.querySelectorAll("input[type='checkbox']:checked");

        text += "[ " + section.title.toUpperCase() + " ] ";
        text += checkedCbs.length + "/" + allCbs.length + " COMPLETE\n";

        checkedCbs.forEach(function(cb) { // tik atlikti zingsniai
            const label = stepList.querySelector("label[for='" + cb.id + "']");
            if (label) text += "  [X] " + label.textContent + "\n";
        });

        text += "\n";
    });

    navigator.clipboard.writeText(text).then(function() {
        alert("BUILD SUMMARY COPIED TO CLIPBOARD");
    }).catch(function() {
        alert("Could not copy -- please copy manually.");
    });
}


/* ==========================================================================
   Paleidimas -- renderLog iškviečiamas kai DOM visiškai uzsikrecia
   ========================================================================== */
window.addEventListener("DOMContentLoaded", function() {
    renderLog(); // sukuriamas visas zurnalas is BUILD_DATA
});
