import { styleCancelButton, styleSubmitButton } from "@/utils/styles";

interface AdminDialogButtonsProps {
  onCancel?: () => void;
  onSubmit?: () => void; // if AdminDialogButtonsProps is wrapped in <form> tag, you don't need to pass onSubmit; let the form tag's onSubmit function handle that
  submitText?: string;
  showCancel?: boolean;
  showSubmit?: boolean;
  additionalStyleForSubmit?: string;
  isDirty?: boolean;
}

// TODO: change name
export default function AdminDialogButtons({
  onCancel,
  onSubmit,
  submitText = "",
  showCancel = true,
  showSubmit = true,
  additionalStyleForSubmit,
  isDirty = true,
}: AdminDialogButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      {showCancel && (
        <button
          type="button" // to prevent trigger form submission if AdminDialogButtons is wrapped in <form> tag
          className={styleCancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
      )}

      {showSubmit && (
        <button
          className={`${styleSubmitButton} ${additionalStyleForSubmit}`}
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
          }}
          disabled={!isDirty}
        >
          {submitText}
        </button>
      )}
    </div>
  );
}
