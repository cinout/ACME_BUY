export default function FormInput({
  fieldName,
  fieldId,
  placeholder,
  value,
  handleChange,
  required = false,
  additionalStyleInput,
  additionalStyleLabel,
  additionalStyleWrapper,
  showLabel = true,
}: {
  fieldName: string;
  fieldId: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  additionalStyleInput?: string; // for the input field
  additionalStyleLabel?: string; // for the input field
  additionalStyleWrapper?: string; // for the input field
  showLabel?: boolean;
}) {
  return (
    <div className={`${additionalStyleWrapper}`}>
      {showLabel && (
        <label
          htmlFor={fieldId}
          className={`font-bold w-1/4 block mb-0.5 ${additionalStyleLabel}`}
        >
          {fieldName}:
        </label>
      )}

      <input
        type="text"
        id={fieldId}
        name={fieldId}
        placeholder={placeholder}
        className={`w-full rounded-md h-8 outline-none py-2 px-4 placeholder:text-zinc-200 bg-sky-300 text-sky-900 ${additionalStyleInput}`}
        required={required}
        autoComplete="on"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
