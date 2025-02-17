import { capFirstLetter } from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleFormTypeArea,
} from "@/utils/styles";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  placeholder?: string;
  additionalStyleInput?: string;
  additionalStyleLabel?: string;
  additionalStyleWrapper?: string;
  additionalStyleError?: string;
  additionalStyleContentWrapper?: string;
  showLabel?: boolean;
  registration: UseFormRegisterReturn;
  label?: string; // default to registration.name
  id?: string; // default to registration.name
  error?: FieldError | undefined;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  currentValue?: string | number;
}

export default function FormInput({
  placeholder,
  additionalStyleInput,
  additionalStyleLabel,
  additionalStyleWrapper,
  additionalStyleError,
  additionalStyleContentWrapper,
  showLabel = true,
  registration,
  label,
  id,
  error,
  type = "text",
  min,
  max,
  step = 1,
  disabled = false,
  currentValue,
}: FormInputProps) {
  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <div className={`${styleFormLabel} ${additionalStyleLabel}`}>
          {label ?? capFirstLetter(registration.name)}:
        </div>
      )}

      <div className={`flex flex-col ${additionalStyleContentWrapper}`}>
        {disabled ? (
          currentValue ? (
            <span className="">{currentValue}</span>
          ) : null
        ) : (
          <>
            <input
              type={type}
              placeholder={placeholder}
              className={`${styleFormTypeArea} h-8 py-2 ${additionalStyleInput}`}
              autoComplete="on"
              {...registration}
              id={id ?? registration.name}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
            />

            {error && (
              <p className={`${styleFormErrorMessage} ${additionalStyleError}`}>
                {error.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
