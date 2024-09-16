const fs = require('fs');
const path = require('path');

// Laad je JSON-bestand in
const inputFilePath = path.join(__dirname, 'figma.json');
const structuredJson = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));

// Converteer de JSON-waarden naar Tailwind-formaat

// 1. Kleuren
const colors = structuredJson.colors;

// 2. Font sizes
const fontSize = structuredJson.fontSize;

// 3. Font family
const fontFamily = structuredJson.fontFamily;

// 4. Shadows
const boxShadow = structuredJson.boxShadow;

// 5. Border radius
const borderRadius = structuredJson.borderRadius;

// Tailwind config instellen
module.exports = {
  theme: {
    extend: {
      colors,      // Voeg kleuren toe
      fontSize,    // Voeg lettergroottes toe
      fontFamily,  // Voeg lettertypen toe
      boxShadow,   // Voeg schaduwen toe
      borderRadius // Voeg border radius toe
    },
  },
};
