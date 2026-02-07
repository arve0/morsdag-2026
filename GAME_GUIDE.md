# Spilloversikt - Morsdag 2026

## Spillskjermer

### 1. Hovedspill (GameScene)
```
┌─────────────────────────────────────────────────────┐
│                    Kjør til mål!                     │
│                                                      │
│  ┌──────┐                              💰 100 kr   │
│  │ MÅL  │                              🐱 3        │
│  └──────┘                                           │
│                                                      │
│         🐕                                           │
│                                                      │
│                    🐱                                │
│                                                      │
│              🚗                                      │
│                                                      │
│                         🐕                           │
│                                                      │
│  ┌──────┐                                           │
│  │START │                                           │
│  └──────┘                                           │
└─────────────────────────────────────────────────────┘
```

**Kontroller:**
- ↑/W: Fremover
- ↓/S: Rygge
- ←/A: Venstre
- →/D: Høyre

**Elementer:**
- 🏁 START: Sjakkfelt-mønster med grønn tekst
- 🏁 MÅL: Sjakkfelt-mønster med rød tekst
- 🚗 Bil: Styrt av spilleren
- 🐕 Hunder: Beveger seg over banen (-20 kr ved kollisjon)
- 🐱 Katter: Hopper og samles (+1 til telleren)
- 💰 Penger: Vises øverst høyre
- 🐱 Katteteller: Under pengene

### 2. Resultatskjerm
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│                   DU VANT!                          │
│                                                      │
│                                                      │
│             Katter samlet: 5                         │
│             Penger: 180 kr                           │
│                                                      │
│                                                      │
│    ┌──────────┐           ┌──────────────┐         │
│    │ 🛒 BUTIKK │           │ 🏁 KJØR IGJEN │         │
│    └──────────┘           └──────────────┘         │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 3. Butikk (ShopScene)
```
┌─────────────────────────────────────────────────────┐
│              🛒 BUTIKKEN              💰 180 kr     │
│                                                      │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐               │
│  │  🍉 │  │  🫐 │  │  🍓 │  │  🍇 │               │
│  │     │  │     │  │     │  │     │               │
│  │50 kr│  │10 kr│  │50 kr│  │20 kr│               │
│  └─────┘  └─────┘  └─────┘  └─────┘               │
│ Vannmelon Blåbær  Jordbær  Bringebær               │
│                                                      │
│  ┌─────┐  ┌─────┐  ┌─────┐                         │
│  │  🍒 │  │  🔴 │  │  🔵 │                         │
│  │     │  │     │  │     │                         │
│  │30 kr│  │10 kr│  │25 kr│                         │
│  └─────┘  └─────┘  └─────┘                         │
│ Kirsebær Tyttebær Bjørnebær                         │
│                                                      │
│                                                      │
│              ← Tilbake til spill                     │
└─────────────────────────────────────────────────────┘
```

**Interaksjon:**
- Klikk på vare for å kjøpe
- Penger flyr til toppen ved kjøp
- "Ikke nok penger" hvis for lite

## Spillflyt

```
START SPILL
    ↓
[Loading Screen]
    ↓
[GameScene + UIScene]
    ↓
Kjør fra START
    ↓
Unngå hunder 🐕
Samle katter 🐱
    ↓
Nå MÅL
    ↓
[Resultatskjerm]
    ↓
  ┌─────┴─────┐
  ↓           ↓
BUTIKK    KJØR IGJEN
  ↓
Kjøp frukt
  ↓
Tilbake til spill
```

## Spillmekanikk

### Poeng/Penger System
- **Start**: 0 kr
- **Vinn uten kollisjon**: +100 kr
- **Kollisjon med hund**: -20 kr
- **Katter**: Kun teller, ingen penger

### Butikkpriser
| Vare        | Pris  |
|------------|-------|
| Vannmelon  | 50 kr |
| Blåbær     | 10 kr |
| Jordbær    | 50 kr |
| Bringebær  | 20 kr |
| Kirsebær   | 30 kr |
| Tyttebær   | 10 kr |
| Bjørnebær  | 25 kr |

### Vinner-betingelser
1. ✅ Nå MÅL uten hundekollisjon = **Du vant!** (+100 kr)
2. ⚠️ Nå MÅL med kollisjon = **Ferdig!** (ingen bonus)

### Tips for å vinne
1. 🎯 Kjør forsiktig - hunder kommer fra alle kanter
2. 🐱 Samle katter for moro skyld
3. 💰 Unngå kollisjon for 100 kr bonus
4. 🛒 Spar penger eller bruk i butikken
5. 🔄 Prøv igjen for å forbedre scoren

## Tekniske detaljer

### Fysikk
- **Arcade Physics** (Phaser)
- **Drag**: 150 (friksjon)
- **Max hastighet**: 200 px/s
- **Rotasjonshastighet**: 150°/s
- **World bounds**: Aktivert

### Spawn-timer
- **Hunder**: Hver 3. sekund
- **Katter**: Hver 2. sekund
- **Levetid**: 5 sekunder før despawn

### Animasjoner
- Katte-hopp: 300ms yoyo (2 repeats)
- Pengeflyvning: 1000ms med fade
- Knapp-hover: 1.1x scale
- Blink ved kollisjon: 200ms rød tint

## Asset-støtte

### Med egne assets
Legg PNG-filer i `assets/` mappen:
- bane.png, bil.png, katt.png, hund.png
- 7x frukt/bær bilder
- 4x MP3 lydfiler

### Uten assets
Automatisk fallback-grafikk:
- Grønn bane med grå vei
- Rød bil med blått vindu
- Oransje katt
- Brun hund
- Fargede sirkler for frukt

## Kompatibilitet

✅ **Nettlesere:**
- Chrome/Edge (anbefalt)
- Firefox
- Safari
- Opera

✅ **Enheter:**
- Desktop (optimal)
- Laptop
- Tablet (støttet)

⚠️ **Krav:**
- JavaScript aktivert
- ES6 Module support
- Canvas 2D support

## Feilsøking

### Spillet laster ikke
1. Sjekk konsoll for feil (F12)
2. Verifiser at HTTP server kjører
3. Prøv http://localhost:8000

### Ingen lyd
- Klikk i vinduet først (browsers krever brukerinteraksjon)
- Sjekk at lydfilene er MP3 format
- Fallback: spillet fungerer uten lyd

### Bil beveger seg ikke
- Trykk i spillvinduet først
- Prøv både piltaster og WASD
- Sjekk at spillet har startet (ikke loading screen)

## Utvid spillet

### Enkle tillegg
1. Endre farger i fallback-grafikk
2. Juster hastigheter i constants.js
3. Legg til flere butikkvarer
4. Endre spawn-timer

### Avanserte tillegg
1. Flere levels med økende vanskelighet
2. Lagre high score i localStorage
3. Multiplayer over nettverket
4. Touch-kontroller for mobil
5. Partikkeleffekter
6. Power-ups (shield, speed)

---

**God morsdag og ha det gøy med spillet!** 🎮🚗💐
