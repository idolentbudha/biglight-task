import { useState, useRef, useEffect } from "preact/hooks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useKeyboardNav, getAriaDropdownProps } from "@/utils/accessibility";
import Typography from "../typography";

export interface DropdownOption {
  value: string | number;
  label: string;
}

export interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  options: DropdownOption[];
  startIcon?: preact.JSX.Element;
  onChange?: (value: string | number) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function Dropdown({
  label = "Select",
  placeholder = "Select an option",
  value: controlledValue,
  disabled = false,
  id,
  name,
  required = false,
  options = [],
  startIcon,
  onChange,
  onBlur,
  onFocus,
}: DropdownProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number>("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isSelected = value !== "" && value !== undefined;

  // Determine border color based on 5 states: default, focus, selected, disabled, opened
  const getBorderColor = () => {
    if (disabled) return "border-0 border-disabled-dark"; // State: Disabled
    if (isOpen) return "border-3 border-border-secondary"; // State: Opened
    if (isFocused) return "border-3 border-border-secondary"; // State: Focus
    if (isSelected) return "border-3 border-border-secondary"; // State: Selected
    return "var(--border-colour-passive)"; // State: Default
  };

  const getLabelColor = () => {
    if (isOpen || isFocused || isSelected) return "text-text-body";
    return "text-text-disabled";
  };

  const getBorderWidth = () => {
    if (disabled) return "0px";
    if (isOpen || isFocused) return "3px";
    return "2px";
  };

  const handleChange = (e: any) => {
    const newValue = e?.target?.value;

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Reset highlighted index when options change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [options]);

  // Keyboard navigation using reusable hook
  const keyboardRef = useKeyboardNav<HTMLDivElement>({
    onArrowDown: () => {
      if (!disabled) {
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex < options.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        }
      }
    },
    onArrowUp: () => {
      if (!disabled && isOpen && highlightedIndex > 0) {
        setHighlightedIndex(highlightedIndex - 1);
      }
    },
    onEnter: () => {
      if (
        !disabled &&
        isOpen &&
        highlightedIndex >= 0 &&
        options[highlightedIndex]
      ) {
        const selectedOption = options[highlightedIndex];
        if (controlledValue === undefined) {
          setInternalValue(selectedOption.value);
        }
        onChange?.(selectedOption.value);
        setIsOpen(false);
      }
    },
    onEscape: () => {
      if (!disabled && isOpen) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    },
    onSpace: () => {
      if (!disabled && !isOpen) {
        setIsOpen(true);
      }
    },
    onHome: () => {
      if (!disabled && isOpen) {
        setHighlightedIndex(0);
      }
    },
    onEnd: () => {
      if (!disabled && isOpen) {
        setHighlightedIndex(options.length - 1);
      }
    },
    enabled: !disabled,
  });

  const selectId =
    id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  // Generate ARIA attributes for accessibility
  const ariaProps = getAriaDropdownProps({
    id: selectId,
    label,
    expanded: isOpen,
    required,
    disabled,
    invalid: false,
    describedBy: required ? `${selectId}-helper-text` : undefined,
  });

  return (
    <div class="w-full" ref={keyboardRef}>
      <FormControl fullWidth variant="outlined">
        {label && (
          <InputLabel
            id={`${selectId}-label`}
            className={`${getLabelColor()} font-normal`}
          >
            {label}
          </InputLabel>
        )}
        <Select
          labelId={`${selectId}-label`}
          id={selectId}
          name={name}
          value={value}
          label={label}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onOpen={handleOpen}
          onClose={handleClose}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          inputProps={{
            "aria-expanded": ariaProps["aria-expanded"] === "true",
            "aria-haspopup": ariaProps["aria-haspopup"],
            "aria-required": ariaProps["aria-required"] === "true",
            "aria-describedby": ariaProps["aria-describedby"],
          }}
          className={`rounded-lg ${disabled ? "bg-surface-disabled-dark" : isSelected ? "bg-surface-selected" : "bg-secondary"}`}
          IconComponent={(_props) => (
            <ExpandMoreIcon
              className={`mr-6 ${
                disabled
                  ? "fill-icon-action-disabled"
                  : "fill-icon-action-active"
              }`}
              aria-label={isOpen ? "Collapse options" : "Expand options"}
              role="img"
              fontSize={"medium"}
            />
          )}
          slotProps={{
            root: {
              className: `${disabled ? "text-text-disabled" : "text-text-body"}`,
            },
            notchedOutline: { className: `border-2 ${getBorderColor()} ` },
          }}
          startAdornment={startIcon}
          renderValue={(selected) => {
            if (selected === "" || selected === undefined) {
              return <em class="text-text-passive px-4">{placeholder}</em>;
            }
            const option = options.find((opt) => opt.value === selected);
            return option ? option.label : selected;
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText id={`${selectId}-helper-text`}>
          {required && (
            <p class="text-md">
              <span class="text-warning">*</span>required
            </p>
          )}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default Dropdown;
