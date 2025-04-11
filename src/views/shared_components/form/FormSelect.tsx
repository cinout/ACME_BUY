import { capFirstLetter } from "@/utils/strings";
import {
  styleFormErrorMessage,
  styleFormLabel,
  styleFormTypeArea,
} from "@/utils/styles";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps {
  additionalStyleSelect?: string;
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
  options: { id: string; value: number | string; display: string }[];
  disabled?: boolean;
  currentValue?: string | number;
  placeholder?: string;
}

export default function FormSelect({
  additionalStyleSelect,
  additionalStyleLabel,
  additionalStyleWrapper,
  additionalStyleError,
  showLabel = true,
  registration,
  label,
  id,
  error,
  options,
  additionalStyleContentWrapper,
  disabled,
  currentValue,
  placeholder,
}: FormSelectProps) {
  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <div className={`${styleFormLabel} ${additionalStyleLabel}`}>
          {label ?? capFirstLetter(registration.name)}:
        </div>
      )}

      {/* TODO:[3] allow user to type and search */}
      <div className={`flex flex-col ${additionalStyleContentWrapper}`}>
        {disabled ? (
          currentValue ? (
            <span className="">
              {options.find((a) => a.value === currentValue)?.display}
            </span>
          ) : null
        ) : (
          <>
            <select
              id={id ?? registration.name}
              {...registration}
              autoComplete="on"
              className={`${styleFormTypeArea} cursor-pointer h-8 ${additionalStyleSelect}`}
              disabled={disabled}
            >
              <option
                value=""
                className="background-color: yellow; color: red;"
              >
                -- {placeholder ?? "Select"} --
              </option>
              {options.map(({ id, value, display }) => (
                <option key={id} value={value}>
                  {display}
                </option>
              ))}
            </select>

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
