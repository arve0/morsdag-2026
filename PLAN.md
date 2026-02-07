# Plan

## Mål
- Lag et Phaser-spill med start/mal, kollisjoner og poeng/penger.
- Bane fra bane.png, bil fra bil.png, katt fra katt.png.
- Energiskt 8bit musikk og enkel lydeffekt ved kollisjon/kjop.

## Milepaeler
1. Prosjektgrunnlag og asset-loader.
2. Kjernegameplay pa banen (bil, start, mal).
3. Hindringer, katter, penger, vinner/taper.
4. UI og runde-flyt.
5. Butikkscene og kjop.
6. Polering, lyd, testing.

## Steg-for-steg
### 1) Oppsett og struktur
- Initialiser Phaser-prosjekt med en enkel build (vite eller enkel dev-server).
- Opprett mappestruktur:
  - assets/ (bane.png, bil.png, katt.png, hund.png, musikk, sfx)
  - src/scenes/ (BootScene, GameScene, ShopScene, UIScene)
  - src/data/ (konstanter, priser)
- Lag en enkel game-config og fast canvas-storrelse.

### 2) Boot og Asset-loading
- BootScene laster alle bilder og lyd.
- Legg inn fallback-farge eller enkel tekst dersom asset mangler.
- Verifiser at bane.png renderes riktig pa canvas.

### 3) GameScene: Bane, start, mal
- Tegn banen som bakgrunn.
- Definer start- og mal-omrade:
  - Start er tekst/markor + hvitt/svart sjakkfelt-omrade.
  - Mal er tekst/markor pa banen.
- Plasser bil ved start og la den stoppe ved mal.

### 4) Bilkontroll og fysikk
- Velg Arcade Physics.
- Implementer styring:
  - Piltaster eller WASD.
  - Akselerasjon og friksjon for jevn kjoring.
- Kollisjon mot banegrenser (kan bruke usynlige collider-rects eller banemask).

### 5) Hindringer og katter
- Hunder: bevegelige hinder som krysser veien i intervaller.
- Kollisjon bil + hund:
  - Mister penger.
  - Kort stopp eller blinkeffekt.
- Katter: hopper og telles mens de kjores.
  - Spawn og animasjon.
  - Teller i UI.

### 6) Vinner/taper-logikk
- Vinner dersom bilen nar mal uten hundekollisjon.
- Ved vinner: +100 kroner.
- Tap dersom krasj i hund (ogsa mulig fortsette men ikke vinne).
- Vis resultat-overlay og valg: Butikk eller Kjor igjen.

### 7) UI og penger
- UIScene (overlay) viser:
  - Penger oppe til hoyre.
  - Katteteller.
  - Meldinger (start, mal, krasj, vinn).
- Bruk lettleselig font og tydelige farger.

### 8) Butikkscene
- Vis hyller med frukt/baer og priser.
- Klikk pa vare:
  - Sjekk penger.
  - Trekk belop.
  - Animer penger som flyr til toppen av hyllen (til pengekoffert-ikon).
- Tilbake-knapp til GameScene.

### 9) Lyd og musikk
- Lag/legg inn 8bit musikk som loop.
- SFX for:
  - Kollisjon med hund.
  - Kjop i butikk.
  - Vinner.

### 10) Testing og polering
- Test start/mal-omrader og kollisjon naktig.
- Test alle kjop og at penger ikke blir negative.
- Juster fart, hunde-rytm e og kattefrekvens.
- Mobile/desktop input fallback (touch-kontroller valgfritt).

## Data og konstanter
- Start/mal-omrader: definert som rektangler i konfig.
- Priser i butikk:
  - vannmelon: 50
  - blabaer: 10
  - jordbaer: 50
  - bringebaer: 20
  - kirsebaer: 30
  - tyttebaer: 10
  - bjornebaer: 25

## Akseptansekriterier
- Bil starter pa start og stopper pa mal.
- Kollisjon med hund trekker penger.
- Katter telles mens bil kjores.
- Vinner gir 100 kroner hvis ingen hundekollisjon.
- Butikk lar deg kjop e varer og animerer penger.
- Penger vises oppe til hoyre.
- Musikken spiller i spill og butikk.

## Risikoer og avklaringer
- Bane-kollisjon krever enten maske eller usynlige colliders.
- Krever hund.png hvis ikke spesifisert, ellers bruk enkel sprite.
- Avklar om kun en bil eller flere biler i start.
