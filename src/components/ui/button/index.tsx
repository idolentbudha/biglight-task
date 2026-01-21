import { handleActivation } from "@/utils/accessibility";
import MuiButton from "@mui/material/Button";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md";
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  disabled?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  label = "Button label",
  startIcon,
  endIcon,
  onClick,
  type = "button",
}: ButtonProps) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition duration-300 ease-in-out   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  // Variant styles
  const variantStyles = {
    primary: disabled
      ? "bg-disabled-dark cursor-not-allowed text-text-action-disabled"
      : "bg-action-primary hover:bg-action-primary-hover  text-text-action-on-primary hover:text-text-inverse",
    secondary: disabled
      ? "bg-disabled-dark cursor-not-allowed text-text-action-disabled"
      : "bg-action-secondary hover:bg-action-secondary-hover  text-text-action-on-secondary hover:text-text-action-active",
    tertiary: disabled
      ? "bg-disabled-light border-2 border-border-disabled cursor-not-allowed text-text-action-disabled"
      : "bg-transparent hover:bg-border-primary  border-2 border-border-primary text-text-action-active hover:text-text-inverse",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-12 py-12 text-sm",
    md: "px-16 py-16 text-base",
  };

  // Keyboard accessibility: Handle Enter/Space activation
  const handleKeyDown =
    !disabled && onClick ? handleActivation(onClick) : undefined;

  return (
    <MuiButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} normal-case`}
      disableRipple
      startIcon={startIcon}
      endIcon={endIcon}
      variant="contained"
      tabIndex={disabled ? -1 : 0}
    >
      {label}
    </MuiButton>
  );
}
