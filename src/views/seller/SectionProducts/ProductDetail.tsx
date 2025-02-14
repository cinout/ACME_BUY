import { imageMaxSizeMB, yearOptions } from "@/utils/numbers";
import {
  VALID_NAME_GENERAL,
  VALID_NAME_GENERAL_ERROR_MSG,
} from "@/utils/strings";
import FormInput from "@/views/shared_components/form/FormInput";
import FormMultipleImages from "@/views/shared_components/form/FormMultiImages";
import FormSelect from "@/views/shared_components/form/FormSelect";
import FormTextarea from "@/views/shared_components/form/FormTextarea";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { v7 } from "uuid";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { styleCancelButton, styleSubmitButton } from "@/utils/styles";
import { GenreEntity, ProductEntity } from "@/utils/entities";
import { useMutation, useQuery } from "@apollo/client";
import { GQL_GENRES_GET_ALL } from "@/graphql/genreGql";
import LoadingIndicatorWithDiv from "@/views/shared_components/LoadingIndicatorWithDiv";
import {
  GQL_PRODUCT_CREATE,
  GQL_PRODUCT_GET_ALL_BY_SELLER,
  GQL_PRODUCT_UPDATE,
} from "@/graphql/productGql";
import LoadingIndicator from "@/views/shared_components/LoadingIndicator";
import { getErrorMessage } from "@/graphql";
import toast from "react-hot-toast";
import { GradingEnum, MediaFormatEnum, ReleaseRegionEnum } from "@/utils/enums";

interface FormInputProps {
  id: string;
  name: string;
  artist: string;
  genreId: string;
  stock: number;
  price: number;
  discount: number;
  description: string;
  images: { id: string; file: File | string; name: string }[];
  year: number;
  format: MediaFormatEnum;
  grading: GradingEnum;
  region: ReleaseRegionEnum;
}

interface ProductDetailProps {
  productId: string;
  productStats: ProductEntity[]; // TODO: pass in the product directly
}

