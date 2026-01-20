import { useEffect, useRef } from "preact/hooks";
import {
  handleActivation,
  handleEscape,
  handleArrowNavigation,
  handleHomeEnd,
} from "./keyboardHandlers";

/**
 * Keyboard navigation hook for interactive elements
 * Provides standardized keyboard support following WCAG guidelines
 * Built on top of reusable keyboard handler functions
 */

export interface UseKeyboardNavOptions {
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
  onTab?: (shiftKey: boolean) => void;
  enabled?: boolean;
  preventDefault?: boolean;
}

export const useKeyboardNav = <T extends HTMLElement = HTMLElement>({
  onEnter,
  onSpace,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onHome,
  onEnd,
  onTab,
  enabled = true,
  preventDefault = true,
}: UseKeyboardNavOptions) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const element = ref.current;
    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Handle Enter/Space activation
      if (onEnter || onSpace) {
        const activationHandler = handleActivation(
          () => {
            if (event.key === "Enter" && onEnter) onEnter();
            if (event.key === " " && onSpace) onSpace();
          },
          { preventDefault },
        );
        activationHandler(event);
        // If handled, return early
        if (event.defaultPrevented) return;
      }

      // Handle Escape
      if (onEscape) {
        const escapeHandler = handleEscape(onEscape, { preventDefault });
        escapeHandler(event);
        if (event.defaultPrevented) return;
      }

      // Handle Arrow navigation
      if (onArrowUp || onArrowDown) {
        const arrowHandler = handleArrowNavigation(
          onArrowUp || (() => {}),
          onArrowDown || (() => {}),
          { preventDefault },
        );
        arrowHandler(event);
        if (event.defaultPrevented) return;
      }

      // Handle left/right arrows
      if (
        (onArrowLeft || onArrowRight) &&
        (event.key === "ArrowLeft" || event.key === "ArrowRight")
      ) {
        if (preventDefault) event.preventDefault();
        if (event.key === "ArrowLeft" && onArrowLeft) onArrowLeft();
        if (event.key === "ArrowRight" && onArrowRight) onArrowRight();
        return;
      }

      // Handle Home/End
      if (onHome || onEnd) {
        const homeEndHandler = handleHomeEnd(
          onHome || (() => {}),
          onEnd || (() => {}),
          { preventDefault },
        );
        homeEndHandler(event);
        if (event.defaultPrevented) return;
      }

      // Handle Tab separately since it might need shift key info
      if (event.key === "Tab" && onTab) {
        onTab(event.shiftKey);
      }
    };

    element.addEventListener("keydown", handleKeyDown as EventListener);

    return () => {
      element.removeEventListener("keydown", handleKeyDown as EventListener);
    };
  }, [
    enabled,
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onTab,
    preventDefault,
  ]);

  return ref;
};

/**
 * Simplified hook for Enter/Space activation
 */
export const useActivation = <T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled = true,
) => {
  return useKeyboardNav<T>({
    onEnter: callback,
    onSpace: callback,
    enabled,
  });
};
