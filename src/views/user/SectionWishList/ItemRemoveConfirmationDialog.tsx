import PopupDialog from "@/views/shared_components/PopupDialog";
import PopupDialogButtons from "@/views/shared_components/PopupDialogButtons";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";

interface Props {
  isOpen: boolean;
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
  name: string;
  onClickDelete: () => void;
}

export default function ItemRemoveConfirmationDialog({
  isOpen,
  name,
  setToDeleteItemId,
  onClickDelete,
}: Props) {
  const [showLoader, setShowLoader] = useState(false);

  function handleDelete() {
    setShowLoader(true);
    onClickDelete();
  }

  function onCloseDialog() {
    setToDeleteItemId("");
  }

  return (
    <PopupDialog
      isOpen={isOpen}
      onClose={onCloseDialog}
      disableClose={showLoader}
      header="Deletion Confirmation"
    >
      <div>
        Are you sure to remove <b>{name}</b>?
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-8">
          <LoadingIndicator />
        </div>
      ) : (
        <PopupDialogButtons
          onCancel={onCloseDialog}
          submitText="Delete"
          onSubmit={handleDelete}
        />
      )}
    </PopupDialog>
  );
}
