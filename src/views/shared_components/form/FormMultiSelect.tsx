import { iconCrossClose, iconDownWithCircle } from "@/utils/icons";
import { capFirstLetter } from "@/utils/strings";
import { styleFormErrorMessage, styleFormLabel } from "@/utils/styles";
import { useState, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  registration: UseFormRegisterReturn;
  label?: string; // default to registration.name
  // id?: string; // default to registration.name
  errorMessage?: string | undefined;
  options: { id: string; value: number | string; display: string }[];
  disabled?: boolean;
  currentValue: (string | number)[];
  additionalStyleWrapper?: string; // for the input field
  additionalStyleLabel?: string; // for the input field
  additionalStyleError?: string; // for the input field
  additionalStyleSelect?: string; // for the input field
  showLabel?: boolean;
  handleAddTag: (tagId: string | number) => void;
  handleRemoveTag: (removeId: string | number) => void;
  countLimit?: number;
  requirementText?: string;
}

export default function FormMultiSelect({
  registration,
  label,
  // id,
  errorMessage,
  handleAddTag,
  handleRemoveTag,
  showLabel = true,
  options,
  disabled,
  currentValue,
  additionalStyleWrapper,
  additionalStyleLabel,
  additionalStyleError,
  additionalStyleSelect,
  countLimit,
  requirementText,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Listen for clicks outside
  useState(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className={`${additionalStyleWrapper} relative`} ref={dropdownRef}>
      {/* Label */}
      {showLabel && (
        <div
          // htmlFor={registration.name}
          className={`${styleFormLabel} ${additionalStyleLabel}`}
        >
          {label ?? capFirstLetter(registration.name)}:
          {!disabled && requirementText && (
            <span className="text-sm font-normal italic ml-2">
              {requirementText}
            </span>
          )}
        </div>
      )}

      {/* Display selected options as tags */}
      {disabled ? (
        currentValue
          ?.map((a) => options.find((option) => option.value === a)?.display)
          .join(", ")
      ) : (
        <>
          <div
            className={`flex flex-wrap items-center cursor-pointer min-h-8 bg-sky-50 rounded-md ${additionalStyleSelect}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {currentValue?.length > 0 ? (
              currentValue.map((value) => {
                const option = options.find((a) => a.value === value)!;
                return (
                  <span
                    key={option.id}
                    className="bg-aqua-forest-500 text-white px-2 rounded m-1 flex items-center"
                  >
                    {option.display}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(option.value)}
                      className="ml-2"
                    >
                      {iconCrossClose(
                        "text-aqua-forest-600 text-lg hover:scale-110 transition bg-aqua-forest-100"
                      )}
                    </button>
                  </span>
                );
              })
            ) : (
              <span className="px-2 text-slate-400 italic text-sm">
                Select ...
              </span>
            )}

            {iconDownWithCircle("ml-auto mr-2 text-aqua-forest-700 text-xl")}
          </div>
          {errorMessage && (
            <p className={`${styleFormErrorMessage} ${additionalStyleError}`}>
              {errorMessage}
            </p>
          )}
        </>
      )}

      {/* Dropdown menu */}
      {!disabled && isOpen && (
        <div
          className={`absolute top-full left-0 max-h-96 overflow-y-scroll bg-sky-50 text-sky-900 rounded-md shadow-lg mt-[0.1rem] z-10 ${additionalStyleSelect}`}
        >
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => handleAddTag(option.value)}
              className={`px-4 py-1 not-disabled:hover:bg-aqua-forest-100 data-[selected=true]:bg-aqua-forest-200`}
              disabled={
                currentValue.includes(option.value) ||
                (!!countLimit && currentValue.length >= countLimit)
              }
              data-selected={currentValue.includes(option.value)}
            >
              {option.display}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
