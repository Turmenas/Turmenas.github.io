/* ==========================================================================
   vin.js -- VIN dekoderio logika (P400 gintarinis kanalas)
   Sitas failas tvarko visa VIN ivesties, dekodavimo ir rodymo logika.
   ========================================================================== */


/* ==========================================================================
   VIN DUOMENU LENTELES
   Kiekviena lentele = vienas VIN laukas
   Formatas: { "kodas": "reiksme" }
   Saltinis: Corris Rivett Workshop Manual, psl. 4-5
   ========================================================================== */

const VERSION = { // 5 laukas -- automobilio komplektacija (raw[2])
    "D": "L",
    "E": "LX",
    "G": "SLX",
    "P": "GT"
};

const PLANT = { // 2 laukas -- surinkimo gamykla (raw[4])
    "A": "Dagenham",
    "B": "Manchester",
    "C": "Saarlouis",
    "K": "Rheine"
};

const YEAR = { // 6 laukas -- gamybos metai (raw[8])
    "L": "1971 (Pre-Facelift)",
    "M": "1972 (Pre-Facelift)",
    "N": "1973 (Pre-Facelift)",
    "P": "1974 (Facelift)",
    "R": "1975 (Facelift)",
    "S": "1976 (Facelift)"
};

const MONTH = { // 7 laukas -- gamybos menuo (raw[9])
    "C": "January",
    "K": "February",
    "D": "March",
    "E": "April",
    "L": "May",
    "Y": "June",
    "S": "July",
    "T": "August",
    "J": "September",
    "U": "October",
    "M": "November",
    "P": "December"
};

const ENGINE = { // 10 laukas -- variklio kodas (raw[16-17])
    "NA": "Standard 2.0 (Stock Carburettor + Stock Exhaust)",
    "NE": "High Performance 2.0 (2-Barrel Carb + Stock Exhaust)"
};

const GEARBOX = { // 11 laukas -- pavaru deze (raw[18])
    "7": "3-Speed Automatic (requires Flexplate)",
    "B": "4-Speed Manual (requires Flywheel)"
};

const AXLE_RATIO = { // 12 laukas -- tilto perdavimo santykis (raw[19])
    "S": "3.44",
    "B": "3.75",
    "C": "3.89",
    "N": "4.11",
    "E": "4.44 (GT Specific)"
};

const AXLE_LOCK = { // 13 laukas -- diferencialo tipas (raw[20])
    "A": "Open Differential",
    "B": "LSD (Limited-Slip Differential)"
};

const BODY_COLOUR = { // 14 laukas -- kebo spalva (raw[21])
    "A": "Dark Grey",
    "B": "Nature White",
    "C": "Sand",
    "D": "Asphalt Grey",
    "E": "Blue",
    "F": "Sun Yellow",
    "G": "Dark Navy",
    "H": "Royal Red",
    "I": "Brown",
    "J": "Red",
    "K": "Electric Green",
    "L": "White Pearl",
    "M": "Spring Green",
    "R": "Purple",
    "T": "Yellow",
    "U": "Sky Blue",
    "V": "Orange",
    "X": "Navy Blue",
    "Y": "Special"
};

const VINYL_ROOF  = { "-": "Paint (No Vinyl Roof)", "A": "Black Vinyl", "B": "White Vinyl", "C": "Tan Vinyl", "K": "Light Brown Vinyl", "M": "Dark Brown Vinyl" }; // 15 laukas -- vinilo stogas (raw[22])
const INTERIOR    = { "N": "Red", "A": "Black", "K": "Tan", "F": "Blue", "Y": "Special" };                                                                          // 16 laukas -- salonas (raw[23])
const RADIO       = { "-": "Radio Delete", "J": "Radio Fitted" };                                                                                                    // 17 laukas -- radijas (raw[24])
const INSTRUMENT  = { "-": "Standard", "G": "Clock", "M": "Tachometer" };                                                                                           // 18 laukas -- prietaisu skydelis (raw[25])
const WINDSHIELD  = { "1": "Clear", "2": "Tinted", "F": "Sunstrip" };                                                                                               // 19 laukas -- priekinis stiklas (raw[26])
const SEATS       = { "8": "Standard Low-Back", "B": "Bucket Style" };                                                                                              // 20 laukas -- sedynes (raw[27])
const SUSPENSION  = { "A": "Standard", "B": "Standard + Stiffened", "4": "Lowered", "M": "Lowered + Stiffened" };                                                  // 21 laukas -- pakaba (raw[28])
const BRAKES      = { "-": "Standard Brakes", "B": "Power Brakes" };                                                                                                // 22 laukas -- stabdziai (raw[29])
const WHEELS      = { "A": "13\" Steel", "B": "13\" Steel + Hubcaps", "4": "14\" Sport", "M": "14\" Steel / 14\" Octo" };                                           // 23 laukas -- ratlankiai (raw[30])
const REAR_WINDOW = { "-": "Standard", "B": "Heated", "M": "Standard + Window Grille" };                                                                            // 24 laukas -- galinis stiklas (raw[31])


