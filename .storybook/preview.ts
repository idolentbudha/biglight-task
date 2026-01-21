import type { Preview } from "@storybook/preact-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../src/style.css";

// Set default theme on body element when Storybook loads
if (typeof window !== "undefined") {
  document.body.setAttribute("data-theme", "brand-a");
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      "Brand A": "brand-a",
      "Brand B": "brand-b",
    },
    defaultTheme: "brand-a",
    attributeName: "data-theme",
  }),
];

export default preview;
