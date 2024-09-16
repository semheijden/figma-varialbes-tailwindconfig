const fs = require('fs-extra');
const path = require('path');

// Functie om JSON te herstructureren
function restructureJson(json) {
    const structuredJson = {
        colors: {
            primary: {
                brand: {},
                secondary: {}
            },
            neutral: {
                grey: {},
                black: {},
                white: {}
            },
            signals: {},
            aliases: {
                surface: {},
                background: {},
                foreground: {},
                border: {},
                typography: {},
                interactive: {},
                status: {},
                dataViz: {}
            }
        },
        typography: {
            fontFamilies: {},
            fontSizes: {},
            fontWeights: {},
            letterSpacings: {},
            lineHeights: {},
            headings: {}
        }
    };

    // Dynamische kleurherstructurering op basis van naam
    const colors = json.colors.default;
    for (const key in colors) {
        const value = colors[key].toLowerCase();
        
        if (key.toLowerCase().includes("primary")) {
            const index = key.match(/\d+/) ? key.match(/\d+/)[0] : 'unknown';
            structuredJson.colors.primary.brand[index] = value;
        } else if (key.toLowerCase().includes("secondary")) {
            const index = key.match(/\d+/) ? key.match(/\d+/)[0] : 'unknown';
            structuredJson.colors.primary.secondary[index] = value;
        } else if (key.toLowerCase().includes("grey")) {
            const index = key.match(/\d+/) ? key.match(/\d+/)[0] : 'unknown';
            structuredJson.colors.neutral.grey[index] = value;
        } else if (key.toLowerCase().includes("black")) {
            const index = key.match(/\d+/) ? key.match(/\d+/)[0] : 'unknown';
            structuredJson.colors.neutral.black[index] = value;
        } else if (key.toLowerCase().includes("white")) {
            const index = key.match(/\d+/) ? key.match(/\d+/)[0] : 'unknown';
            structuredJson.colors.neutral.white[index] = value;
        } else if (key.toLowerCase().includes("signal")) {
            const signalType = key.replace("baseSignal", "").toLowerCase();
            structuredJson.colors.signals[signalType] = value;
        } else if (key.toLowerCase().includes("alias")) {
            const aliasType = key.replace("alias", "").match(/[A-Z][a-z]+/g).map(w => w.toLowerCase()).join('');
            const category = aliasType.match(/[a-z]+/)[0];
            const subType = aliasType.replace(category, '');
            if (structuredJson.colors.aliases[category]) {
                structuredJson.colors.aliases[category][subType] = value;
            }
        }
    }

    const typography = json.typography.default;
    for (const key in typography) {
        const value = typography[key];

        if (key.toLowerCase().includes("fontfamily")) {
            const fontType = key.replace("fontFamily", "").toLowerCase();
            structuredJson.typography.fontFamilies[fontType] = value;
        } else if (key.toLowerCase().includes("fontsize")) {
            const size = key.match(/\d+/) ? key.match(/\d+/)[0] : 'unknown';
            structuredJson.typography.fontSizes[size] = value;
        } else if (key.toLowerCase().includes("fontweight")) {
            const weightType = key.replace("fontWeight", "").toLowerCase();
            structuredJson.typography.fontWeights[weightType] = value;
        } else if (key.toLowerCase().includes("letterspacing")) {
            const spacingType = key.replace("letterSpacing", "").toLowerCase();
            structuredJson.typography.letterSpacings[spacingType] = value;
        } else if (key.toLowerCase().includes("lineheight")) {
            const heightType = key.replace("lineHeight", "").toLowerCase();
            structuredJson.typography.lineHeights[heightType] = value;
        } else if (key.toLowerCase().includes("heading")) {
            const headingType = key.match(/h\d/)[0].toLowerCase();
            structuredJson.typography.headings[headingType] = {
                fontFamily: typography[`typography${headingType.toUpperCase()}FontFamily`],
                fontSize: typography[`typography${headingType.toUpperCase()}FontSize`],
                fontWeight: typography[`typography${headingType.toUpperCase()}FontWeight`],
                letterSpacing: typography[`typography${headingType.toUpperCase()}LetterSpacing`],
                lineHeight: typography[`typography${headingType.toUpperCase()}LineHeight`]
            };
        }
    }

    return structuredJson;
}

// Pad naar je JSON-bestand
const inputFilePath = path.join(__dirname, 'figma-exports', 'tokens.json');
const outputFilePath = path.join(__dirname, 'figma-exports', 'structured_tokens.json');

// Lezen van JSON-bestand
fs.readJson(inputFilePath)
  .then(json => {
      const structuredJson = restructureJson(json);
      // Schrijven naar nieuw bestand
      return fs.writeJson(outputFilePath, structuredJson, { spaces: 2 });
  })
  .then(() => {
      console.log('JSON succesvol herstructureerd en opgeslagen in', outputFilePath);
  })
  .catch(err => {
      console.error('Fout bij het verwerken van JSON:', err);
  });
