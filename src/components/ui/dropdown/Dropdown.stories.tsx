import type { Meta, StoryObj } from "@storybook/preact";
import { Dropdown, DropdownProps } from "../../Dropdown";
import { useState } from "preact/hooks";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const sampleOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
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
          "A dropdown/select component with 5 distinct visual states: **Default** (no selection), **Focus** (clicked/active), **Selected** (value chosen), **Disabled** (not interactive), and **Opened** (menu visible). Built with Material-UI and styled with Tailwind CSS semantic tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the dropdown",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when no option is selected",
    },
    value: {
      control: "text",
      description: "Current value of the dropdown (controlled)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the dropdown is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the dropdown is required",
    },
    options: {
      control: "object",
      description: "Array of options with value and label",
    },
  },
} satisfies Meta<DropdownProps>;

export default meta;
type Story = StoryObj<DropdownProps>;

// Default state (no selection, not focused, not disabled)
export const Default: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    options: countryOptions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default state with no value selected. Shows gray border and placeholder text.",
      },
    },
  },
};

// Selected state (has a value selected)
export const Selected: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    value: "us",
    options: countryOptions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Selected state with a value chosen. Displays the selected option with black border.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    value: "ca",
    disabled: true,
    options: countryOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled state - non-interactive with grayed out appearance.",
      },
    },
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {
    placeholder: "Choose an option...",
    options: sampleOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Dropdown without a label, showing only the placeholder text.",
      },
    },
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country",
    required: true,
    options: countryOptions,
  },
  parameters: {
    docs: {
      description: {
        story: "Required field with asterisk indicator in helper text.",
      },
    },
  },
};

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>("");

    const handleChange = (newValue: string | number) => {
      setValue(newValue);
    };

    return (
      <div class="p-8 max-w-md bg-surface-secondary rounded-lg">
        <Dropdown
          label="Select your country"
          placeholder="Choose a country..."
          value={value}
          options={countryOptions}
          onChange={handleChange}
          required={true}
        />
        <div class="mt-6 p-4 bg-surface-page rounded border border-border-passive">
          <p class="text-sm text-text-body mb-2">
            Selected value:{" "}
            <span class="font-semibold text-text-brand">{value || "None"}</span>
          </p>
          <p class="mt-4 text-xs font-semibold text-text-heading">
            Component States:
          </p>
          <ul class="mt-2 text-xs text-text-passive space-y-1">
            <li>
              • <strong>Default:</strong> No value, gray border
            </li>
            <li>
              • <strong>Focus:</strong> Click to see blue border (3px)
            </li>
            <li>
              • <strong>Opened:</strong> Menu open, icon rotates 180°
            </li>
            <li>
              • <strong>Selected:</strong> Value chosen, black border
            </li>
            <li>
              • <strong>Disabled:</strong> See Disabled story
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example demonstrating all 5 states. Try clicking and selecting values to see the state transitions.",
      },
    },
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div class="grid grid-cols-2 gap-8 w-[900px] p-8 bg-surface-page rounded-lg">
      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          1. Default State
        </h3>
        <p class="mb-2 text-xs text-text-passive">
          No value selected, not focused
        </p>
        <br />
        <Dropdown
          label="Country"
          placeholder="Select a country"
          options={countryOptions}
        />
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          2. Focus State
        </h3>
        <p class="mb-2 text-xs text-text-passive">
          Click dropdown to see focus state (blue border)
        </p>
        <br />
        <Dropdown
          label="Country"
          placeholder="Select a country"
          options={countryOptions}
        />
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          3. Selected State
        </h3>
        <p class="mb-2 text-xs text-text-passive">
          Value selected (black border)
        </p>
        <br />
        <Dropdown
          label="Country"
          placeholder="Select a country"
          value="us"
          options={countryOptions}
        />
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          4. Disabled State
        </h3>
        <p class="mb-2 text-xs text-text-passive">
          Cannot interact, grayed out
        </p>
        <br />
        <Dropdown
          label="Country"
          placeholder="Select a country"
          value="ca"
          disabled={true}
          options={countryOptions}
        />
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          5. Opened State
        </h3>
        <p class="mb-2 text-xs text-text-passive">
          Click any dropdown to see opened state (rotated icon, blue border)
        </p>
        <br />
        <Dropdown
          label="Country"
          placeholder="Select a country"
          options={countryOptions}
        />
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Required Field
        </h3>
        <p class="mb-2 text-xs text-text-passive">Shows required indicator</p>
        <br />
        <Dropdown
          label="Country"
          placeholder="Select a country"
          required={true}
          options={countryOptions}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive showcase of all dropdown states and variations. Each example demonstrates a specific state or configuration.",
      },
    },
  },
};
