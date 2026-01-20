import type { Meta, StoryObj } from "@storybook/preact";
import Card, { type CardProps } from "./index";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const meta = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <Story />
      </StyledEngineProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A simple card component with three variants (**elevated**, **outlined**, **flat**). Use it as a container for content. Built with Material-UI and styled with Tailwind CSS semantic tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["elevated", "outlined", "flat"],
      description: "Card style variant",
    },
    borderRadius: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Border radius size",
    },
    children: {
      description: "Card content",
      control: false,
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

// Elevated variant (default)
export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: (
      <div>
        <h3 class="text-lg font-semibold text-text-heading mb-2">
          Elevated Card
        </h3>
        <p class="text-text-body">
          This card uses the elevated variant with shadow for depth and
          emphasis.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with shadow elevation (default variant).",
      },
    },
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: (
      <div>
        <h3 class="text-lg font-semibold text-text-heading mb-2">
          Outlined Card
        </h3>
        <p class="text-text-body">
          This card uses the outlined variant with a border instead of shadow.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with border, no shadow.",
      },
    },
  },
};

// Flat variant
export const Flat: Story = {
  args: {
    variant: "flat",
    children: (
      <div>
        <h3 class="text-lg font-semibold text-text-heading mb-2">Flat Card</h3>
        <p class="text-text-body">
          This card uses the flat variant with no shadow or border.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Minimal card with no shadow or border.",
      },
    },
  },
};

// All variants comparison
export const AllVariants: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-6 max-w-200">
      <h2 class="text-xl font-semibold text-text-heading mb-4">
        Card Variants
      </h2>
      <div class="grid grid-cols-1 gap-6">
        <Card variant="elevated">
          <h3 class="text-lg font-semibold text-text-heading mb-2">Elevated</h3>
          <p class="text-text-body">Card with shadow for depth and emphasis.</p>
        </Card>

        <Card variant="outlined">
          <h3 class="text-lg font-semibold text-text-heading mb-2">Outlined</h3>
          <p class="text-text-body">Card with border instead of shadow.</p>
        </Card>

        <Card variant="flat">
          <h3 class="text-lg font-semibold text-text-heading mb-2">Flat</h3>
          <p class="text-text-body">Minimal card with no shadow or border.</p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of all three card variants side by side.",
      },
    },
  },
};

// Border radius variations
export const BorderRadius: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-6 max-w-200">
      <h2 class="text-xl font-semibold text-text-heading mb-4">
        Border Radius Options
      </h2>
      <div class="grid grid-cols-1 gap-6">
        <Card borderRadius="none">
          <h3 class="text-lg font-semibold text-text-heading mb-2">None</h3>
          <p class="text-text-body">
            Card with no border radius (square corners).
          </p>
        </Card>

        <Card borderRadius="sm">
          <h3 class="text-lg font-semibold text-text-heading mb-2">Small</h3>
          <p class="text-text-body">Card with small border radius.</p>
        </Card>

        <Card borderRadius="md">
          <h3 class="text-lg font-semibold text-text-heading mb-2">Medium</h3>
          <p class="text-text-body">Card with medium border radius.</p>
        </Card>

        <Card borderRadius="lg">
          <h3 class="text-lg font-semibold text-text-heading mb-2">Large</h3>
          <p class="text-text-body">Card with large border radius.</p>
        </Card>

        <Card borderRadius="2xl">
          <h3 class="text-lg font-semibold text-text-heading mb-2">
            2XL (Default)
          </h3>
          <p class="text-text-body">Card with extra large border radius.</p>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of different border radius options.",
      },
    },
  },
};
