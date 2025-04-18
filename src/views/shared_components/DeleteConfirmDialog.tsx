import PopupDialog from "@/views/shared_components/PopupDialog";
import PopupDialogButtons from "@/views/shared_components/PopupDialogButtons";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import toast from "react-hot-toast";
import { DocumentNode, useMutation } from "@apollo/client";
import { getErrorMessage } from "@/graphql";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
  id: string;
  name: string;
  deletionQuery: DocumentNode;
  gqlType: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  id,
  name,
  setToDeleteItemId,
  deletionQuery,
  gqlType,
}: DeleteConfirmDialogProps) {
  const [showLoader, setShowLoader] = useState(false);

  const [deleteQuery] = useMutation(deletionQuery, {
    variables: { id },
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    update: (cache) => {
      cache.evict({ id: cache.identify({ __typename: gqlType, id }) }); // Evicts (removes) the item from Apollo's cache
      cache.gc(); // Garbage collection to remove dangling references (e.g., if a product was removed but still listed in a cart).
    },
    onCompleted: () => {
      setShowLoader(false);
      onCloseDialog();
    },
  });

  function handleDelete() {
    setShowLoader(true);
    void deleteQuery();
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
        Are you sure to delete {gqlType} <b>{name}</b>?
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
