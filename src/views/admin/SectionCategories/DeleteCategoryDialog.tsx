import AdminDialog from "@/views/shared_components/AdminDialog";
import AdminDialogButtons from "@/views/shared_components/AdminDialogButtons";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { GQL_CATEGORY_DELETE } from "@/graphql/categoryGql";
import { getErrorMessage } from "@/graphql";
import { CategoryEntity } from "@/utils/entities";

interface DeleteCategoryDialogProps {
  isOpen: boolean;
  category: CategoryEntity;
  setToDeleteItemId: Dispatch<SetStateAction<string>>;
}

export default function DeleteCategoryDialog({
  isOpen,
  category,
  setToDeleteItemId,
}: DeleteCategoryDialogProps) {
  const { id, name } = category;
  const [showLoader, setShowLoader] = useState(false);

  const [deleteCategory] = useMutation(GQL_CATEGORY_DELETE, {
    variables: { id },
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      setShowLoader(false);
      onCloseDialog();
    },
    update: (cache) => {
      cache.evict({ id: cache.identify({ __typename: "Category", id }) });
      cache.gc(); // Garbage collection to remove dangling references
    },
  });

  function handleDelete() {
    setShowLoader(true);
    void deleteCategory();
  }

  function onCloseDialog() {
    setToDeleteItemId("");
  }

  return (
    <AdminDialog
      isOpen={isOpen}
      onClose={onCloseDialog}
      disableClose={showLoader}
      header="Deletion Confirmation"
    >
      <div>
        Are you sure to delete category <b>{name}</b>?
      </div>

      {showLoader ? (
        <div className="flex justify-center mt-8">
          <LoadingIndicator />
        </div>
      ) : (
        <AdminDialogButtons
          onCancel={onCloseDialog}
          submitText="Delete"
          onSubmit={handleDelete}
        />
      )}
    </AdminDialog>
  );
}
