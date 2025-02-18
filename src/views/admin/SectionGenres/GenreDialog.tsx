import PopupDialog from "@/views/shared_components/PopupDialog";
import PopupDialogButtons from "@/views/shared_components/PopupDialogButtons";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
} from "@/utils/strings";
import { imageMaxSizeMB } from "@/utils/numbers";
import FormSingleImage from "@/views/shared_components/form/FormSingleImages";
import FormInput from "@/views/shared_components/form/FormInput";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import toast from "react-hot-toast";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  GQL_GENRE_CREATE,
  GQL_GENRES_GET_ALL,
  GQL_GENRE_UPDATE,
} from "@/graphql/genreGql";
import { getErrorMessage } from "@/graphql";
import { GenreEntity } from "@/utils/entities";

interface GenreDialogProps {
  isOpen: boolean;
  mode: "Create" | "Edit";
  submitText: string;
  editGenreInfo: GenreEntity | undefined;
}

interface FormNewGenreProps {
  name: string;
  image: { file: File | string | null; name: string | null };
}

export default function GenreDialog({
  isOpen,
  mode,
  editGenreInfo,
  submitText,
}: GenreDialogProps) {
  /**
   * States
   */
  const [showLoader, setShowLoader] = useState(false);

  /**
   * Route
   */
  const navigate = useNavigate();

  /**
   * RHF
   */
  const isCreateMode = mode === "Create";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
    clearErrors,
  } = useForm<FormNewGenreProps>({
    defaultValues: isCreateMode
      ? {
          name: "",
          image: { file: null, name: null },
        }
      : {
          name: editGenreInfo?.name,
          image: {
            file: editGenreInfo?.imageUrl,
            name: editGenreInfo?.imageName,
          },
        },
  });
  const uploadedImage = watch("image");

  /**
   * GQLs
   */
  const [createGenre] = useMutation(GQL_GENRE_CREATE, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    update(cache, { data }) {
      // TODO: update to updateQuery
      const existingData = cache.readQuery<{
        getAllGenres: FormNewGenreProps[];
      }>({
        query: GQL_GENRES_GET_ALL,
      });

      cache.writeQuery({
        query: GQL_GENRES_GET_ALL,
        data: {
          getAllGenres: [
            ...(existingData?.getAllGenres ?? []),
            data.createGenre,
          ],
        },
      });
    },
    onCompleted: () => {
      setShowLoader(false);
      onCloseDialog();
    },
  });

  const [updateGenre] = useMutation(GQL_GENRE_UPDATE, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      setShowLoader(false);
      onCloseDialog();
    },
  });

  const client = useApolloClient();
  const existingGenres = (client.readQuery({
    query: GQL_GENRES_GET_ALL,
  }).getAllGenres || []) as GenreEntity[];
  const existingnames = existingGenres
    .filter((a) => a.id !== editGenreInfo?.id)
    .map((a) => a.name);

  /**
   * Functions
   */

  function handleAddImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setValue(
        "image",
        { file, name: file.name },
        { shouldValidate: true, shouldDirty: true }
      );
    }
  }

  function handleRemoveImage() {
    setValue("image", { file: null, name: null }, { shouldDirty: true });
    clearErrors("image");
  }

  function onSubmit(data: FormNewGenreProps): void {
    setShowLoader(true);
    if (mode === "Create") {
      // Create Mode
      void createGenre({
        variables: { name: data.name, image: data.image },
      });
    } else {
      // Edit Mode
      void updateGenre({
        variables: {
          id: editGenreInfo!.id,
          input: {
            name: data.name,
            image: data.image,
          },
        },
      });
    }
  }

  function onCancelEditingAndClose() {
    reset();
    onCloseDialog();
  }

  function onCloseDialog() {
    void navigate("/admin/genres");
  }

  return (
    <PopupDialog
      isOpen={isOpen}
      onClose={onCancelEditingAndClose}
      disableClose={showLoader}
      header={
        mode === "Create"
          ? "Create New Genre"
          : `Edit Genre ${editGenreInfo?.name}`
      }
    >
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-96"
      >
        {/* Name Section */}
        <FormInput
          registration={register("name", {
            required: "Required",
            maxLength: {
              value: 20,
              message: "Name must be at most 20 characters",
            },
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
            pattern: {
              value: VALID_NAME_GENERAL,
              message: VALID_NAME_GENERAL_ERROR_MSG,
            },
            validate: (name) => {
              // check duplicate name
              if (
                existingnames.some(
                  (a) => a?.toLowerCase() === name.toLowerCase()
                )
              ) {
                return "The genre name already exists.";
              }
              return true;
            },
          })}
          // TODO: validate -- not duplicate with exisiting ones (case insensitive)
          error={errors.name}
          label="Genre Name"
          additionalStyleWrapper="flex gap-2 flex-wrap"
          additionalStyleLabel="flex-1"
          additionalStyleContentWrapper="w-60"
        />

        {/* Image Section */}
        <FormSingleImage
          registration={register("image", {
            validate: {
              required: (image) => !!image.file || "Image is required.",
              fileType: (image) =>
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                typeof image.file === "string" ||
                image.file?.type.startsWith("image/") ||
                "Only image files are allowed",
              fileSize: (image) =>
                typeof image.file === "string" ||
                (image.file?.size ?? 0) < imageMaxSizeMB * 1024 * 1024 ||
                `Image must be smaller than ${imageMaxSizeMB}MB`,
            },
          })}
          label="Upload an image"
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
          uploadedImage={uploadedImage}
          additionalStyleWrapper="flex gap-2 mt-4 flex-wrap"
          additionalStyleLabel="flex-1"
          additionalStyleContentWrapper="w-60"
          error={errors.image}
        />

        {/* Submit */}
        {showLoader ? (
          <div className="flex justify-center mt-8">
            <LoadingIndicator />
          </div>
        ) : (
          <PopupDialogButtons
            onCancel={onCancelEditingAndClose}
            submitText={submitText}
            isDirty={isDirty}
          />
        )}
      </form>
    </PopupDialog>
  );
}
