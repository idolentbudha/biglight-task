import { ComponentChildren } from "preact";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface CardProps {
  children?: ComponentChildren;
  className?: string;
  variant?: "elevated" | "outlined" | "flat";
  borderRadius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Card({
  children,
  className = "",
  variant = "elevated",
  borderRadius = "2xl",
}: CardProps) {
  // Determine card styling based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "border-2 border-border-primary shadow-none";
      case "flat":
        return "shadow-none";
      case "elevated":
      default:
        return "shadow-md hover:shadow-lg";
    }
  };

  // Determine border radius class
  const getBorderRadiusClass = () => {
    switch (borderRadius) {
      case "none":
        return "rounded-none";
      case "xs":
        return "rounded-xs";
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-md";
      case "lg":
        return "rounded-lg";
      case "xl":
        return "rounded-xl";
      case "2xl":
      default:
        return "rounded-2xl";
    }
  };

  const cardClasses = `${getBorderRadiusClass()} overflow-hidden bg-surface-secondary transition-shadow duration-200 ${getVariantClasses()} ${className}`;

  return (
    <MuiCard className={cardClasses}>
      <CardContent className="p-6">
        {children && <div className="text-text-body">{children}</div>}
      </CardContent>
    </MuiCard>
  );
}
