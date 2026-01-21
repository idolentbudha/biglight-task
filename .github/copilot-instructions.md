# Copilot Instructions for biglight-task

These notes help AI agents work productively in this repo. Keep guidance concrete and codebase-specific.

## Architecture Overview

- **SPA Framework**: Vite + Preact with routing via `preact-iso`. Entry at [index.html](../index.html) → [src/index.tsx](../src/index.tsx).
- **Component Layer**: MUI base components wrapped with Tailwind semantic tokens. All UI components are in [src/components/ui](../src/components/ui).
- **Multi-Brand Theming**: Style Dictionary builds brand-specific CSS vars. Theme switching via `data-theme` attribute on `<body>` (e.g., `data-theme="brand-a"`).
- **CSS Cascade Layers**: Uses `@layer theme, base, mui, components, utilities` for predictable style ordering. MUI is wrapped in `StyledEngineProvider enableCssLayer` to isolate its styles.
- **Routing**: Pages in [src/pages](../src/pages). Current: `/` → [Login](../src/pages/login/index.tsx); 404 → [\_404.tsx](../src/pages/_404.tsx).

## TypeScript / JSX Setup

- `tsx` files with Preact: `jsx: react-jsx`, `jsxImportSource: preact` in [tsconfig.json](../tsconfig.json).
- React compat aliases configured for MUI (`react` → `preact/compat`). This allows using Material-UI components in Preact.
- Path aliases: `@/*` → `src/*`, `@components/*` → `src/components/*`, etc. (see [tsconfig.json](../tsconfig.json)).

## Dev Workflows