export default function ProductDetail({
  productId,
  productStats,
}: ProductDetailProps) {
  /**
   *  State
   */
  const [editMode, setEditMode] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /**
   *  Routes
   */
  const navigate = useNavigate();

  /**
   *  RHF
   */
  const isCreatingNewProduct = productId === "new";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
    setValue,
  } = useForm<FormInputProps>({
    defaultValues: isCreatingNewProduct
      ? {
          discount: 0,
          images: [],
        }
      : productStats.find((a) => a.id === productId),
  });
  const uploadedImages = watch("images");
  const discount = watch("discount");
  const price = watch("price");

  /**
   *  GQL
   */

  const [createProduct] = useMutation(GQL_PRODUCT_CREATE, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    update(cache, { data }) {
      cache.updateQuery(
        {
          query: GQL_PRODUCT_GET_ALL_BY_SELLER,
        },
        ({ getAllProductsBySeller }) => {
          return {
            getAllProductsBySeller: (
              getAllProductsBySeller as ProductEntity[]
            ).concat((data as { createProduct: ProductEntity }).createProduct),
          };
        }
      );
    },
    onCompleted: () => {
      setShowLoader(false);
      closeAndLeave();
    },
  });

  const [updateProduct] = useMutation(GQL_PRODUCT_UPDATE, {
    onError: (err) => {
      setShowLoader(false);
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    },
    onCompleted: () => {
      setShowLoader(false);
      closeAndLeave();
    },
  });

  const gql_query_result = useQuery(GQL_GENRES_GET_ALL); // get genres
  if (gql_query_result.loading) {
    return <LoadingIndicatorWithDiv />;
  }
  const allGenres = gql_query_result.data.getAllGenres as GenreEntity[];
  const genreOptions = allGenres
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((a) => ({
      id: a.id,
      value: a.id,
      display: a.name,
    }));

  /**
   * Computed
   */
  const isDisabled = !isCreatingNewProduct && !editMode;

  /**
   *  Functions
   */
  function onSubmit(data: FormInputProps): void {
    setShowLoader(true);
    if (editMode) {
      void updateProduct({
        variables: {
          id: data.id,
          input: {
            name: data.name,
            artist: data.artist,
            price: data.price,
            discount: data.discount,
            description: data.description,
            genreId: data.genreId,
            stock: data.stock,
            images: data.images,
            year: data.year,
            format: data.format,
            grading: data.grading,
            region: data.region,
          },
        },
      });
    } else {
      void createProduct({
        variables: {
          name: data.name,
          artist: data.artist,
          images: data.images,
          genreId: data.genreId,
          stock: data.stock,
          price: data.price,
          discount: data.discount,
          description: data.description,
          year: parseInt(data.year as unknown as string, 10),
          format: data.format,
          grading: data.grading,
          region: data.region,
        },
      });
    }
  }

  // TODO: there is an error when add two same files consecutively
  function handleAddImages(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const images = Array.from(e.target.files).map((item) => ({
        id: v7(),
        file: item,
        name: item.name,
      }));

      setValue("images", uploadedImages.concat(images), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }

  function handleRemoveImage(removeId: string) {
    if (uploadedImages) {
      setValue(
        "images",
        uploadedImages.filter((item) => item.id !== removeId),
        { shouldValidate: true, shouldDirty: true }
      );
    }
  }

  function handleToggleEditButton() {
    if (editMode) {
      reset(); // reset values to initial state
    }
    setEditMode((v) => !v);
  }

  function closeAndLeave() {
    void navigate("/seller/products");
  }

  return (
    <>
      {/* TODO: pop up confirming if user needs to leave */}
      <div className="flex gap-x-8 items-center mb-8">
        <button
          type="button" // to prevent trigger form submission if PopupDialogButtons is wrapped in <form> tag
          className="cursor-pointer text-2xl text-sky-800 bg-sky-50 p-1 rounded-full border-2 border-sky-100 not-disabled:hover:bg-sky-200 not-disabled:hover:scale-105 disabled:cursor-not-allowed disabled:bg-slate-300 transition shadow-2xl"
          onClick={closeAndLeave}
          disabled={showLoader}
        >
          <IoArrowBackCircle />
        </button>

        {productId !== "new" && (
          <button
            type="button"
            className={editMode ? styleCancelButton : styleSubmitButton}
            onClick={handleToggleEditButton}
            disabled={showLoader}
          >
            {editMode ? "Cancel Editing" : "Edit"}
          </button>
        )}
      </div>

      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          registration={register("name", {
            required: "Required",
            pattern: {
              value: VALID_NAME_GENERAL,
              message: VALID_NAME_GENERAL_ERROR_MSG,
            },
            maxLength: {
              value: 100,
              message: "Must be at most 100 characters",
            },
            minLength: {
              value: 2,
              message: "Must be at least 2 characters",
            },
          })}
          label="Record Title"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.name}
          placeholder="Title"
          disabled={isDisabled}
          currentValue={watch("name")}
        />

        <FormInput
          registration={register("artist", {
            required: "Required",
            maxLength: {
              value: 50,
              message: "Must be at most 50 characters",
            },
            minLength: {
              value: 1,
              message: "Must be at least 1 character",
            },
          })}
          label="Artist"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.artist}
          placeholder="Artist"
          disabled={isDisabled}
          currentValue={watch("artist")}
        />

        <FormSelect
          registration={register("genreId", {
            required: "Required",
          })}
          label="Genre"
          options={genreOptions}
          additionalStyleSelect="w-full sm:w-60 lg:w-80"
          error={errors.genreId}
          disabled={isDisabled}
          currentValue={watch("genreId")}
        />

        <FormSelect
          registration={register("year", {
            required: "Required",
          })}
          label="Release Year"
          options={yearOptions}
          additionalStyleSelect="w-full sm:w-60 lg:w-80"
          error={errors.year}
          disabled={isDisabled}
          currentValue={watch("year")}
        />

        <FormSelect
          registration={register("region", {
            required: "Required",
          })}
          label="Release Region"
          options={Object.values(ReleaseRegionEnum).map((a) => ({
            id: a,
            value: a,
            display: a,
          }))}
          additionalStyleSelect="w-full sm:w-60 lg:w-80"
          error={errors.region}
          disabled={isDisabled}
          currentValue={watch("region")}
        />

        <FormSelect
          registration={register("format", {
            required: "Required",
          })}
          label="Media Format"
          options={Object.values(MediaFormatEnum).map((a) => ({
            id: a,
            value: a,
            display: a,
          }))}
          additionalStyleSelect="w-full sm:w-60 lg:w-80"
          error={errors.format}
          disabled={isDisabled}
          currentValue={watch("format")}
        />

        <FormSelect
          registration={register("grading", {
            required: "Required",
          })}
          label="Product Grading"
          options={Object.values(GradingEnum).map((a) => ({
            id: a,
            value: a,
            display: a,
          }))}
          additionalStyleSelect="w-full sm:w-60 lg:w-80"
          error={errors.grading}
          disabled={isDisabled}
          currentValue={watch("grading")}
        />

        <FormInput
          registration={register("stock", {
            required: "Required",
            valueAsNumber: true, // Converts the value to a number when the form is submitted
            min: { value: 0, message: "Please provide a legit quantity (>=0)" },
          })}
          label="Stock Quantity"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.stock}
          type="number"
          min={0}
          placeholder="Stock Quantity"
          disabled={isDisabled}
          currentValue={watch("stock")}
        />

        <FormInput
          registration={register("price", {
            required: "Required",
            valueAsNumber: true,
            min: { value: 0, message: "Please provide a legit price (>=0)" },
          })}
          label="Price (AUD)"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.price}
          type="number"
          min={0}
          step={0.01}
          placeholder="Price"
          disabled={isDisabled}
          currentValue={watch("price")}
        />

        <div>
          <FormInput
            registration={register("discount", {
              required: "Please set a discount (default: 0, no discount)",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Please provide a legit discount (>=0)",
              },
            })}
            label="Discount (% off)"
            additionalStyleInput="w-full sm:w-60 lg:w-80"
            error={errors.discount}
            type="number"
            min={0}
            max={100}
            step={0.1}
            disabled={isDisabled}
            currentValue={watch("discount")}
          />
          {price >= 0 && discount >= 0 && (
            <div className="text-sm italic">
              discounted price is AUD{" "}
              {((price * (100 - discount)) / 100).toFixed(2)}
            </div>
          )}
        </div>

        <FormTextarea
          registration={register("description", {
            maxLength: {
              value: 800,
              message: "Must be at most 800 characters",
            },
          })}
          label="Product Description"
          additionalStyleInput="w-full max-w-[90rem]"
          error={errors.description}
          placeholder="Product Description"
          additionalStyleWrapper="col-span-1 sm:col-span-2 lg:col-span-3"
          disabled={isDisabled}
          currentValue={watch("description")}
        />

        <FormMultipleImages
          registration={register("images", {
            required: "Please upload at least one image",
            validate: {
              isImage: (images) => {
                const filesWithError: string[] = [];
                images.forEach(({ file }) => {
                  if (file instanceof File && !file.type.startsWith("image/")) {
                    filesWithError.push(file.name);
                  }
                });
                return (
                  filesWithError.length === 0 ||
                  `Only images are supported. These files are not images: ${filesWithError
                    .map((a) => `"${a}"`)
                    .join(", ")}.`
                );
              },
              isLessThan2MB: (images) => {
                const filesWithError: string[] = [];
                images.forEach(({ file }) => {
                  if (
                    file instanceof File &&
                    file.size > imageMaxSizeMB * 1024 * 1024
                  ) {
                    filesWithError.push(file.name);
                  }
                });
                return (
                  filesWithError.length === 0 ||
                  `These files exceed the ${imageMaxSizeMB}MB file size limit: ${filesWithError
                    .map((a) => `"${a}"`)
                    .join(", ")}.`
                );
              },
              maxImageCount: (images) => {
                return (
                  images?.length <= 10 ||
                  "You can upload maxium 10 images for the product."
                );
              },
            },
          })}
          label="Product Images"
          errorMessage={errors.images?.message}
          uploadedImages={uploadedImages}
          additionalStyleWrapper="col-span-1 sm:col-span-2 lg:col-span-3 justify-self-start"
          handleAddImages={handleAddImages}
          handleRemoveImage={handleRemoveImage}
          disabled={isDisabled}
        />

        {(isCreatingNewProduct || editMode) && (
          <button
            type="submit"
            className={`mt-8 ${styleSubmitButton}`}
            disabled={showLoader || !isDirty}
          >
            {showLoader ? (
              <LoadingIndicator />
            ) : editMode ? (
              "Update Product" // TODO: disable if not dirty
            ) : (
              "Add Product"
            )}
          </button>
        )}
      </form>
    </>
  );
}
