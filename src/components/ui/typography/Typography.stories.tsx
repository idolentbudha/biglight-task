import type { Meta, StoryObj } from "@storybook/preact";
import Typography, { type TypographyProps } from ".";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

const meta = {
  title: "Components/Typography",
  component: Typography,
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
          "A flexible, responsive typography component with consistent text styling across the application. All headings scale across 3 breakpoints: mobile (default) → tablet (md: 768px+) → desktop (lg: 1024px+). Body text scales from mobile to desktop. Supports multiple variants (h1-h6, body, small, caption), sizes, colors, weights, and alignment options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body", "small", "caption"],
      description: "Typography variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Text size (applies to body, small, caption)",
    },
    color: {
      control: { type: "select" },
      options: [
        "default",
        "heading",
        "body",
        "passive",
        "brand",
        "inverse",
        "error",
        "success",
        "warning",
      ],
      description: "Text color",
    },
    weight: {
      control: { type: "select" },
      options: ["light", "regular", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "Text alignment",
    },
    as: {
      control: "text",
      description: "Override the HTML tag (e.g., 'span', 'div')",
    },
  },
} satisfies Meta<TypographyProps>;

export default meta;
type Story = StoryObj<TypographyProps>;

// Heading variants
export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "H1 heading - largest heading size. Scales from text-3xl (mobile) → text-5xl (tablet) → text-7xl (desktop).",
      },
    },
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
  parameters: {
    docs: {
      description: {
        story:
          "H2 heading - second level heading. Scales from text-2xl (mobile) → text-4xl (tablet) → text-6xl (desktop).",
      },
    },
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
  parameters: {
    docs: {
      description: {
        story:
          "H3 heading - third level heading. Scales from text-xl (mobile) → text-3xl (tablet) → text-5xl (desktop).",
      },
    },
  },
};

// Body text
export const Body: Story = {
  args: {
    variant: "body",
    children: "This is body text using the default medium size.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Body text with default styling. Scales from text-sm (mobile) → text-base (desktop).",
      },
    },
  },
};

export const BodyLarge: Story = {
  args: {
    variant: "body",
    size: "lg",
    children: "This is large body text for emphasis or readability.",
  },
  parameters: {
    docs: {
      description: {
        story: "Large body text variant.",
      },
    },
  },
};

export const BodySmall: Story = {
  args: {
    variant: "body",
    size: "sm",
    children: "This is small body text for less important information.",
  },
  parameters: {
    docs: {
      description: {
        story: "Small body text variant.",
      },
    },
  },
};

// Small and caption
export const Small: Story = {
  args: {
    variant: "small",
    children: "Small text for secondary information.",
  },
  parameters: {
    docs: {
      description: {
        story: "Small text variant.",
      },
    },
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Caption text for image captions or annotations.",
  },
  parameters: {
    docs: {
      description: {
        story: "Caption text - smallest text variant.",
      },
    },
  },
};

// Color variants
export const BrandColor: Story = {
  args: {
    variant: "h2",
    color: "brand",
    children: "Text in brand color",
  },
  parameters: {
    docs: {
      description: {
        story: "Text using the brand color.",
      },
    },
  },
};

export const ErrorColor: Story = {
  args: {
    variant: "body",
    color: "error",
    children: "This is an error message",
  },
  parameters: {
    docs: {
      description: {
        story: "Text in error color for error messages.",
      },
    },
  },
};

export const SuccessColor: Story = {
  args: {
    variant: "body",
    color: "success",
    children: "This is a success message",
  },
  parameters: {
    docs: {
      description: {
        story: "Text in success color for success messages.",
      },
    },
  },
};

// Weight variants
export const BoldText: Story = {
  args: {
    variant: "body",
    weight: "bold",
    children: "Bold text for emphasis",
  },
  parameters: {
    docs: {
      description: {
        story: "Bold font weight.",
      },
    },
  },
};

export const LightText: Story = {
  args: {
    variant: "body",
    weight: "light",
    children: "Light text for subtle content",
  },
  parameters: {
    docs: {
      description: {
        story: "Light font weight.",
      },
    },
  },
};

