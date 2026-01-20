import { ComponentChildren } from "preact";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "small"
  | "caption";

export type TypographySize = "sm" | "md" | "lg";

export type TypographyColor =
  | "default"
  | "heading"
  | "body"
  | "passive"
  | "brand"
  | "inverse"
  | "error"
  | "success"
  | "warning";

export interface TypographyProps {
  variant?: TypographyVariant;
  size?: TypographySize;
  color?: TypographyColor;
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  className?: string;
  children: ComponentChildren;
  as?: string;
}

export default function Typography({
  variant = "body",
  size,
  color = "default",
  weight,
  align = "left",
  className = "",
  children,
  as,
}: TypographyProps) {
  // Determine the HTML tag to use
  const getTag = () => {
    if (as) return as;
    if (variant.startsWith("h")) return variant;
    if (variant === "small" || variant === "caption") return "span";
    return "p";
  };

  const Tag = getTag() as any;

  // Variant styles - Figma specs: Headings use Medium (500), 120% line-height; Body uses 140%
  const variantStyles = {
    h1: "font-heading text-heading-h1 font-medium leading-[120%]",
    h2: "font-heading text-heading-h2 font-medium leading-[120%]",
    h3: "font-heading text-heading-h3 font-medium leading-[120%]",
    h4: "font-heading text-heading-h4 font-medium leading-[120%]",
    h5: "font-heading text-heading-h5 font-medium leading-[120%]",
    h6: "font-heading text-heading-h6 font-medium leading-[120%]",
    body: "font-body leading-[140%]",
    small: "font-body leading-[140%]",
    caption: "font-body leading-[140%]",
  };

  // Size styles (only applicable to body, small, caption)
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  // Get size based on variant and size prop
  const getSize = () => {
    if (size) return sizeStyles[size];
    if (variant === "body") return "text-body-md";
    if (variant === "small") return "text-body-sm";
    if (variant === "caption") return "text-body-xs";
    return "";
  };

  // Color styles
  const colorStyles = {
    default: variant.startsWith("h") ? "text-text-heading" : "text-text-body",
    heading: "text-text-heading",
    body: "text-text-body",
    passive: "text-text-passive",
    brand: "text-text-brand",
    inverse: "text-text-inverse",
    error: "text-text-error",
    success: "text-text-success",
    warning: "text-text-warning",
  };

  // Weight styles
  const weightStyles = {
    light: "font-light",
    regular: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  // Alignment styles
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const classes = `
    ${variantStyles[variant]}
    ${getSize()}
    ${colorStyles[color]}
    ${weight ? weightStyles[weight] : ""}
    ${alignStyles[align]}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return <Tag className={classes}>{children}</Tag>;
}
