import { capFirstLetter } from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleFormTypeArea,
} from "@/utils/styles";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormTextareaProps {
  placeholder?: string;
  additionalStyleInput?: string;
  additionalStyleLabel?: string;
  additionalStyleWrapper?: string;
  additionalStyleContentWrapper?: string;
  additionalStyleError?: string;
  showLabel?: boolean;
  registration: UseFormRegisterReturn;
  label?: string; // default to registration.name
  id?: string; // default to registration.name
  error?: FieldError | undefined;
  disabled?: boolean;
  currentValue?: string | number;
}

export default function FormTextarea({
  placeholder,
  additionalStyleInput,
  additionalStyleLabel,
  additionalStyleWrapper,
  additionalStyleError,
  showLabel = true,
  registration,
  label,
  id,
  error,
  additionalStyleContentWrapper,
  disabled,
  currentValue,
}: FormTextareaProps) {
  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <label
          htmlFor={registration.name}
          className={`${styleFormLabel} ${additionalStyleLabel}`}
        >
          {label ?? capFirstLetter(registration.name)}:
        </label>
      )}

      <div className={`flex flex-col ${additionalStyleContentWrapper}`}>
        {disabled ? (
          currentValue ? (
            <span className="">{currentValue}</span>
          ) : null
        ) : (
          <>
            <textarea
              placeholder={placeholder}
              className={`${styleFormTypeArea} h-20 py-2 ${additionalStyleInput}`}
              autoComplete="on"
              {...registration}
              id={id ?? registration.name}
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
