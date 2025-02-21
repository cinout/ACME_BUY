import { FormProductProps } from "@/utils/entities";
import { iconAddWithCircle, iconTrashCan } from "@/utils/icons";
import { styleFormLabel, styleFormTypeArea } from "@/utils/styles";
import { useState } from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

interface Props {
  label: string; // default to registration.name
  disabled?: boolean;
  currentValue: { title: string; indexDisplay: string }[];
  additionalStyleWrapper?: string; // for the input field
  additionalStyleLabel?: string; // for the input field
  showLabel?: boolean;
  control: Control<FormProductProps, unknown>;
  register: UseFormRegister<FormProductProps>;
}

export default function FormTrackList({
  label,
  showLabel = true,
  disabled,
  currentValue,
  additionalStyleWrapper,
  additionalStyleLabel,
  control,
  register,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tracklist", // Array name
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full ${additionalStyleWrapper}`}>
      {/* Label */}
      {showLabel && (
        <div className={`${styleFormLabel} ${additionalStyleLabel}`}>
          {label}:
        </div>
      )}

      {/* Display selected options as items */}
      {disabled ? (
        currentValue?.map((value, index) => (
          <div key={index}>
            <div className="min-w-10 text-left inline-block">
              {value.indexDisplay}
            </div>
            <span>{value.title} </span>
          </div>
        ))
      ) : (
        <div
          className={`w-full flex flex-col gap-y-2`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="w-full flex items-center text-sky-800 gap-x-2"
              >
                {/* Index Display */}
                <input
                  type="text"
                  {...register(`tracklist.${index}.indexDisplay`)}
                  className={`${styleFormTypeArea} h-8 w-20 text-center`}
                  placeholder="#"
                />

                {/* Track Title */}
                <input
                  type="text"
                  {...register(`tracklist.${index}.title`)}
                  className={`${styleFormTypeArea} h-8 w-full max-w-[38rem]`}
                  placeholder="title"
                />

                {/* Remove Track Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="group text-rose-500 h-8 w-8 bg-sky-50 hover:bg-rose-100 transition flex justify-center items-center text-lg rounded-md"
                >
                  {iconTrashCan("group-hover:scale-110 transition")}
                </button>
              </div>
            );
          })}

          {/* Add Track Button */}
          <button
            type="button"
            onClick={() =>
              append({
                title: "",
                indexDisplay: "",
              })
            }
            className="group text-aqua-forest-600 bg-sky-50 hover:bg-aqua-forest-100 p-2 mt-2 h-8 w-20 text-xl border flex justify-center items-center rounded-md hover:brightness-110 transition"
          >
            {iconAddWithCircle("group-hover:scale-110 transition")}
          </button>
        </div>
      )}
    </div>
  );
}
