import type { Meta, StoryObj } from "@storybook/preact";
import { InputField, InputFieldProps } from "./index";
import { useState } from "preact/hooks";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const meta = {
  title: "Components/InputField",
  component: InputField,
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
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when input is empty",
    },
    value: {
      control: "text",
      description: "Current value of the input (controlled)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    state: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Visual state of the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    showStateIcon: {
      control: "boolean",
      description: "Whether to show state icon (checkmark/close) at the end",
      defaultValue: true,
    },
  },
} satisfies Meta<InputFieldProps>;

export default meta;
type Story = StoryObj<InputFieldProps>;

// Default state
export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
  },
};

// With value (filled)
export const Filled: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    value: "user@example.com",
  },
};

// Error state
export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    value: "invalid-email",
    state: "error",
  },
};

// Success state
export const Success: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    value: "user@example.com",
    state: "success",
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    value: "user@example.com",
    disabled: true,
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "32px",
        width: "800px",
        padding: "20px",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Default State
        </h3>
        <InputField label="Email" placeholder="Enter your email" />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Filled
        </h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value="user@example.com"
        />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Error State
        </h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value="invalid-email"
          state="error"
        />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Success State
        </h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value="user@example.com"
          state="success"
        />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Disabled
        </h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value="user@example.com"
          disabled={true}
        />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Password Input
        </h3>
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Success (No Icon)
        </h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value="user@example.com"
          state="success"
          showStateIcon={false}
        />
      </div>

      <div>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-colour-headings)",
          }}
        >
          Error (No Icon)
        </h3>
        <InputField
          label="Email"
          placeholder="Enter your email"
          value="invalid-email"
          state="error"
          showStateIcon={false}
        />
      </div>
    </div>
  ),
};