/* ==========================================================================
   makeCard(fieldNum, fieldName, code, value, isError)
   Sukuria viena dekodavimo kortele ir ja grazina kaip HTML elementa.
   fieldNum  -- lauko numeris rodymui, pvz. "1. COUNTRY"
   fieldName -- lauko pavadinimas, pvz. "Country of Production"
   code      -- neapdorotas VIN simbolis, pvz. "U"
   value     -- isdekodavus gautas tekstas, pvz. "Britain"
   isError   -- true jei kodo nerasta lentele, kortele pazymima raudonai
   ========================================================================== */
function makeCard(fieldNum, fieldName, code, value, isError = false) {
    const card = document.createElement("div");
    card.className = "vin-card" + (isError ? " error" : ""); // prideda .error klase jei kodo nera lentele

    const label = document.createElement("span");
    label.className = "vin-card-label";
    label.textContent = fieldNum;

    const name = document.createElement("span");
    name.className = "vin-card-name";
    name.textContent = fieldName;

    const val = document.createElement("span");
    val.className = "vin-card-value";
    val.textContent = value || "UNKNOWN"; // jei reiksmes nera -- rodoma UNKNOWN

    const rawCode = document.createElement("span");
    rawCode.className = "vin-card-code";
    rawCode.textContent = "CODE: " + code; // originalus VIN simbolis mazo teksto formatu

    card.appendChild(label);
    card.appendChild(name);
    card.appendChild(val);
    card.appendChild(rawCode);

    return card; // grazina paruosta kortele kaip HTML elementa
}


/* ==========================================================================
   decodeVIN()
   Pagrindine dekodavimo funkcija -- iškviesta paspaudus mygtuka DECODE
   arba paspaudus Enter.

   Tiksli VIN string poziciju schema:
     raw[0-1]  : BB   -- tipas, visada fiksuotas
     raw[2]    : ver  -- komplektacija (D/E/G/P)
     raw[3]    : U    -- salis, visada fiksuotas
     raw[4]    : plt  -- gamykla (A/B/C/K)
     raw[5]    : B    -- modelis, visada fiksuotas
     raw[6]    : B    -- kebulo tipas, visada fiksuotas
     raw[7]    : ver  -- komplektacija pasikartoja (nerodoma)
     raw[8]    : yr   -- metai (L/M/N/P/R/S)
     raw[9]    : mo   -- menuo (C/K/D/E/L/Y/S/T/J/U/M/P)
     raw[10-14]: serial -- 5 skaitmenu serijos numeris
     raw[15]   : 1    -- pavara, visada RWD
     raw[16-17]: eng  -- variklio kodas (NA arba NE)
     raw[18]   : gb   -- pavaru deze (7 arba B)
     raw[19]   : ar   -- tilto santykis (S/B/C/N/E)
     raw[20]   : al   -- diferencialo tipas (A arba B)
     raw[21]   : bc   -- kebo spalva
     raw[22]   : vr   -- vinilo stogas (- arba A/B/C/K/M)
     raw[23]   : int  -- salonas (N/A/K/F/Y)
     raw[24]   : rad  -- radijas (- arba J)
     raw[25]   : ins  -- prietaisu skydelis (- arba G/M)
     raw[26]   : ws   -- priekinis stiklas (1/2/F)
     raw[27]   : se   -- sedynes (8 arba B)
     raw[28]   : sus  -- pakaba (A/B/4/M)
     raw[29]   : br   -- stabdziai (- arba B)
     raw[30]   : wh   -- ratlankiai (A/B/4/M)
     raw[31]   : rw   -- galinis stiklas (- arba B/M)
   ========================================================================== */
