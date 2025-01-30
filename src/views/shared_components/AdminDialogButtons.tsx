import { styleCancelButton, styleSubmitButton } from "@/utils/styles";

interface AdminDialogButtonsProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  submitText?: string;
  showCancel?: boolean;
  showSubmit?: boolean;
  additionalStyleForSubmit?: string;
}

export default function AdminDialogButtons({
  onCancel,
  onSubmit,
  submitText = "",
  showCancel = true,
  showSubmit = true,
  additionalStyleForSubmit,
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
        >
          {submitText}
        </button>
      )}
    </div>
  );
}
