# Biglight Multi-Brand Design System

This project uses **Vite + Preact** with **Style Dictionary v5** to transform Figma-exported JSON tokens into themeable CSS variables. It supports multi-brand theming with runtime switching and production-optimized single-brand builds.

## 🚀 Quick Start

```bash
# 1. Install dependencies (automatically runs build:tokens)
npm install

# 2. Start development server
npm run dev

# 3. View Storybook with theme switcher
npm run storybook
```

## 📋 Available Scripts

- `npm run dev` - Start Vite dev server with HMR
- `npm run build` - Production build (auto-generates tokens + bundles)
- `npm run build:tokens` - Manually regenerate CSS from design tokens
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook on port 6006

## 🎨 Design Token Workflow

### When Design Tokens Change

```bash
# 1. Designer exports new tokens from Figma
# 2. Replace tokens-custom/figma-tokens.json
# 3. Regenerate CSS
npm run build:tokens

# 4. Tokens are now available in build/css/ and auto-imported
```

**Note**: `build/css/` is **gitignored** (auto-generated from JSON). `src/style.css` brand imports section is auto-updated.

### Token Architecture (4-Layer Model)

| Layer                     | Scope                    | Purpose                    | Example                                         |
| ------------------------- | ------------------------ | -------------------------- | ----------------------------------------------- |
| **L0: Global Primitives** | `:root`                  | Shared foundational values | Grey scale, spacing, radii                      |
| **L1: Brand Primitives**  | `[data-theme="brand-x"]` | Brand-owned values         | Brand colors, fonts                             |
| **L2: Alias/Semantic**    | `[data-theme="brand-x"]` | Meaning, not usage         | `color-primary`, `color-text-default`           |
| **L3: Mapped**            | `[data-theme="brand-x"]` | Component-ready tokens     | `surface-action-primary`, `text-action-primary` |

## 🏗 Architecture Overview

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
