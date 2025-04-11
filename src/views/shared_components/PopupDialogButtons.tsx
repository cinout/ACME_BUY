import {
  styleCancelButton,
  styleSecondSubmitButton,
  styleSubmitButton,
} from "@/utils/styles";

interface PopupDialogButtonsProps {
  // Cancel
  onCancel?: () => void;
  showCancel?: boolean;

  // Submit
  showSubmit?: boolean;
  submitText?: string;
  onSubmit?: () => void; // if PopupDialogButtonsProps is wrapped in <form> tag, you don't need to pass onSubmit; let the form tag's onSubmit function handle that
  additionalStyleForSubmit?: string;

  // Second Submit
  showSecondarySubmitButton?: boolean;
  secondarySubmitText?: string;
  onSecondarySubmit?: () => void;
  additionalStyleForSecondarySubmit?: string;

  // Others
  additionalStyleForWrapper?: string;
  isDirty?: boolean;
}

export default function PopupDialogButtons({
  onCancel,
  onSubmit,
  submitText = "",
  showCancel = true,
  showSubmit = true,
  additionalStyleForSubmit,
  additionalStyleForWrapper,
  isDirty = true,
  showSecondarySubmitButton = false,
  additionalStyleForSecondarySubmit,
  onSecondarySubmit,
  secondarySubmitText,
}: PopupDialogButtonsProps) {
  return (
    <div
      className={`flex flex-wrap justify-between items-center mt-8 ${additionalStyleForWrapper}`}
    >
      {showCancel && (
        <button
          type="button" // to prevent trigger form submission if PopupDialogButtons is wrapped in <form> tag
          className={styleCancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
      )}

      {showSubmit && (
        <div className="flex gap-2">
          {showSecondarySubmitButton && (
            <button
              className={`${styleSecondSubmitButton} ${additionalStyleForSecondarySubmit}`}
              onClick={onSecondarySubmit}
              disabled={!isDirty}
            >
              {secondarySubmitText}
            </button>
          )}

          <button
            className={`${styleSubmitButton} ${additionalStyleForSubmit}`}
            onClick={onSubmit}
            disabled={!isDirty}
          >
            {submitText}
          </button>
        </div>
      )}
    </div>
  );
}
