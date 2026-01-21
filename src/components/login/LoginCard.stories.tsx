import type { Meta, StoryObj } from "@storybook/preact";
import LoginCard from "./card";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const meta: Meta<typeof LoginCard> = {
  title: "Compositions/LoginCard",
  component: LoginCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Promotional card composition that combines Card, Typography, Button, and Icon components. Used to encourage user membership sign-up with a visual banner and call-to-action.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <div
          style={{
            minWidth: "320px",
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
          }}
        >
          <Story />
        </div>
      </StyledEngineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginCard>;

/**
 * Default LoginCard composition showing promotional membership card.
 * Demonstrates how multiple components work together in a real use case.
 */
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Complete promotional card with heading, button with icon, and decorative banner image. All components use semantic token classes for brand theming.",
      },
    },
  },
};
