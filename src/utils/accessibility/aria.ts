/**
 * ARIA attribute helpers for consistent accessibility
 * Generates proper ARIA attributes based on component state
 */

export interface AriaFormFieldProps {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  errorMessage?: string;
}

/**
 * Generate ARIA attributes for form fields
 */
export const getAriaFormFieldProps = ({
  id,
  label,
  required = false,
  disabled = false,
  invalid = false,
  describedBy,
  errorMessage,
}: AriaFormFieldProps) => {
  const ariaDescribedBy = [
    describedBy,
    invalid && errorMessage ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    id,
    "aria-label": label,
    "aria-required": required ? "true" : undefined,
    "aria-disabled": disabled ? "true" : undefined,
    "aria-invalid": invalid ? "true" : undefined,
    "aria-describedby": ariaDescribedBy || undefined,
  };
};

/**
 * Generate ARIA attributes for dropdown/select
 */
export interface AriaDropdownProps {
  id: string;
  label?: string;
  expanded: boolean;
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
}

export const getAriaDropdownProps = ({
  id,
  label,
  expanded,
  required = false,
  disabled = false,
  invalid = false,
  describedBy,
}: AriaDropdownProps) => {
  return {
    ...getAriaFormFieldProps({
      id,
      label,
      required,
      disabled,
      invalid,
      describedBy,
    }),
    "aria-expanded": expanded ? "true" : "false",
    "aria-haspopup": "listbox" as const,
    role: "combobox" as const,
  };
};

/**
 * Generate ARIA attributes for buttons
 */
export interface AriaButtonProps {
  label: string;
  disabled?: boolean;
  pressed?: boolean;
  expanded?: boolean;
  controls?: string;
  describedBy?: string;
}

export const getAriaButtonProps = ({
  label,
  disabled = false,
  pressed,
  expanded,
  controls,
  describedBy,
}: AriaButtonProps) => {
  return {
    "aria-label": label,
    "aria-disabled": disabled ? "true" : undefined,
    "aria-pressed":
      pressed !== undefined ? (pressed ? "true" : "false") : undefined,
    "aria-expanded":
      expanded !== undefined ? (expanded ? "true" : "false") : undefined,
    "aria-controls": controls,
    "aria-describedby": describedBy,
  };
};

/**
 * Generate ARIA live region attributes
 */
export type AriaLive = "off" | "polite" | "assertive";
export type AriaRelevant = "additions" | "removals" | "text" | "all";

export interface AriaLiveRegionProps {
  live?: AriaLive;
  atomic?: boolean;
  relevant?: AriaRelevant[];
}

export const getAriaLiveRegionProps = ({
  live = "polite",
  atomic = false,
  relevant = ["additions", "text"],
}: AriaLiveRegionProps = {}) => {
  return {
    "aria-live": live,
    "aria-atomic": atomic ? "true" : "false",
    "aria-relevant": relevant.join(" "),
    role: "status" as const,
  };
};

/**
 * Generate ARIA attributes for dialogs/modals
 */
export interface AriaDialogProps {
  id: string;
  title: string;
  describedBy?: string;
  modal?: boolean;
}

export const getAriaDialogProps = ({
  id,
  title,
  describedBy,
  modal = true,
}: AriaDialogProps) => {
  return {
    role: modal ? ("dialog" as const) : ("alertdialog" as const),
    "aria-labelledby": `${id}-title`,
    "aria-describedby": describedBy,
    "aria-modal": modal ? "true" : undefined,
  };
};

/**
 * Remove undefined values from ARIA props object
 */
export const cleanAriaProps = <T extends Record<string, any>>(
  props: T,
): Partial<T> => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};