- **Install**: `npm install && npm run build:tokens` (tokens required for first setup)
- **Dev server**: `npm run dev` (HMR on http://localhost:5173)
- **Build tokens**: `npm run build:tokens` (only when design tokens change)
  - Development mode: Always generates ALL brands (for theme switching)
  - Production mode: Generates only specified brand from BIGLIGHT_BRAND
  - Generated files: `build/css/` (gitignored), including `imports.css` with all brand imports
  - Auto-updates: `src/brand-config.js` (committed for IDE intellisense)
- **Production build**: `npm run build` → `dist/`
- **Preview build**: `npm run preview` (http://localhost:4173)
- **Storybook**: `npm run storybook` (port 6006) — all components have stories with theme switcher
- **Lint**: `npx eslint .` (no script, uses `eslint-config-preact`)

## Design System: Token & Theming Architecture

**Critical**: This system enables runtime theme switching, strong design encapsulation, and production optimization (tree-shake unused brand CSS).

### Token Flow

```
Figma Tokens (JSON)
  → Style Dictionary
    → Layered CSS Variables (brand-scoped)
      → Semantic Tailwind Utilities
        → Preact Components
```

**Golden Rule**: Components NEVER reference CSS variables directly. Only use semantic Tailwind utility classes.

### 4-Layer Token Model

| Layer                     | Scope                    | Purpose                    | Example                                         |
| ------------------------- | ------------------------ | -------------------------- | ----------------------------------------------- |
| **L0: Global Primitives** | `:root`                  | Shared foundational values | Grey scale, spacing, radii                      |
| **L1: Brand Primitives**  | `[data-theme="brand-x"]` | Brand-owned values         | Brand colors, fonts                             |
| **L2: Alias/Semantic**    | `[data-theme="brand-x"]` | Meaning, not usage         | `color-primary`, `color-text-default`           |
| **L3: Mapped**            | `[data-theme="brand-x"]` | Component-ready tokens     | `surface-action-primary`, `text-action-primary` |

### Token Build Process

1. **Source**: [tokens-custom/figma-tokens.json](../tokens-custom/figma-tokens.json) (Figma export)
2. **Run**: `npm run build:tokens`
3. **Output**: `build/css/` with layered files:
   ```
   primitives.css              → :root (L0)
   responsive.css              → :root
   brand-a.primitives.css      → [data-theme="brand-a"] (L1)
   brand-a.alias.css           → [data-theme="brand-a"] (L2)
   brand-a.mapped.css          → [data-theme="brand-a"] (L3)
   brand-b.primitives.css      → [data-theme="brand-b"] (L1)
   brand-b.alias.css           → [data-theme="brand-b"] (L2)
   brand-b.mapped.css          → [data-theme="brand-b"] (L3)
   ```

### Custom Transforms ([config.js](../config.js))

- `token-unwrapper`: Lifts nested brand tokens to root for reference resolution
- `name/clean-ids`: Strips category prefixes (Primitives, Mapped, etc.) from CSS var names
- `fixReferenceStrings`: Cleans `{Colour.Brand.X}` → `{brand.x}` for internal refs
- `size/pxUnit`: Adds `px` unit to numeric values (excludes colors/fonts)

### Layer Details

**L0: Global Primitives** (Shared, never changes at runtime)

- Neutral color scales, spacing scale, border radii
- Raw design values without semantic meaning

**L1: Brand Primitives** (Brand-specific foundational values)

- Brand primary colors, brand fonts
- DO NOT use directly in components

**L2: Alias/Semantic** (Describes meaning, not usage)

- Examples: `color-primary`, `color-text-default`, `color-border-default`
- Maps brand primitives to shared semantic vocabulary
- Same intent across brands, different values

**L3: Mapped** (Component-ready, answers "what color is X?")

- Examples: `surface-action-primary`, `surface-action-primary-hover`, `text-action-primary`
- Components depend on this conceptually but access via Tailwind utilities

### CSS Import Order (Critical)

Correct cascade order in [src/style.css](../src/style.css):

```css
@import "tailwindcss";
@import "./fonts.css";

/* L0: Global */
@import "../build/css/primitives.css";
@import "../build/css/responsive.css";

/* L1: Brand Primitives */
@import "../build/css/brand-a.primitives.css";
@import "../build/css/brand-b.primitives.css";

/* L2: Alias */
@import "../build/css/brand-a.alias.css";
@import "../build/css/brand-b.alias.css";

/* L3: Mapped */
@import "../build/css/brand-a.mapped.css";
@import "../build/css/brand-b.mapped.css";
```

### Adding a New Brand

1. Add to `brands` array in [config.js](../config.js): `const brands = ["BrandA", "BrandB", "BrandC"];`
2. Run `npm run build:tokens` — auto-generates 3 CSS files (primitives, alias, mapped)
3. Import new CSS files in [src/style.css](../src/style.css) following layer order
4. Update Storybook themes in [.storybook/preview.ts](../.storybook/preview.ts)

### Production Optimization

**Performance benefit**: Tree-shake unused brands in production builds. Only generate and import CSS for the target brand → 40% smaller bundles, faster loads.

#### Environment-Based Brand Selection

Brand selection is controlled via `.env` files using `BIGLIGHT_BRAND` and `NODE_ENV` variables:

**Development** (`.env`):

```bash
BIGLIGHT_BRAND=brand-a  # Ignored in dev mode
NODE_ENV=development
# In development: ALWAYS generates ALL brands (for Storybook theme switching)
```

**Production** (`.env.production.brand-a` or `.env.production.brand-b`):

```bash
BIGLIGHT_BRAND=brand-a  # Only generates Brand A CSS
NODE_ENV=production
# In production: Respects BIGLIGHT_BRAND value for optimized bundles
```

#### Build Process

The build process behavior depends on `NODE_ENV`:

**Development Mode (`NODE_ENV=development`)**:

- ALWAYS generates all brands (ignores BIGLIGHT_BRAND value)
- Enables theme switching in Storybook and development
- Run: `npm run build:tokens` (manual trigger when design tokens change)

**Production Mode (`NODE_ENV=production`)**:

- Respects BIGLIGHT_BRAND value
- Generates only the specified brand
- 40% smaller CSS bundles

Build steps:

1. **Validates** the brand exists in [config.js](../config.js)
2. **Shows confirmation** banner with build mode and target brand
3. **Generates required CSS**:
   - Development: All brands generated regardless of BIGLIGHT_BRAND
   - Production: Only specified brand generated

#### Production Build Workflows

**Option 1: Using env-cmd** (recommended for CI/CD):

```bash
# Brand A production build
npx env-cmd -f .env.production.brand-a npm run build

# Brand B production build
npx env-cmd -f .env.production.brand-b npm run build
```

**Option 2: Copy environment file**:

```bash
# Copy the production config for your target brand
cp .env.production.brand-a .env

# Run standard build
npm run build
```

**Option 3: Set environment inline**:

```bash
BIGLIGHT_BRAND=brand-a NODE_ENV=production npm run build
```

#### Scalability

This approach scales to any number of brands:

- Add new brand to [config.js](../config.js)
- Create `.env.production.brand-c` if needed
- Use same `npm run build` command with appropriate environment

No need to modify package.json scripts when adding brands.

#### Bundle Size Impact

- **Multi-brand** (development): ~50KB CSS (all brands)
- **Single-brand** (production): ~30KB CSS (40% reduction)
- Additional savings from unused font files

## Component Patterns

### MUI + Tailwind Hybrid Pattern

Components wrap MUI base components with Tailwind utilities using **semantic token classes** (L3 mapped layer accessed via Tailwind).

```tsx
// ✅ CORRECT: Use semantic Tailwind utilities (resolves to L3 mapped tokens)
<MuiButton className="bg-action-primary text-text-action-on-primary hover:bg-action-primary-hover">

// ❌ WRONG: Direct CSS variables break encapsulation
<MuiButton className="bg-[var(--surface-action-primary)]">

// ❌ WRONG: Direct color references break theming
<MuiButton className="bg-orange-500">

// ❌ WRONG: Brand-aware code couples component to specific brands
{brand === 'brand-a' ? 'bg-orange-500' : 'bg-red-500'}
```

**Principles**:

- Use semantic utilities for all visual styling
- Trust tokens for design decisions
- Components should NOT know which brand is active
- Components should NOT know actual color values

See [Button](../src/components/ui/button/index.tsx) for reference implementation.

### Required MUI Setup in Stories

ALL Storybook stories MUST include this decorator:

```tsx
decorators: [
  (Story) => (
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Story />
    </StyledEngineProvider>
  ),
];
```

This is already configured in [src/index.tsx](../src/index.tsx) for the app but required per-story in Storybook.

### Accessibility Utilities

Reusable helpers in [src/utils/accessibility](../src/utils/accessibility):

- `handleActivation`: Keyboard handler for Space/Enter on interactive elements
- `useKeyboardNav`: Hook for arrow key navigation in lists
- ARIA helpers exported from `aria.ts`

Example: [Button](../src/components/ui/button/index.tsx) uses `handleActivation` for keyboard support.

## Tailwind Configuration

[tailwind.config.js](../tailwind.config.js) extends default with **token-based scales**:

- **Spacing**: Maps to `--scale-*` vars (e.g., `p-12` → `var(--scale-300)`)
- **Font sizes**: Maps to `--font-size-*` + `--line-height-*` (responsive)
- **Colors**: Use semantic classes (`bg-action-primary`, `text-text-headings`) NOT raw tokens
- **Border radius**: Maps to `--border-radius-*`

Import path: `@config '../tailwind.config.js'` in [src/style.css](../src/style.css).

## Theme Switching

Runtime theme change pattern (see [Login page](../src/pages/login/index.tsx)):

```tsx
document.body.setAttribute("data-theme", "brand-a"); // or "brand-b"
```

All CSS vars update automatically via cascade layer specificity. No JS state needed beyond toggling attribute.

## Font Loading

Multi-brand fonts in [src/fonts.css](../src/fonts.css):

- Brand A: Inter (headings + body)
- Brand B: Open Sans (body) + mencken-std-head-narrow (headings)

Font families mapped via tokens: `var(--font-font-family-headings)`, `var(--font-font-family-paragraph)`.

## Token Change Workflow

When design tokens change:

1. Designer updates tokens in Figma
2. JSON is re-exported to [tokens-custom/figma-tokens.json](../tokens-custom/figma-tokens.json)
3. Run `npm run build:tokens` (regenerates CSS in `build/css/`)
   - Development mode: Generates ALL brands regardless of BIGLIGHT_BRAND
   - Production mode: Generates only the brand specified in BIGLIGHT_BRAND
4. Script automatically updates [src/style.css](../src/style.css) with correct imports
5. Script generates [src/brand-config.js](../src/brand-config.js) with DEFAULT_BRAND export
6. Mapped variables (L3) update
7. Semantic Tailwind utilities remain stable
8. **Components require NO changes** (encapsulation benefit)

This ensures a clean design-to-code workflow with minimal code churn.

### Build Scripts Architecture

**Token generation scripts** (root directory):

- [build-tokens.js](../build-tokens.js): Main token build script
  - Reads BIGLIGHT_BRAND and NODE_ENV from environment
  - In development: Always builds all brands (ignores BIGLIGHT_BRAND)
  - In production: Respects BIGLIGHT_BRAND value
  - Generates CSS files in `build/css/` using Style Dictionary
  - Calls generate-style-imports.js after completion

- [generate-style-imports.js](../generate-style-imports.js): Dynamic import generator
  - Creates `build/css/imports.css` with appropriate CSS imports
  - Creates [src/brand-config.js](../src/brand-config.js) for runtime defaults
  - Respects same dev/prod logic as build-tokens.js

- [config.js](../config.js): Style Dictionary configuration
  - Exports brands array and sanitizeBrandName helper
  - Defines custom transforms and parsers
  - Creates configs for primitives, responsive, and brand-specific builds

**Important**: `build/css/` is **gitignored** (generated CSS from tokens). [src/style.css](../src/style.css) imports `build/css/imports.css` which contains all brand-specific CSS imports. [src/brand-config.js](../src/brand-config.js) is auto-generated but committed to git for IDE intellisense.

## Common Gotchas

1. **Token collision warnings**: Expected during build when brand tokens override aliases (by design)
2. **Reference errors**: If token build fails, check `fixReferenceStrings` regex in [config.js](../config.js)
3. **MUI styles not scoped**: Missing `enableCssLayer` prop on `StyledEngineProvider`
4. **Theme not switching**: Forgot to import brand CSS files in [src/style.css](../src/style.css)
5. **Spacing values wrong**: Using raw numbers instead of Tailwind scale (use `p-12` not `p-3`)
6. **Arbitrary values in components**: Using `bg-[var(--...)]` breaks encapsulation — use semantic utilities
7. **Wrong CSS import order**: Mapped must come after alias, alias after primitives (see [src/style.css](../src/style.css)

## Conventions

- **Component exports**: Named function exports (e.g., `export default function Button()`)
- **File naming**: `index.tsx` for components, `ComponentName.stories.tsx` for stories
- **No arbitrary values**: Never use `bg-[var(--...)]` or `text-[#...]` — use semantic utilities
- **Brand agnostic**: Components never reference brand names or switch on brand identity
- **CSS layers order**: `@layer theme, base, mui, components, utilities` (MUST be consistent)
- **Accessibility**: Include skip links, ARIA labels, keyboard handlers (see [Login](../src/pages/login/index.tsx))
- **No inline styles**: Use Tailwind classes with semantic tokens only

## Common Gotchas

1. **Token collision warnings**: Expected during build when brand tokens override aliases (by design)
2. **Reference errors**: If token build fails, check `fixReferenceStrings` regex in [config.js](../config.js)
3. **MUI styles not scoped**: Missing `enableCssLayer` prop on `StyledEngineProvider`
4. **Theme not switching**: Forgot to import brand CSS files in [src/style.css](../src/style.css)
5. **Spacing values wrong**: Using raw numbers instead of Tailwind scale (use `p-12` not `p-3`)
