import type { Meta, StoryObj } from "@storybook/preact";
import { Login } from "./index";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const meta: Meta<typeof Login> = {
  title: "Pages/Login",
  component: Login,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Complete login page composition featuring all UI components: Typography, Dropdown, InputField, Buttons, and LoginCard. Demonstrates full-page layout with accessibility features including skip links and keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <Story />
      </StyledEngineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Login>;

/**
 * Default login page with all interactive elements.
 * Full composition showing email-based authentication flow.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Complete login page experience with heading, form fields, CTAs, and promotional card. Uses semantic token classes for consistent brand theming.",
      },
    },
  },
};
