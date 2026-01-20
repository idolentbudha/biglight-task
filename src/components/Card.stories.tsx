import type { Meta, StoryObj } from "@storybook/preact";
import Card, { type CardProps } from "./Card";
import Button from "./ui/Button";
import { StyledEngineProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

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
          "A flexible card component with three variants (**elevated**, **outlined**, **flat**). Supports images, titles, subtitles, custom content, and action buttons. Built with Material-UI and styled with Tailwind CSS semantic tokens.",
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
    title: {
      control: "text",
      description: "Card title",
    },
    subtitle: {
      control: "text",
      description: "Card subtitle",
    },
    image: {
      control: "text",
      description: "URL of the card image",
    },
    imageAlt: {
      control: "text",
      description: "Alt text for the image",
    },
    imageHeight: {
      control: "number",
      description: "Height of the image in pixels",
    },
    children: {
      description: "Card content (body)",
      control: false,
    },
    actions: {
      description: "Action buttons or elements at the bottom of the card",
      control: false,
    },
    onClick: {
      description: "Click handler for the entire card",
      action: "clicked",
    },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

// Basic card with just content
export const Basic: Story = {
  args: {
    variant: "elevated",
    children: (
      <p>
        This is a basic card with some content. Cards are surfaces that display
        content and actions on a single topic.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic card with only content, no title or actions.",
      },
    },
  },
};

// Card with title and subtitle
export const WithTitleAndSubtitle: Story = {
  args: {
    variant: "elevated",
    title: "Card Title",
    subtitle: "Card subtitle goes here",
    children: (
      <p>
        This card includes a title and subtitle. Great for displaying structured
        information with a clear hierarchy.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with title, subtitle, and content.",
      },
    },
  },
};

// Card with image
export const WithImage: Story = {
  args: {
    variant: "elevated",
    image: "https://picsum.photos/400/200",
    imageAlt: "Random landscape",
    title: "Beautiful Landscape",
    subtitle: "Nature photography",
    children: (
      <p>
        This card features an image at the top. Perfect for showcasing visual
        content like photos, illustrations, or graphics.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with an image at the top.",
      },
    },
  },
};

// Card with actions
export const WithActions: Story = {
  args: {
    variant: "elevated",
    title: "Card with Actions",
    subtitle: "Click the buttons below",
    children: (
      <p>
        This card includes action buttons at the bottom. Use this pattern for
        cards that need user interaction.
      </p>
    ),
    actions: (
      <>
        <Button variant="primary" size="sm" label="Action 1" />
        <Button variant="tertiary" size="sm" label="Action 2" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with action buttons in the footer.",
      },
    },
  },
};

// Complete card with everything
export const Complete: Story = {
  args: {
    variant: "elevated",
    image: "https://picsum.photos/400/200?random=1",
    imageAlt: "Sample image",
    title: "Complete Card",
    subtitle: "With all features enabled",
    children: (
      <p>
        This is a complete card example with an image, title, subtitle, content,
        and action buttons. Use this as a template for feature-complete cards.
      </p>
    ),
    actions: (
      <>
        <Button variant="primary" size="sm" label="Learn More" />
        <Button variant="tertiary" size="sm" label="Share" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Complete card with all available features.",
      },
    },
  },
};

// Outlined variant
export const Outlined: Story = {
  args: {
    variant: "outlined",
    title: "Outlined Card",
    subtitle: "With border instead of shadow",
    children: (
      <p>
        This card uses the outlined variant with a border instead of elevation.
        Good for subtle emphasis or when you need a lighter visual weight.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with outlined variant (border, no shadow).",
      },
    },
  },
};

// Flat variant
export const Flat: Story = {
  args: {
    variant: "flat",
    title: "Flat Card",
    subtitle: "No elevation or border",
    children: (
      <p>
        This flat card has no shadow or border. Use this for minimal designs or
        when cards are nested within other containers.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with flat variant (no shadow or border).",
      },
    },
  },
};

// Clickable card
export const Clickable: Story = {
  args: {
    variant: "elevated",
    title: "Clickable Card",
    subtitle: "Click anywhere on this card",
    children: <p>This entire card is clickable and has a hover effect.</p>,
    onClick: () => alert("Card clicked!"),
  },
  parameters: {
    docs: {
      description: {
        story: "Card with onClick handler - entire card is interactive.",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div class="p-8 bg-surface-page rounded-lg space-y-8 max-w-[900px]">
      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Elevated Cards
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <Card variant="elevated" title="Card 1" subtitle="Elevated variant">
            <p class="text-sm">Card with shadow effect for depth.</p>
          </Card>
          <Card
            variant="elevated"
            title="Card 2"
            subtitle="With image"
            image="https://picsum.photos/300/150?random=2"
          >
            <p class="text-sm">Card featuring an image.</p>
          </Card>
          <Card
            variant="elevated"
            title="Card 3"
            subtitle="With actions"
            actions={<Button variant="primary" size="sm" label="Action" />}
          >
            <p class="text-sm">Card with action button.</p>
          </Card>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Outlined Cards
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <Card variant="outlined" title="Card 1" subtitle="Outlined variant">
            <p class="text-sm">Card with border instead of shadow.</p>
          </Card>
          <Card
            variant="outlined"
            title="Card 2"
            subtitle="With image"
            image="https://picsum.photos/300/150?random=3"
          >
            <p class="text-sm">Outlined card with image.</p>
          </Card>
          <Card
            variant="outlined"
            title="Card 3"
            subtitle="With actions"
            actions={<Button variant="secondary" size="sm" label="Action" />}
          >
            <p class="text-sm">Outlined card with action.</p>
          </Card>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-base font-semibold text-text-heading">
          Flat Cards
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <Card variant="flat" title="Card 1" subtitle="Flat variant">
            <p class="text-sm">Minimal card with no shadow or border.</p>
          </Card>
          <Card
            variant="flat"
            title="Card 2"
            subtitle="With image"
            image="https://picsum.photos/300/150?random=4"
          >
            <p class="text-sm">Flat card with image.</p>
          </Card>
          <Card
            variant="flat"
            title="Card 3"
            subtitle="With actions"
            actions={<Button variant="tertiary" size="sm" label="Action" />}
          >
            <p class="text-sm">Flat card with action.</p>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive showcase of all card variants and features.",
      },
    },
  },
};
