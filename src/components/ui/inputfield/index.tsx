import { useState } from "preact/hooks";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { getAriaFormFieldProps } from "@/utils/accessibility";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { FormHelperText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type InputState = "default" | "error" | "success";

export interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  state?: InputState;
  id?: string;
  name?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  required?: boolean;
  showStateIcon?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function InputField({
  label = "Label",
  placeholder = "Input label",
  value: controlledValue,
  disabled = false,
  state = "default",
  id,
  name,
  type = "text",
  required = false,
  showStateIcon = true,
  onChange,
  onBlur,
  onFocus,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const isFilled = value.length > 0;

  // Determine border color based on state and focus
  const getBorderColor = () => {
    if (disabled) return "border-0 border-disabled-dark";
    if (state === "error") return "border-3 border-border-error";
    // if (state === "success") return "border-positive";
    if (isFocused) return "border-3 border-border-secondary";
    return "border-border-passive";
  };

  const getLabelColor = () => {
    if (isFocused || isFilled) return "text-text-body";
    return "text-text-disabled";
  };

  // Determine helper text color
  const getHelperTextColor = () => {
    if (state === "error") return "text-error";
    if (state === "success") return "text-success";
    return "text-passive";
  };

  const handleInputChange = (e: any) => {
    const newValue = e?.target?.value || "";

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

  const inputId =
    id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  // Generate ARIA attributes for accessibility
  const ariaProps = getAriaFormFieldProps({
    id: inputId,
    label,
    required,
    disabled,
    invalid: state === "error",
    describedBy: required ? `${inputId}-helper-text` : undefined,
    errorMessage: state === "error" ? "Please check this field" : undefined,
  });

  return (
    <div class="w-full">
      <FormControl fullWidth variant="outlined">
        {label && (
          <InputLabel
            htmlFor={inputId}
            className={`${getLabelColor()} font-normal text-base`}
          >
            {label}
          </InputLabel>
        )}
        <OutlinedInput
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onInput={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          label={label}
          inputProps={{
            "aria-label": ariaProps["aria-label"],
            "aria-required": ariaProps["aria-required"] === "true",
            "aria-invalid": ariaProps["aria-invalid"] === "true",
            "aria-describedby": ariaProps["aria-describedby"],
          }}
          className={`rounded-lg ${disabled ? "bg-disabled-dark" : "bg-secondary"}`}
          slotProps={{
            notchedOutline: {
              className: `border-2 ${getBorderColor()} `,
            },
          }}
          endAdornment={
            showStateIcon && (
              <InputAdornment position="end">
                {state === "success" ? (
                  <CheckIcon
                    className={`fill-icon-positive`}
                    aria-label="Input is valid"
                    role="img"
                  />
                ) : (
                  <CloseIcon
                    className={`${disabled ? "fill-icon-action-disabled" : state === "error" ? "fill-icon-error" : "fill-icon-action-active"} transition-colors`}
                    aria-label={
                      state === "error" ? "Error in input" : "Clear input"
                    }
                    role="img"
                  />
                )}
              </InputAdornment>
            )
          }
        />
        <FormHelperText id={`${inputId}-helper-text`}>
          {state === "error" && (
            <span class="text-text-error" role="alert" aria-live="polite">
              Please check this field
            </span>
          )}
          {state === "success" && (
            <span class="text-text-success" role="status" aria-live="polite">
              Input is valid
            </span>
          )}
          {required && !state && (
            <p class="text-md">
              <span class={"text-warning"}>*</span>required
            </p>
          )}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default InputField;
