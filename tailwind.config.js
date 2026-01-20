/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      // Spacing scale from design tokens
      spacing: {
        0: "0px",
        0.5: "var(--scale-0-2)",
        1: "var(--scale-25)",
        1.5: "var(--scale-25-2)",
        2: "var(--scale-50)",
        3: "var(--scale-100)",
        4: "var(--scale-100)",
        6: "var(--scale-300)",
        8: "var(--scale-200)",
        10: "var(--scale-400)",
        12: "var(--scale-300)",
        16: "var(--scale-400)",
        20: "var(--scale-500)",
        24: "var(--scale-600)",
        28: "var(--scale-700)",
        32: "var(--scale-800)",
        36: "var(--scale-900)",
        40: "var(--scale-1000)",
        44: "var(--scale-1100)",
        48: "var(--scale-1200)",
        52: "var(--scale-1300)",
        56: "var(--scale-1400)",
        60: "var(--scale-1500)",
        64: "var(--scale-1600)",
        72: "var(--scale-1800)",
        80: "var(--scale-2000)",
        96: "var(--scale-2400)",
      },

      // Font sizes from responsive tokens
      fontSize: {
        xs: [
          "var(--font-size-body-xs)",
          { lineHeight: "var(--line-height-body-xs)" },
        ],
        sm: [
          "var(--font-size-body-sm)",
          { lineHeight: "var(--line-height-body-sm)" },
        ],
        base: [
          "var(--font-size-body-md)",
          { lineHeight: "var(--line-height-body-md)" },
        ],
        lg: [
          "var(--font-size-body-lg)",
          { lineHeight: "var(--line-height-body-lg)" },
        ],
        xl: [
          "var(--font-size-heading-h7)",
          { lineHeight: "var(--line-height-heading-h7)" },
        ],
        "2xl": [
          "var(--font-size-heading-h6)",
          { lineHeight: "var(--line-height-heading-h6)" },
        ],
        "3xl": [
          "var(--font-size-heading-h5)",
          { lineHeight: "var(--line-height-heading-h5)" },
        ],
        "4xl": [
          "var(--font-size-heading-h4)",
          { lineHeight: "var(--line-height-heading-h4)" },
        ],
        "5xl": [
          "var(--font-size-heading-h3)",
          { lineHeight: "var(--line-height-heading-h3)" },
        ],
        "6xl": [
          "var(--font-size-heading-h2)",
          { lineHeight: "var(--line-height-heading-h2)" },
        ],
        "7xl": [
          "var(--font-size-heading-h1)",
          { lineHeight: "var(--line-height-heading-h1)" },
        ],
      },

      // Font families from mapped tokens
      fontFamily: {
        heading: "var(--font-font-family-headings)",
        body: "var(--font-font-family-paragraph)",
        sans: "var(--font-font-family-paragraph)",
      },

      // Border radius from mapped tokens
      borderRadius: {
        none: "var(--border-radius-none)",
        sm: "var(--border-radius-sm)",
        DEFAULT: "var(--border-radius-md)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
        "2xl": "var(--border-radius-xxl)",
        full: "var(--border-radius-round)",
      },

      // Border widths from mapped tokens
      borderWidth: {
        DEFAULT: "var(--border-width-sm)",
        0: "0px",
        2: "var(--border-width-md)",
        4: "var(--border-width-lg)",
        8: "var(--border-width-xl)",
      },

      colors: {
        // Surface/Background colors
        page: "var(--surface-colour-page)",
        primary: "var(--surface-colour-brand-primary)",
        secondary: "var(--surface-colour-secondary)",
        accent: "var(--surface-colour-accent)",

        // Action/Interactive colors
        "action-primary": "var(--surface-colour-action-primary)",
        "action-primary-hover": "var(--surface-colour-action-hover-primary)",
        "action-secondary": "var(--surface-colour-action-secondary)",
        "action-secondary-hover":
          "var(--surface-colour-action-hover-secondary)",
        "action-inverse": "var(--surface-colour-action-inverse)",
        "action-selected": "var(--surface-colour-action-selected)",

        // State colors
        error: "var(--surface-colour-error)",
        warning: "var(--surface-colour-warning)",
        success: "var(--surface-colour-positive-light)",
        info: "var(--surface-colour-highlight)",

        // Text colors
        "text-heading": "var(--text-colour-headings)",
        "text-body": "var(--text-colour-body)",
        "text-error": "var(--text-colour-error)",
        "text-success": "var(--text-colour-success)",
        "text-inverse": "var(--text-colour-inverse)",
        "text-brand": "var(--text-colour-brand)",

        // Text color action
        "text-action-active": "var(--text-colour-action-active)",
        "text-action-inverse": "var(--text-colour-action-inverse)",
        "text-action-selected": "var(--text-colour-action-selected)",
        "text-action-disabled": "var(--text-colour-action-disabled)",
        "text-action-on-primary": "var(--text-colour-action-onprimary)",
        "text-action-on-secondary": "var(--text-colour-action-onsecondary)",
        "text-action-on-tertiary": "var(--text-colour-action-ontertiary)",

        // Border colors
        "border-primary": "var(--border-colour-primary)",
        "border-secondary": "var(--border-colour-secondary)",
        "border-error": "var(--border-colour-error)",
        "border-selected": "var(--border-colour-selected)",
        "border-disabled": "var(--border-colour-disabled)",

        // Disabled colors
        "disabled-dark": "var(--surface-colour-disabled-dark)",
        "disabled-light": "var(--surface-colour-disabled-light)",
        "text-disabled": "var(--text-colour-disabled)",

        // Icon colors
        "icon-primary": "var(--icon-colour-primary)",
        "icon-action-active": "var(--icon-colour-action-active)",
        "icon-action-selected": "var(--icon-colour-action-selected)",
        "icon-action-inverse": "var(--icon-colour-action-inverse)",
        "icon-action-disabled": "var(--icon-colour-action-disabled)",
        "icon-action-highlight": "var(--icon-colour-action-highlight)",
        "icon-action-on-primary": "var(--icon-colour-action-onprimary)",
        "icon-action-on-secondary": "var(--icon-colour-action-onsecondary)",
        "icon-action-on-tertiary": "var(--icon-colour-action-ontertiary)",
        "icon-positive": "var(--icon-colour-positive)",
        "icon-error": "var(--icon-colour-error)",
        "icon-warning": "var(--icon-colour-warning)",
        "icon-information": "var(--icon-colour-information)",
      },
    },
  },
  plugins: [],
};
