# Design Tokens Pipeline

This project uses **Style Dictionary v5** to transform Figma-exported JSON tokens into themeable CSS variables. It is architected as a **Hybrid Transformation Pipeline**, allowing for multi-brand scaling and instant theme-switching in Storybook.

# Design Tokens Pipeline:

## 🏗 Architecture

The pipeline addresses the gap between Figma's nested structure and production-ready CSS through three main stages:

### 1. The Brand-Aware Parser (`token-unwrapper`)

Figma exports tokens inside deep wrappers like `Mapped/BrandA`. This parser "lifts" the tokens to the root level.

- **Why:** It allows Style Dictionary to resolve shorthand references like `{Colour.White}` which would otherwise fail because the data is "hidden" inside a brand folder.

### 2. The Reference Cleaner (`fixReferenceStrings`)

A preprocessor that cleans internal token values.

- **Action:** It strips prefixes like `Colour.`, `Brand.`, or `Alias.` from reference strings so they match our flattened data structure.

### 3. The Name Transform (`name/clean-ids`)

A custom transformer that sanitizes CSS variable names.

- **Removes:** `↘︎` symbols, folder names (Primitives, Mapped, etc.).
- **Formats:** Converts spaces and slashes to hyphens and enforces lowercase.
- **Result:** Turns `Mapped/BrandA/Surface/↘︎ Label` into `--surface-label`.

## 🛠 Troubleshooting

### Token Collisions

You may see "Token Collision" warnings during the build. This is **intentional**. It occurs when a Mapped brand token overrides an Alias token. The pipeline is designed to let the most specific (brand-specific) token "win."

### Reference Errors

If the build fails with "Reference not found," check that the `fixReferenceStrings` regex in `config.js` accounts for the folder names used in your Figma file.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Place your tokens:** Ensure your Figma export is located at `tokens-custom/figma-tokens.json`.

3. **Build the tokens:** This runs the `build-tokens.js` script which executes a multi-pass build.
   ```bash
   npm run build:tokens
   ```

## 🎨 Multi-Brand Scaling

The build logic is **automated via a loop**. To add a new brand:

1. Open `config.js`.
2. Add the brand name to the `brands` array:
   ```javascript
   const brands = ["BrandA", "BrandB", "BrandC"];
   ```