// Alignment
export const CenterAligned: Story = {
  args: {
    variant: "h3",
    align: "center",
    children: "Center aligned text",
    className: "w-full",
  },
  parameters: {
    docs: {
      description: {
        story: "Center-aligned text.",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-12 max-w-[800px]">
      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Heading Variants (Responsive)
        </h3>
        <p class="mb-4 text-sm text-text-passive">
          Headings scale from mobile → tablet (md:) → desktop (lg:). Resize
          browser to see responsive behavior.
        </p>
        <div class="space-y-4">
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Body Text Sizes (Responsive)
        </h3>
        <p class="mb-4 text-sm text-text-passive">
          Body text scales on mobile (sm) → desktop (md:). Resize to see.
        </p>
        <div class="space-y-2">
          <Typography variant="body" size="lg">
            Large body text - Used for emphasis or improved readability
          </Typography>
          <Typography variant="body" size="md">
            Medium body text - Default size for most content
          </Typography>
          <Typography variant="body" size="sm">
            Small body text - Used for less important information
          </Typography>
          <Typography variant="small">
            Small variant - For secondary information
          </Typography>
          <Typography variant="caption">
            Caption variant - Smallest text for annotations
          </Typography>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Color Variants
        </h3>
        <div class="space-y-2">
          <Typography variant="body" color="heading">
            Heading color - For important text
          </Typography>
          <Typography variant="body" color="body">
            Body color - Default text color
          </Typography>
          <Typography variant="body" color="passive">
            Passive color - For secondary information
          </Typography>
          <Typography variant="body" color="brand">
            Brand color - For branded elements
          </Typography>
          <Typography variant="body" color="error">
            Error color - For error messages
          </Typography>
          <Typography variant="body" color="success">
            Success color - For success messages
          </Typography>
          <Typography variant="body" color="warning">
            Warning color - For warning messages
          </Typography>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Font Weights
        </h3>
        <div class="space-y-2">
          <Typography variant="body" weight="light">
            Light weight - 300
          </Typography>
          <Typography variant="body" weight="regular">
            Regular weight - 400
          </Typography>
          <Typography variant="body" weight="medium">
            Medium weight - 500
          </Typography>
          <Typography variant="body" weight="semibold">
            Semibold weight - 600
          </Typography>
          <Typography variant="body" weight="bold">
            Bold weight - 700
          </Typography>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Text Alignment
        </h3>
        <div class="space-y-2 border border-border-passive rounded p-4">
          <Typography variant="body" align="left" className="w-full">
            Left aligned text
          </Typography>
          <Typography variant="body" align="center" className="w-full">
            Center aligned text
          </Typography>
          <Typography variant="body" align="right" className="w-full">
            Right aligned text
          </Typography>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive showcase of all typography variants, sizes, colors, weights, and alignments. Headings have 3-breakpoint responsive scaling (mobile/tablet/desktop) and body text scales from mobile to desktop.",
      },
    },
  },
};

// Responsive showcase
export const ResponsiveScale: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-8 max-w-[1200px]">
      <div>
        <Typography variant="h3" className="mb-4">
          Responsive Typography Scale
        </Typography>
        <Typography variant="body" color="passive" className="mb-6">
          Resize your browser window to see how typography scales across
          breakpoints: mobile (default) → tablet (md: 768px+) → desktop (lg:
          1024px+)
        </Typography>
      </div>

      <div class="grid grid-cols-1 gap-8">
        <div class="border border-border-passive rounded-lg p-6">
          <Typography variant="h1" className="mb-2">
            Heading 1 Responsive
          </Typography>
          <Typography variant="small" color="passive">
            Mobile: 3xl (30px) | Tablet (md:): 5xl (48px) | Desktop (lg:): 7xl
            (72px)
          </Typography>
        </div>

        <div class="border border-border-passive rounded-lg p-6">
          <Typography variant="h2" className="mb-2">
            Heading 2 Responsive
          </Typography>
          <Typography variant="small" color="passive">
            Mobile: 2xl (24px) | Tablet (md:): 4xl (36px) | Desktop (lg:): 6xl
            (60px)
          </Typography>
        </div>

        <div class="border border-border-passive rounded-lg p-6">
          <Typography variant="h3" className="mb-2">
            Heading 3 Responsive
          </Typography>
          <Typography variant="small" color="passive">
            Mobile: xl (20px) | Tablet (md:): 3xl (30px) | Desktop (lg:): 5xl
            (48px)
          </Typography>
        </div>

        <div class="border border-border-passive rounded-lg p-6">
          <Typography variant="body" className="mb-2">
            Body text is also responsive, scaling from small on mobile to base
            size on desktop for better readability across devices.
          </Typography>
          <Typography variant="small" color="passive">
            Mobile: sm (14px) | Desktop (md:): base (16px)
          </Typography>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Interactive demonstration of responsive typography scaling. All headings scale across 3 breakpoints (mobile/tablet/desktop) and body text scales from mobile to desktop. Resize browser to see live changes.",
      },
    },
  },
};
