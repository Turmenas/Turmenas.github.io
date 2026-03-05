# Projektas Corris Rivett Workshop Manual

Nuoroda į projektą:[Corris Rivett Workshop Manual](https://turmenas.github.io/)

Šis projektas – tai skaitmeninis Corris Rivett automobilio remonto ir derinimo vadovas. Tai statinis tinklalapis, sukurtas suteikti aiškią, lengvai prieinamą techninę informaciją automobilių entuziastams.

## Kaip paleisti projektą?
Projektas veikia be jokios serverinės dalies ar duomenų bazių:
- Naršyklėje: Paspauskite aukščiau esančią nuorodą.
- Lokalioje aplinkoje: Atsisiųskite repozitoriją ir atidarykite index.html failą bet kurioje interneto naršyklėje.

## Struktūra
- index.html – Pagrindinis puslapis su gido įvadu ir bendra informacija.
- parts.html – Techninių detalių sąrašas, specifikacijos ir derinimo (tuning) instrukcijos.
- contact.html – Mechaniko pagalbos forma gedimų registravimui.
- css/style.css – Pagrindinis stilių failas, atsakingas už dizainą ir interaktyvius elementus.
- img/ – Katalogas su projekte naudojamais vaizdais.

## Projekto funkcijos (Project features)
- CSS filtravimo sistema: parts.html puslapyje įdiegta interaktyvi filtravimo sistema, veikianti be JavaScript pagalbos. Naudojant modernius CSS selektorius (:has(), :checked), vartotojai gali filtruoti turinį pagal kategorijas, realiuoju laiku rodant ar slepiant atitinkamas detales.
- Prieinamumas (Accessibility): Įdiegti focus-visible kontūrai ir šuolinės nuorodos (Skip to main content). Naudojami tinkami ARIA atributai ir taikomas aukštas spalvų kontrastas.
- Responsive dizainas: Svetainė yra visiškai pritaikyta mobiliiesiems įrenginiams naudojant CSS Grid ir Flexbox.
- Interaktyvumas: Puslapyje naudojami "Jump-links" (nuorodos su href="#id"), leidžiantys vartotojui greitai peršokti nuo detalių sąrašo tiesiai prie konkrečios derinimo instrukcijos.

# Autorius (Authors)

[Gabrielius Tumėnas](https://github.com/Turmenas)

Gabrielius Tumėnas: [Github](https://github.com/Turmenas)
