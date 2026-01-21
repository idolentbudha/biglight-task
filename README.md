# Biglight Multi-Brand Design System

A production-ready, multi-brand component library built with **Vite + Preact** and **Style Dictionary v5**. Features runtime theme switching, WCAG 2.1 Level AA accessibility compliance, and production-optimized single-brand builds.

## ✨ Features

- 🎨 **Multi-Brand Theming** - Runtime theme switching between Brand A & Brand B
- ♿️ **Accessibility First** - WCAG 2.1 Level AA compliant with comprehensive keyboard navigation
- 📱 **Responsive Design** - Mobile-first with 3-breakpoint scaling (mobile/tablet/desktop)
- 🎭 **Component Library** - Button, Input Field, Dropdown, Card, Typography with Storybook
- 🏗️ **Token-Based** - 4-layer design token architecture from Figma to CSS
- ⚡️ **Performance** - Production builds tree-shake unused brands (40% reduction)
- 🧪 **Storybook** - Interactive documentation with live theme switching

## 🚀 Quick Start

```bash
# 1. Create environment file from example
cp .env.example .env

# 2. Install dependencies (auto-generates tokens via postinstall hook)
npm install

# 3. Start development server (http://localhost:5173)
npm run dev

# 4. View Storybook with theme switcher (http://localhost:6006)
npm run storybook
```

**Note**: `npm install` automatically runs `build:tokens`. If tokens are missing, manually run `npm run build:tokens`.

## 📋 Available Scripts

