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
          className="cursor-pointer bg-sky-900 px-3 py-1 rounded-full border-2  border-sky-100 hover:bg-sky-800 transition shadow-2xl"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}

      {showSubmit && (
        <button
          className={`px-3 py-1 rounded-full border-2 border-sky-100 bg-aqua-forest-600 hover:bg-aqua-forest-500 transition shadow-2xl ${additionalStyleForSubmit}`}
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
