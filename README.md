# Integratie van Figma Styles naar TailwindCSS

## Voor Designers:
Dit proces begint met het juist definiëren van de lokale stijlen in Figma.

1. **Gebruik Figma Best Practices:**
   - Bekijk dit voorbeeld Figma bestand dat laat zien hoe Local Styles gedefinieerd moeten worden: 
     [Tailwind CSS UI Figma File](https://www.figma.com/community/file/768809027799962739)
---

## Voor Developers:

### Stap 1: Figma Export Plugin
Zodra de stijlen correct zijn gedefinieerd in Figma, kun je deze exporteren met de volgende plugin:

- **Figma TailwindCSS Plugin**  
  [Download hier](https://www.figma.com/community/plugin/785619431629077634/figma-tailwindcss)

Deze plugin zal je helpen de stijlen te exporteren in een JSON-indeling die compatibel is met Tailwind.

### Stap 2: JSON Export Instellingen
Tijdens het gebruik van de plugin:
1. **Controleer de variabelen:**
   - De plugin geeft een stapsgewijs formulier waarin je alle gegenereerde variabelen nog eens kunt nakijken en controleren.

2. **Kleuren groeperen:**
   - **Belangrijk:** Zorg ervoor dat de kleuren gegroepeerd worden in de laatste stap. Dit doe je door de 'Group Colors' optie op `true` te zetten (gebruik de selectbox).

---

## Project Setup

### Stap 1: Voeg de bestanden toe
Plaats de gegenereerde `figma.json` en `extend_config.js` in de **root** van het project.

- `figma.json`: Dit bestand bevat de geëxporteerde stijlen.
- `extend_config.js`: Dit bestand is verantwoordelijk voor het extensieproces van de Tailwind configuratie met de nieuwe stijlen.

### Stap 2: Extend Tailwind Configuratie
Zorg ervoor dat je `tailwind.config.js` eruitziet als het onderstaande voorbeeld.

```js
const figmaVariables = require('./extend_config.js');

module.exports = {
  content: [],
  theme: {
    extend: {
      ...figmaVariables.theme.extend
    },
  },
  plugins: [],
}
