import { ReactNode } from "react";

export function FormInput({
  fieldName,
  fieldId,
  placeholder,
  value,
  handleChange,
  required = false,
  additionalStyle,
}: {
  fieldName: string;
  fieldId: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalStyle?: string;
}) {
  return (
    <div className="my-4">
      <label htmlFor={fieldId} className="font-bold w-1/4 block mb-0.5">
        {fieldName}:
      </label>
      <input
        type="text"
        id={fieldId}
        name={fieldId}
        placeholder={placeholder}
        className={`w-full rounded-md h-8 outline-none py-2 px-4 placeholder:text-zinc-200 bg-sky-300 text-sky-900 ${additionalStyle}`}
        required={required}
        autoComplete="on"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export function SignInOptionButton({
  children,
  additionalClass,
  handleClick,
}: {
  children: ReactNode;
  additionalClass?: string;
  handleClick?: () => void;
}) {
  return (
    <button
      className={`rounded-md text-sky-900 border-sky-900 border-2 px-3 py-0.5 flex justify-center items-center ${additionalClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
