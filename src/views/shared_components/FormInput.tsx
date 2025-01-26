import { capFirstLetter } from "@/utils/strings";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  // fieldName?: string;
  // fieldId: string;
  placeholder?: string;
  // required?: boolean;
  // value: string;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalStyleInput?: string; // for the input field
  additionalStyleLabel?: string; // for the input field
  additionalStyleWrapper?: string; // for the input field
  additionalStyleError?: string; // for the input field
  showLabel?: boolean;
  registration: UseFormRegisterReturn;
  label?: string; // default to registration.name
  id?: string; // default to registration.name
  error?: FieldError | undefined;
  type?: string;
}

export default function FormInput({
  // fieldName,
  // fieldId,
  placeholder,
  // value,
  // handleChange,
  additionalStyleInput,
  additionalStyleLabel,
  additionalStyleWrapper,
  additionalStyleError,
  // required = false,
  showLabel = true,
  registration,
  label,
  id,
  error,
  type = "text",
}: FormInputProps) {
  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <label
          htmlFor={registration.name}
          className={`font-bold block mb-0.5 ${additionalStyleLabel}`}
        >
          {capFirstLetter(label ?? registration.name)}:
        </label>
      )}

      <input
        type={type}
        // id={fieldId}
        // name={fieldId}
        placeholder={placeholder}
        className={`w-full rounded-md h-8 outline-none py-2 px-4 placeholder:text-zinc-200 bg-sky-300 text-sky-900 ${additionalStyleInput}`}
        // required={required}
        autoComplete="on"
        // value={value}
        // onChange={handleChange}
        {...registration}
        id={id ?? registration.name}
      />

      {error && (
        <p
          className={`text-sm italic mt-2 text-rose-500 bg-white/40 px-2 border-rose-500 border ${additionalStyleError}`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