function decodeVIN() {
    const raw = document.getElementById("vin-input").value.trim().toUpperCase().replace(/\s/g, ""); // nuskaito lauka, valo tarpus, vercia i didzsias raides

    const errorEl   = document.getElementById("vin-error");
    const resultEl  = document.getElementById("vin-result");
    const gridEl    = document.getElementById("vin-grid");
    const summaryEl = document.getElementById("vin-summary");

    // isvalo ankstesnius rezultatus pries nauja dekodavima
    errorEl.classList.remove("visible");
    resultEl.classList.remove("visible");
    gridEl.innerHTML    = "";
    summaryEl.innerHTML = "";

    if (raw.length < 16) { // per trumpas -- negali tureti visu baze lauku
        errorEl.classList.add("visible");
        return;
    }

    // isskaidoma eilute i atskirus laukus pagal tikslias pozicijas
    const version    = raw[2];                // komplektacija
    const country    = raw[3];                // salis -- visada U
    const plant      = raw[4];                // gamykla
    const model      = raw[5];                // modelis -- visada B
    const body       = raw[6];                // kebulo tipas -- visada B
    const year       = raw[8];                // gamybos metai
    const month      = raw[9];                // gamybos menuo
    const serial     = raw.substring(10, 15); // 5 skaitmenu serijos numeris
    const drive      = raw[15] || "-";        // pavara -- visada 1
    const engine     = raw.substring(16, 18) || "--"; // variklio kodas
    const gearbox    = raw[18] || "-";        // pavaru deze
    const axleRatio  = raw[19] || "-";        // tilto santykis
    const axleLock   = raw[20] || "-";        // diferencialo tipas
    const bodyColour = raw[21] || "-";        // kebo spalva
    const vinylRoof  = raw[22] || "-";        // vinilo stogas
    const interior   = raw[23] || "-";        // salonas
    const radio      = raw[24] || "-";        // radijas
    const instrument = raw[25] || "-";        // prietaisu skydelis
    const windshield = raw[26] || "-";        // priekinis stiklas
    const seats      = raw[27] || "-";        // sedynes
    const suspension = raw[28] || "-";        // pakaba
    const brakes     = raw[29] || "-";        // stabdziai
    const wheels     = raw[30] || "-";        // ratlankiai
    const rearWindow = raw[31] || "-";        // galinis stiklas

    // sukuriamos korteles kiekvienam laukui ir dedamos i tinklelį
    gridEl.appendChild(makeCard("1. COUNTRY",        "Country of Production",  country,    country === "U" ? "Britain" : "Unknown"));
    gridEl.appendChild(makeCard("2. ASSEMBLY PLANT", "Assembly Plant",         plant,      PLANT[plant],       !PLANT[plant]));
    gridEl.appendChild(makeCard("3. MODEL",          "Model",                  model,      model === "B" ? "Rivett" : "Unknown"));
    gridEl.appendChild(makeCard("4. BODY TYPE",      "Body Type",              body,       body === "B" ? "2D Pillared Sedan" : "Unknown"));
    gridEl.appendChild(makeCard("5. VERSION",        "Version / Trim",         version,    VERSION[version],   !VERSION[version]));
    gridEl.appendChild(makeCard("6. YEAR",           "Model Year",             year,       YEAR[year],         !YEAR[year]));
    gridEl.appendChild(makeCard("7. MONTH",          "Production Month",       month,      MONTH[month],       !MONTH[month]));
    gridEl.appendChild(makeCard("8. SERIAL NUMBER",  "Serial Number",          serial,     serial.length === 5 ? serial : "INVALID"));
    gridEl.appendChild(makeCard("9. DRIVE",          "Drivetrain",             drive,      drive === "1" ? "RWD (Rear-Wheel Drive)" : "Unknown"));
    gridEl.appendChild(makeCard("10. ENGINE",        "Engine",                 engine,     ENGINE[engine],     !ENGINE[engine]));
    gridEl.appendChild(makeCard("11. GEARBOX",       "Gearbox / Transmission", gearbox,    GEARBOX[gearbox],   !GEARBOX[gearbox]));
    gridEl.appendChild(makeCard("12. AXLE RATIO",    "Axle Ratio",             axleRatio,  AXLE_RATIO[axleRatio], !AXLE_RATIO[axleRatio]));
    gridEl.appendChild(makeCard("13. AXLE LOCK",     "Axle Lock",              axleLock,   AXLE_LOCK[axleLock],!AXLE_LOCK[axleLock]));
    gridEl.appendChild(makeCard("14. BODY COLOUR",   "Body Colour",            bodyColour, BODY_COLOUR[bodyColour], !BODY_COLOUR[bodyColour]));
    gridEl.appendChild(makeCard("15. VINYL ROOF",    "Vinyl Roof",             vinylRoof,  vinylRoof === "-" ? "Paint (No Vinyl Roof)" : (VINYL_ROOF[vinylRoof] || "Unknown")));
    gridEl.appendChild(makeCard("16. INTERIOR TRIM", "Interior Trim",          interior,   INTERIOR[interior], !INTERIOR[interior]));
    gridEl.appendChild(makeCard("17. RADIO",         "Radio",                  radio,      radio === "-" ? "Radio Delete" : (RADIO[radio] || "Unknown")));
    gridEl.appendChild(makeCard("18. INSTRUMENT",    "Instrument Panel",       instrument, instrument === "-" ? "Standard" : (INSTRUMENT[instrument] || "Unknown")));
    gridEl.appendChild(makeCard("19. WINDSHIELD",    "Windshield",             windshield, WINDSHIELD[windshield], !WINDSHIELD[windshield]));
    gridEl.appendChild(makeCard("20. SEATS",         "Seats",                  seats,      SEATS[seats],       !SEATS[seats]));
    gridEl.appendChild(makeCard("21. SUSPENSION",    "Suspension",             suspension, SUSPENSION[suspension], !SUSPENSION[suspension]));
    gridEl.appendChild(makeCard("22. BRAKES",        "Brakes",                 brakes,     brakes === "-" ? "Standard Brakes" : (BRAKES[brakes] || "Unknown")));
    gridEl.appendChild(makeCard("23. WHEELS",        "Wheels",                 wheels,     WHEELS[wheels],     !WHEELS[wheels]));
    gridEl.appendChild(makeCard("24. REAR WINDOW",   "Rear Window",            rearWindow, rearWindow === "-" ? "Standard" : (REAR_WINDOW[rearWindow] || "Unknown")));

    // suformuojama santraukos eilute rezultatu virsuje
    const trimName = VERSION[version]        || "?";
    const yearName = YEAR[year]              || "?";
    const engName  = ENGINE[engine]          || "?";
    const colName  = BODY_COLOUR[bodyColour] || "?";

    summaryEl.innerHTML =
        '<span style="color:var(--tt-yellow);">'             + trimName + '</span>' +
        ' &nbsp;|&nbsp; ' +
        '<span style="color:var(--amber-accent-primary);">'  + yearName + '</span>' +
        ' &nbsp;|&nbsp; ' +
        '<span style="color:var(--amber-text);">'            + engName  + '</span>' +
        ' &nbsp;|&nbsp; ' +
        '<span class="badge" style="background:var(--amber-accent-secondary);color:#000;">' + colName + '</span>';

    resultEl.classList.add("visible"); // parodo rezultatu sekcija
    resultEl.scrollIntoView({ behavior: "smooth", block: "start" }); // slenkama prie rezultatu
}


