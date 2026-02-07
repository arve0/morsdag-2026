# ⚡ Quick Start - Morsdag 2026

## 🎮 Start spillet
```bash
./start.sh
```
eller
```bash
python3 -m http.server 8000
```
Åpne: http://localhost:8000

---

## 🎯 Målet
Kjør fra **START** til **MÅL** uten å kræsje i hunder!

---

## 🕹️ Kontroller
- **↑** eller **W** = Fremover
- **↓** eller **S** = Rygge
- **←** eller **A** = Venstre
- **→** eller **D** = Høyre

---

## 💰 Penger
- ✅ **Vinn**: +100 kr (ingen kollisjon)
- ❌ **Kræsj**: -20 kr per hund
- 🛒 **Butikk**: Kjøp frukt (10-50 kr)

---

## 🐾 Elementer
- 🐕 **Hunder** = Unngå! (-20 kr)
- 🐱 **Katter** = Samle! (teller opp)
- 🏁 **MÅL** = Kjør hit for å vinne

---

## 📁 Filer
```
index.html       → Start her
src/main.js      → Konfigurasjon
src/scenes/      → Spillscener
src/data/        → Konstanter
assets/          → Legg bilder/lyd her
```

---

## 🎨 Assets (valgfritt)
Legg i `assets/` mappen:
- bane.png (bane)
- bil.png (bil)
- katt.png (katt)
- hund.png (hund)
- music.mp3 (musikk)

**Ingen assets?** No problem! Fallback-grafikk aktiveres automatisk.

---

## 🔧 Juster spillet
Rediger `src/data/constants.js`:
```javascript
CAR_SPEED: 200           // Bilhastighet
DOG_SPEED: 100           // Hundehastighet
WIN_REWARD: 100          // Vinner-bonus
DOG_COLLISION_PENALTY: 20 // Kollisjon-straff
```

---

## 📚 Mer info
- `README.md` - Full dokumentasjon
- `GAME_GUIDE.md` - Spillguide
- `IMPLEMENTATION.md` - Teknisk dokumentasjon
- `PLAN.md` - Utviklingsplan

---

## 🐛 Problemer?
1. Sjekk konsoll (F12)
2. Verifiser at server kjører
3. Klikk i vinduet (for lyd)
4. Prøv annen nettleser

---

## 🎉 Ha det gøy!
God Morsdag 2026! 🚗💐
