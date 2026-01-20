import type { Meta, StoryObj } from "@storybook/preact";
import Button, { type ButtonProps } from "./Button";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

const meta = {
  title: "Components/Button",
  component: Button,
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
          "A versatile button component with three variants (**Primary**, **Secondary**, **Tertiary**), two sizes (**sm**, **md**), and disabled state support. Built with Material-UI and styled with Tailwind CSS semantic tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
      description: "Button style variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
      description: "Button size (sm: small, md: medium)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    label: {
      control: "text",
      description: "Text displayed on the button",
    },
    startIcon: {
      description: "Icon displayed at the start (left) of the button",
      control: false,
    },
    endIcon: {
      description: "Icon displayed at the end (right) of the button",
      control: false,
    },
    onClick: {
      description: "Click event handler",
      action: "clicked",
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// Primary Variants
export const Primary: Story = {
  args: {
    variant: "tertiary",
    size: "sm",
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary button variant with medium size. Used for main actions.",
      },
    },
  },
};

export const PrimarySmall: Story = {
  args: {
    variant: "primary",
    size: "sm",
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story: "Primary button in small size.",
      },
    },
  },
};

export const PrimaryDisabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary button in disabled state. Non-interactive with grayed appearance.",
      },
    },
  },
};

// Secondary Variants
export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Secondary button variant with medium size. Used for secondary actions.",
      },
    },
  },
};

export const SecondarySmall: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary button in small size.",
      },
    },
  },
};

export const SecondaryDisabled: Story = {
  args: {
    variant: "secondary",
    size: "md",
    disabled: true,
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary button in disabled state.",
      },
    },
  },
};

// Tertiary Variants
export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    size: "md",
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tertiary button variant with border and transparent background. Used for tertiary actions.",
      },
    },
  },
};

export const TertiarySmall: Story = {
  args: {
    variant: "tertiary",
    size: "sm",
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story: "Tertiary button in small size.",
      },
    },
  },
};

export const TertiaryDisabled: Story = {
  args: {
    variant: "tertiary",
    size: "md",
    disabled: true,
    label: "Button Label",
  },
  parameters: {
    docs: {
      description: {
        story: "Tertiary button in disabled state.",
      },
    },
  },
};

// Buttons with Icons
export const WithStartIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    label: "Previous",
    startIcon: <ChevronLeftIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: "Button with a start icon (left side).",
      },
    },
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: "primary",
    size: "md",
    label: "Next",
    endIcon: <ChevronRightIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: "Button with an end icon (right side).",
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: "primary",
    size: "md",
    label: "Button",
    startIcon: <ChevronLeftIcon />,
    endIcon: <ChevronRightIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: "Button with both start and end icons.",
      },
    },
  },
};

// Icon Showcase
export const IconShowcase: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-8 min-w-[700px]">
      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Buttons with Start Icons
        </h3>
        <div class="flex gap-4 items-center flex-wrap">
          <Button
            variant="primary"
            size="md"
            label="Add"
            startIcon={<AddIcon />}
          />
          <Button
            variant="secondary"
            size="md"
            label="Save"
            startIcon={<SaveIcon />}
          />
          <Button
            variant="tertiary"
            size="md"
            label="Delete"
            startIcon={<DeleteIcon />}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Buttons with End Icons
        </h3>
        <div class="flex gap-4 items-center flex-wrap">
          <Button
            variant="primary"
            size="md"
            label="Next"
            endIcon={<ChevronRightIcon />}
          />
          <Button
            variant="secondary"
            size="md"
            label="Send"
            endIcon={<SendIcon />}
          />
          <Button
            variant="tertiary"
            size="md"
            label="Forward"
            endIcon={<ChevronRightIcon />}
          />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Small Buttons with Icons
        </h3>
        <div class="flex gap-4 items-center flex-wrap">
          <Button
            variant="primary"
            size="sm"
            label="Add"
            startIcon={<AddIcon />}
          />
          <Button
            variant="primary"
            size="sm"
            label="Next"
            endIcon={<ChevronRightIcon />}
          />
          <Button
            variant="secondary"
            size="sm"
            label="Previous"
            startIcon={<ChevronLeftIcon />}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of buttons with various icon configurations.",
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-8 min-w-[700px]">
      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Medium Size Buttons
        </h3>
        <div class="flex gap-4 items-center">
          <Button variant="primary" size="md" label="Primary" />
          <Button variant="secondary" size="md" label="Secondary" />
          <Button variant="tertiary" size="md" label="Tertiary" />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Small Size Buttons
        </h3>
        <div class="flex gap-4 items-center">
          <Button variant="primary" size="sm" label="Primary" />
          <Button variant="secondary" size="sm" label="Secondary" />
          <Button variant="tertiary" size="sm" label="Tertiary" />
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Disabled State
        </h3>
        <div class="flex gap-4 items-center">
          <Button variant="primary" size="md" disabled label="Primary" />
          <Button variant="secondary" size="md" disabled label="Secondary" />
          <Button variant="tertiary" size="md" disabled label="Tertiary" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive showcase of all button variants, sizes, and states.",
      },
    },
  },
};
