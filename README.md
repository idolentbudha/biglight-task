# Biglight Multi-Brand Design System

This project uses **Vite + Preact** with **Style Dictionary v5** to transform Figma-exported JSON tokens into themeable CSS variables. It supports multi-brand theming with runtime switching and production-optimized single-brand builds.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. View Storybook with theme switcher
npm run storybook
```

**Note**: `npm install` has a `postinstall` hook that runs `build:tokens` automatically, but if tokens are missing, run `npm run build:tokens` manually.

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

# 4. Generated files in build/css/ are auto-imported via build/css/imports.css
```

**Note**: `build/css/` is **gitignored** (auto-generated from JSON). `src/style.css` imports `build/css/imports.css` which contains all brand-specific CSS imports.

### Token Architecture (4-Layer Model)

| Layer                     | Scope                    | Purpose                    | Example                                         |
| ------------------------- | ------------------------ | -------------------------- | ----------------------------------------------- |
| **L0: Global Primitives** | `:root`                  | Shared foundational values | Grey scale, spacing, radii                      |
| **L1: Brand Primitives**  | `[data-theme="brand-x"]` | Brand-owned values         | Brand colors, fonts                             |
| **L2: Alias/Semantic**    | `[data-theme="brand-x"]` | Meaning, not usage         | `color-primary`, `color-text-default`           |
| **L3: Mapped**            | `[data-theme="brand-x"]` | Component-ready tokens     | `surface-action-primary`, `text-action-primary` |

## 🏗 Architecture Overview

The pipeline transforms Figma's nested structure into production-ready CSS through three main stages:

### 1. The Brand-Aware Parser (`token-unwrapper`)

Figma exports tokens inside deep wrappers like `Mapped/BrandA`. This parser "lifts" the tokens to the root level so Style Dictionary can resolve shorthand references like `{Colour.White}`.

### 2. The Reference Cleaner (`fixReferenceStrings`)

Strips prefixes like `Colour.`, `Brand.`, or `Alias.` from reference strings so they match our flattened data structure.

### 3. The Name Transform (`name/clean-ids`)

Sanitizes CSS variable names by removing `↘︎` symbols, folder names (Primitives, Mapped, etc.), and converting to kebab-case. Result: `Mapped/BrandA/Surface/↘︎ Label` → `--surface-label`.

## 🎯 Multi-Brand Scaling

To add a new brand:

1. Open `config.js`
2. Add the brand name to the `brands` array:
   ```javascript
   const brands = ["BrandA", "BrandB", "BrandC"];
   ```
3. Run `npm run build:tokens`

The build automatically generates all CSS files for the new brand.

## 🛠 Troubleshooting

### Token Collisions

"Token Collision" warnings are **intentional** - they occur when brand-specific tokens override alias tokens (by design).

### Reference Errors

If the build fails with "Reference not found," check that the `fixReferenceStrings` regex in `config.js` accounts for your Figma folder names.
