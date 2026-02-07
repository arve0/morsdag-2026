# Morsdag 2026 - Bilspill

Et morsomt Phaser-spill laget for Morsdag 2026!

## Beskrivelse

Kjør bilen fra start til mål, unngå hunder, samle katter, tjen penger og kjøp frukt i butikken!

## Hvordan spille

1. **Start spillet**: Åpne `index.html` i en nettleser
2. **Kontroller**:
   - Bruk **piltaster** eller **WASD** for å styre bilen
   - **Opp/W**: Kjør fremover
   - **Ned/S**: Rygge
   - **Venstre/A**: Sving venstre
   - **Høyre/D**: Sving høyre

3. **Mål**:
   - Kjør fra START til MÅL
   - Unngå hunder som krysser veien
   - Samle katter underveis
   - Vinn 100 kr hvis du når målet uten kollisjon

4. **Butikk**:
   - Klikk på varer for å kjøpe
   - Se pengene fly til pengekofferten!

## Assets som kreves

Plasser følgende bilder i `assets/` mappen:

### Bilder
- `bane.png` - Bilbanen
- `bil.png` - Bilen
- `katt.png` - Katten
- `hund.png` - Hunden (hindring)

### Butikkvarer (valgfritt - fallback-grafikkbrukes hvis de mangler)
- `vannmelon.png` (50 kr)
- `blabaer.png` (10 kr)
- `jordbaer.png` (50 kr)
- `bringebaer.png` (20 kr)
- `kirsebaer.png` (30 kr)
- `tyttebaer.png` (10 kr)
- `bjornebaer.png` (25 kr)

### Lyd (valgfritt)
- `music.mp3` - 8-bit bakgrunnsmusikk
- `collision.mp3` - Kræsj-lyd
- `purchase.mp3` - Kjøp-lyd
- `win.mp3` - Vinner-lyd

**Merk**: Spillet fungerer uten assets - fallback-grafikk genereres automatisk!

## Kjøring

### Enkel metode (Python)
```bash
python3 -m http.server 8000
```
Åpne http://localhost:8000

### Med Node.js
```bash
npx serve
```

### Med VS Code
Bruk "Live Server" extension

## Prosjektstruktur

```
morsdag-2026/
├── index.html          # Hovedfil
├── assets/             # Bilder og lyd
├── src/
│   ├── main.js         # Phaser konfigurasjon
│   ├── data/
│   │   └── constants.js # Konstanter og priser
│   └── scenes/
│       ├── BootScene.js   # Asset-loading
│       ├── GameScene.js   # Hovedspill
│       ├── UIScene.js     # UI overlay
│       └── ShopScene.js   # Butikk
├── PLAN.md             # Utviklingsplan
└── README.md           # Denne filen
```

## Spillfunksjoner

✅ Bil med realistisk kjørefysikk
✅ Start- og målområder med sjakkfelt-mønster
✅ Bevegelige hunde-hindringer
✅ Hoppende katter å samle
✅ Penger-system
✅ Kollisjonshåndtering
✅ Butikk med 7 varer
✅ Animerte kjøp med penger som flyr
✅ Resultatskjerm med valg
✅ UI med penger og katteteller
✅ Lyd og musikk support

## Tips

- Begynn forsiktig - hunder kommer fra alle kanter!
- Samle katter for ekstra moro
- Unngå kollisjon for å få 100 kr bonus
- Kjøp favorittfruktene dine i butikken

## Teknisk info

- **Phaser 3.60.0** via CDN
- **Arcade Physics** for kollisjon
- **ES6 Modules** for kodeorganisering
- Støtter moderne nettlesere

God Morsdag! 🎮🚗💐
