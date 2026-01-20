import { useState } from "preact/hooks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
  onChange,
  onBlur,
  onFocus,
}: DropdownProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | number>("");

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
  };

  const selectId =
    id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div class="w-full">
      <FormControl fullWidth variant="outlined">
        {label && (
          <InputLabel
            id={`${selectId}-label`}
            className={`${disabled ? "text-text-disabled" : "text-text-body"} font-medium`}
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
          displayEmpty={!!placeholder}
          className={`rounded-lg ${disabled ? "bg-surface-disabled-dark" : isSelected ? "bg-surface-selected" : "bg-secondary"}`}
          IconComponent={(_props) => (
            <ExpandMoreIcon
              className={`mr-6 ${
                disabled
                  ? "fill-icon-action-disabled"
                  : "fill-icon-action-active"
              }`}
            />
          )}
          slotProps={{
            root: {
              className: `${disabled ? "text-text-disabled" : "text-text-body"}`,
            },
            notchedOutline: { className: `border-2 ${getBorderColor()} ` },
          }}
          startAdornment={<AccessTimeIcon className="px-1.5" />}
        >
          {value === "" && (
            <MenuItem value="" disabled>
              <em class="text-text-passive px-4">{placeholder}</em>
            </MenuItem>
          )}

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
