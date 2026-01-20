/**
 * Keyboard event handlers for accessibility
 * Provides reusable keyboard interaction patterns following WCAG guidelines
 */

export type KeyboardKey =
  | "Enter"
  | "Space"
  | "Escape"
  | "Tab"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Home"
  | "End";

export interface KeyboardHandlerOptions {
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/**
 * Handle Enter and Space key activation for interactive elements
 * Follows WCAG 2.1 - Keyboard Accessible (2.1.1)
 */
export const handleActivation = (
  callback: () => void,
  options: KeyboardHandlerOptions = { preventDefault: true },
) => {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      if (options.preventDefault) event.preventDefault();
      if (options.stopPropagation) event.stopPropagation();
      callback();
    }
  };
};

/**
 * Handle Escape key to close modals/dropdowns
 */
export const handleEscape = (
  callback: () => void,
  options: KeyboardHandlerOptions = { preventDefault: true },
) => {
  return (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      if (options.preventDefault) event.preventDefault();
      if (options.stopPropagation) event.stopPropagation();
      callback();
    }
  };
};

/**
 * Handle arrow key navigation for lists/menus
 */
export const handleArrowNavigation = (
  onUp: () => void,
  onDown: () => void,
  options: KeyboardHandlerOptions = { preventDefault: true },
) => {
  return (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      if (options.preventDefault) event.preventDefault();
      onUp();
    } else if (event.key === "ArrowDown") {
      if (options.preventDefault) event.preventDefault();
      onDown();
    }
  };
};

/**
 * Handle Home/End keys for navigation
 */
export const handleHomeEnd = (
  onHome: () => void,
  onEnd: () => void,
  options: KeyboardHandlerOptions = { preventDefault: true },
) => {
  return (event: KeyboardEvent) => {
    if (event.key === "Home") {
      if (options.preventDefault) event.preventDefault();
      onHome();
    } else if (event.key === "End") {
      if (options.preventDefault) event.preventDefault();
      onEnd();
    }
  };
};

/**
 * Check if key is a printable character (for typeahead/search)
 */
export const isPrintableCharacter = (key: string): boolean => {
  return key.length === 1 && key.match(/\S/) !== null;
};

/**
 * Debounce function for typeahead search
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