- `npm run dev` - Start Vite dev server with HMR (http://localhost:5173)
- `npm run build` - Production build (auto-generates tokens + bundles app)
- `npm run build:tokens` - Regenerate CSS from design tokens (manual trigger)
- `npm run preview` - Preview production build (http://localhost:4173)
- `npm run storybook` - Start Storybook with component docs (port 6006)
- `npm run build-storybook` - Build static Storybook for deployment
- `npx eslint .` - Lint JavaScript/TypeScript files

## 🎨 Design Token Workflow

### When Design Tokens Change

```bash
# 1. Designer exports updated tokens from Figma
# 2. Replace tokens-custom/figma-tokens.json with new export
# 3. Regenerate CSS variables
npm run build:tokens

# 4. Verify changes in development
npm run dev

# 5. Check components in Storybook
npm run storybook
```

**Important**:

- `build/css/` directory is **gitignored** (auto-generated, not source of truth)
- Source of truth: `tokens-custom/figma-tokens.json`
- `src/style.css` imports `build/css/imports.css` which loads all brand CSS
- `src/brand-config.js` is auto-generated but committed for IDE intellisense

### Token Architecture (4-Layer Model)

| Layer                     | Scope                    | Purpose                    | Example                                         |
| ------------------------- | ------------------------ | -------------------------- | ----------------------------------------------- |
| **L0: Global Primitives** | `:root`                  | Shared foundational values | Grey scale, spacing, radii                      |
| **L1: Brand Primitives**  | `[data-theme="brand-x"]` | Brand-owned values         | Brand colors, fonts                             |
| **L2: Alias/Semantic**    | `[data-theme="brand-x"]` | Meaning, not usage         | `color-primary`, `color-text-default`           |
| **L3: Mapped**            | `[data-theme="brand-x"]` | Component-ready tokens     | `surface-action-primary`, `text-action-primary` |

## 🏗 Architecture Overview

### Tech Stack

- **Frontend**: Vite 7.0.4 + Preact 10.26.9 + preact-iso (routing)
- **UI Components**: Material-UI 7.3.7 (base) + Tailwind CSS 4.1.18 (styling)
- **Design Tokens**: Style Dictionary 5.1.4 → CSS Variables
- **Documentation**: Storybook 10.1.11 with a11y addon
- **TypeScript**: 5.9.3 with strict Preact JSX config

### Component Architecture

```
MUI Base Components (functionality)
    ↓
Tailwind Semantic Utilities (styling via tokens)
    ↓
Preact Components (composition)
```

**Golden Rule**: Components never reference CSS variables directly. Only use semantic Tailwind utility classes (e.g., `bg-action-primary`, `text-text-heading`).

### Token Build Pipeline

The pipeline transforms Figma's nested structure into production-ready CSS through three main stages:

### 1. The Brand-Aware Parser (`token-unwrapper`)

Figma exports tokens inside deep wrappers like `Mapped/BrandA`. This parser "lifts" the tokens to the root level so Style Dictionary can resolve shorthand references like `{Colour.White}`.

### 2. The Reference Cleaner (`fixReferenceStrings`)

Strips prefixes like `Colour.`, `Brand.`, or `Alias.` from reference strings so they match our flattened data structure. Example: `{Colour.Brand.BrandA.Orange}` → `{brand-a.orange}`

### 3. The Name Transform (`name/clean-ids`)

Sanitizes CSS variable names by removing `↘︎` symbols, folder names (Primitives, Mapped, etc.), and converting to kebab-case.

**Result**: `Mapped/BrandA/Surface/↘︎ Label` → `--surface-label`

### File Structure

```
src/
  components/
    ui/
      button/          - Primary/Secondary/Tertiary variants
      card/            - Simple card component
      dropdown/        - Select with keyboard navigation
      inputfield/      - Text input with validation states
      typography/      - Responsive h1-h6, body text
    login/
      card.tsx         - Login banner card
  pages/
    login/
      index.tsx        - Full login page composition
  utils/
    accessibility/     - ARIA helpers, keyboard handlers
```

## 🎯 Multi-Brand Scaling

### Adding a New Brand

1. **Update Config**: Open `config.js` and add brand name:

   ```javascript
   const brands = ["BrandA", "BrandB", "BrandC"];
   ```

2. **Generate Tokens**: Run build command:

   ```bash
   npm run build:tokens
   ```

3. **Auto-Generated Files**: System creates 3 CSS files per brand:
   - `brand-c.primitives.css` - Brand colors, fonts (L1)
   - `brand-c.alias.css` - Semantic color names (L2)
   - `brand-c.mapped.css` - Component tokens (L3)

4. **Update Storybook** (optional): Add theme to `.storybook/preview.ts`:
   ```typescript
   decorators: [
     withThemeByDataAttribute({
       themes: {
         "Brand A": "brand-a",
         "Brand B": "brand-b",
         "Brand C": "brand-c", // Add new brand
       },
       defaultTheme: "brand-a",
       attributeName: "data-theme",
     }),
   ];
   ```

### Production Builds (Single-Brand Optimization)

**Development**: Generates ALL brands for theme switching

```bash
npm run dev  # Loads all brands (brand-a + brand-b CSS)
```

**Production**: Tree-shake unused brands (40% smaller bundle)

```bash
# Create .env file from example (first time only)
cp .env.example .env

# Option 1: Edit .env file manually
# Set BIGLIGHT_BRAND=brand-a and NODE_ENV=production
npm run build

# Option 2: Inline environment variable
BIGLIGHT_BRAND=brand-a NODE_ENV=production npm run build
```

**Result**: Only generates CSS for specified brand → 40% reduction in CSS bundle size.


## 🛠 Troubleshooting

### Missing CSS Variables

If components show unstyled:

1. Check `build/css/` directory exists and contains CSS files
2. Verify `build/css/imports.css` has correct import statements
3. Ensure `src/style.css` imports `build/css/imports.css`
4. Re-run `npm run build:tokens` to regenerate

### Theme Not Switching

If themes don't switch at runtime:

1. Verify `data-theme` attribute is set on `<body>` element
2. Check browser DevTools → Elements → `<body data-theme="brand-a">`
3. Ensure all brand CSS files are imported in `build/css/imports.css`
4. Clear browser cache and hard refresh (Cmd+Shift+R)

## 🤝 Contributing

### Component Development Workflow

1. **Create Component**: Add to `src/components/ui/[component-name]/index.tsx`
2. **Add Stories**: Create `[ComponentName].stories.tsx` with all variants
3. **Test Accessibility**: Check keyboard nav, ARIA attributes, color contrast
4. **Use Semantic Tokens**: Only use Tailwind classes, never arbitrary CSS vars
5. **Document**: Add JSDoc comments, story descriptions, and examples

### Design Token Updates

1. **Figma Export**: Designer exports `figma-tokens.json`
2. **Replace File**: Update `tokens-custom/figma-tokens.json`
3. **Build Tokens**: Run `npm run build:tokens`
4. **Git Commit**: Commit JSON file (not generated CSS in `build/css/`)
5. **Test**: Verify in Storybook with both themes

## 📦 Production Deployment

```bash
# 1. Create .env from example (first time setup)
cp .env.example .env

# 2. Edit .env file for your target brand
# Set: BIGLIGHT_BRAND=brand-a and NODE_ENV=production

# 3. Build for production
npm run build

# Alternative: Inline environment variables (no .env file needed)
BIGLIGHT_BRAND=brand-a NODE_ENV=production npm run build

# Output: dist/ directory with optimized bundle
# - Only includes Brand A CSS (~30KB instead of ~50KB)
# - Minified JS and CSS
# - Tree-shaken unused code

# Deploy dist/ to hosting provider (Vercel, Netlify, etc.)
```

## 🔧 Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

**For Development** (all brands for theme switching):

```bash
BIGLIGHT_BRAND=all
NODE_ENV=development
```

**For Production** (single brand, optimized):

```bash
# Brand A production
BIGLIGHT_BRAND=brand-a
NODE_ENV=production

# OR Brand B production
BIGLIGHT_BRAND=brand-b
NODE_ENV=production
```

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ using Vite, Preact, Material-UI, Tailwind CSS, and Style Dictionary.