/* ==========================================================================
   clearVIN()
   Isvalo ivesties lauka, paslepia rezultatus ir klaidas, grazina fokusa.
   ========================================================================== */
function clearVIN() {
    document.getElementById("vin-input").value = ""; // isvalo lauka

    document.getElementById("vin-result").classList.remove("visible"); // paslepia rezultatus
    document.getElementById("vin-error").classList.remove("visible");  // paslepia klaida

    document.getElementById("vin-counter").textContent = "0 CHARACTERS ENTERED"; // atstatomas skaitiklis

    document.getElementById("vin-input").focus(); // fokusas grazinamas i ivesties lauka
}


/* ==========================================================================
   copyResult()
   Surenka visas dekodavimo korteles, suformuoja teksta ir irasoma i istrizma lenta.
   ========================================================================== */
function copyResult() {
    const cards = document.querySelectorAll(".vin-card"); // paima visas korteles is tinklelio

    let text = "CORRIS RIVETT -- DECODED VIN SPECIFICATION\n";
    text += "==========================================\n";

    cards.forEach(function(card) { // eina per kiekviena kortele ir surenkia pavadinima, reiksme, koda
        const name  = card.querySelector(".vin-card-name").textContent;
        const value = card.querySelector(".vin-card-value").textContent;
        const code  = card.querySelector(".vin-card-code").textContent;
        text += name + ": " + value + " (" + code + ")\n";
    });

    navigator.clipboard.writeText(text).then(function() { // irasoma i istrizma lenta
        const confirm = document.getElementById("copy-confirm");
        confirm.style.display = "inline"; // parodo patvirtinimo zinute

        setTimeout(function() {
            confirm.style.display = "none"; // paslepia po 2 sekundziu
        }, 2000);
    }).catch(function() {
        alert("Could not copy -- please copy manually."); // atsarginis variantas
    });
}


/* ==========================================================================
   Ivykiu klausytojai -- pridedami kai DOM visiškai uzsikrecia
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("vin-input").addEventListener("input", function() {
        const len = this.value.trim().length; // skaiciuoja kiek simboliu ivesta

        document.getElementById("vin-counter").textContent =
            len + " CHARACTER" + (len === 1 ? "" : "S") + " ENTERED"; // atnaujinamas skaitiklis

        if (len === 0) { // jei laukas tuscias -- paslepiami rezultatai ir klaidos
            document.getElementById("vin-error").classList.remove("visible");
            document.getElementById("vin-result").classList.remove("visible");
        }
    });

    document.getElementById("vin-input").addEventListener("keydown", function(e) {
        if (e.key === "Enter") { // Enter klavisas suaktyvina dekodavima
            decodeVIN();
        }
    });

});