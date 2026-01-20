import { useState } from "preact/hooks";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
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

  return (
    <div class="w-full">
      <FormControl fullWidth variant="outlined">
        {label && (
          <InputLabel
            htmlFor={inputId}
            // style={{ color: "var(--text-colour-body)" }}
            className={`${disabled ? "text-text-disabled" : state === "error" ? "text-text-error" : "text-text-body"} font-medium`}
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
          // className={`
          //       w-full px-md py-sm
          //       font-body text-body-md
          //       rounded-lg
          //       border-2 ${getBorderColor()}
          //       transition-colors duration-200
          //       outline-none
          //       ${
          //         disabled
          //           ? "bg-disabled-light text-disabled cursor-not-allowed"
          //           : "bg-secondary text-body"
          //       }
          //       ${!disabled && "hover:border-border-secondary"}
          //       placeholder:text-passive
          //     `}
          className={`rounded-lg ${disabled ? "bg-disabled-dark" : "bg-secondary"}`}
          slotProps={{
            notchedOutline: {
              className: `border-2 ${getBorderColor()} `,
            },
          }}
          endAdornment={
            <InputAdornment position="end">
              {state === "success" ? (
                <CheckIcon className={`fill-icon-positive`} />
              ) : (
                <CloseIcon
                  className={`${disabled ? "fill-icon-action-disabled" : state === "error" ? "fill-icon-error" : "fill-icon-action-active"} transition-colors`}
                />
              )}
            </InputAdornment>
          }
        />
        <FormHelperText id="outlined-weight-helper-text">
          {required && (
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
