import { imageMaxSizeMB } from "@/utils/numbers";
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
import { ProductEntity } from "@/utils/entities";

interface FormInputProps {
  id: string;
  name: string;
  brand: string;
  category: string;
  stock: number;
  price: number;
  discount: number;
  description: string;
  images: { id: string; file: File }[];
}

interface ProductDetailProps {
  productId: string;
  productStats: ProductEntity[];
}

// TODO: use real data
const categoryOptions = [
  { id: "computer", value: "computer", display: "Computer" },
  { id: "home", value: "home", display: "Home" },
  { id: "outdoor", value: "outdoor", display: "Outdoor" },
];

export default function ProductDetail({
  productId,
  productStats,
}: ProductDetailProps) {
  const [editMode, setEditMode] = useState(false);
  const isCreatingNewProduct = productId === "new";

  let defaulValues = {
    discount: 0,
    images: [],
  };

  if (!isCreatingNewProduct) {
    const product = productStats.find((a) => a.id === productId);
    if (product) {
      const { images, ...rest } = product;
      defaulValues = { ...rest, images: [] }; // TODO: add image back
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormInputProps>({ defaultValues: defaulValues });

  const navigate = useNavigate();

  const uploadedImages = watch("images");
  const discount = watch("discount");
  const price = watch("price");

  function onSubmit(data: FormInputProps): void {
    // TODO: create an entry in the backend, and also udpate in the frontend
    console.log(data);
    closeAndLeave();
  }

  function closeAndLeave() {
    // TODO: if in editing mode, we need to be careful, and return values to initial state
    reset();
    void navigate(-1);
  }

  // TODO: there is an error when add two same files consecutively
  function handleAddImages(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const images = Array.from(e.target.files).map((item) => ({
        id: v7(),
        file: item,
      }));

      setValue("images", uploadedImages.concat(images), {
        shouldValidate: true,
      });
    }
  }

  // console.log(errors.images);

  function handleRemoveImage(removeId: string) {
    // const dataTransfer = new DataTransfer();

    if (uploadedImages) {
      setValue(
        "images",
        uploadedImages.filter((item) => item.id !== removeId),
        { shouldValidate: true }
      );
    }
  }

  function handleToggleEditButton() {
    if (editMode) {
      // TODO: reset values to initial state
    }
    setEditMode((v) => !v);
  }

  return (
    <>
      {/* TODO: pop up confirming if user needs to leave */}
      <div className="flex gap-x-8 items-center mb-8">
        <button
          type="button" // to prevent trigger form submission if AdminDialogButtons is wrapped in <form> tag
          className="cursor-pointer text-2xl text-sky-800 bg-sky-50 p-1 rounded-full border-2 border-sky-100 hover:bg-sky-200 hover:scale-110 transition shadow-2xl"
          onClick={closeAndLeave}
        >
          <IoArrowBackCircle />
        </button>

        {productId !== "new" && (
          <button
            type="button"
            className={editMode ? styleCancelButton : styleSubmitButton}
            onClick={handleToggleEditButton}
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
            required: "Please provide the product name",
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
          label="Product Name"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.name}
          placeholder="Product Name"
          disabled={!isCreatingNewProduct && !editMode}
          currentValue={watch("name")}
        />

        <FormInput
          registration={register("brand", {
            required: "Please provide the brand name",
            maxLength: {
              value: 40,
              message: "Must be at most 40 characters",
            },
            minLength: {
              value: 2,
              message: "Must be at least 2 characters",
            },
          })}
          label="Brand Name"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.brand}
          placeholder="Brand Name"
          disabled={!isCreatingNewProduct && !editMode}
          currentValue={watch("brand")}
        />

        <FormSelect
          registration={register("category", {
            required: "Plase choose a category",
          })}
          label="Category"
          // additionalStyleInput="w-full sm:w-60 lg:w-80"
          options={categoryOptions}
          additionalStyleSelect="w-full sm:w-60 lg:w-80"
          error={errors.category}
          disabled={!isCreatingNewProduct && !editMode}
          currentValue={watch("category")}
        />

        <FormInput
          registration={register("stock", {
            required: "Please provide the stock quantity",
            valueAsNumber: true, // Converts the value to a number when the form is submitted
            min: { value: 0, message: "Please provide a legit quantity (>=0)" },
          })}
          label="Stock Quantity"
          additionalStyleInput="w-full sm:w-60 lg:w-80"
          error={errors.stock}
          type="number"
          min={0}
          placeholder="Stock Quantity"
          disabled={!isCreatingNewProduct && !editMode}
          currentValue={watch("stock")}
        />

        <FormInput
          registration={register("price", {
            required: "Please set the price",
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
          disabled={!isCreatingNewProduct && !editMode}
          currentValue={watch("price")}
        />

        <div>
          <FormInput
            registration={register("discount", {
              required: "Please set the discount",
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
            disabled={!isCreatingNewProduct && !editMode}
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
              value: 500,
              message: "Must be at most 500 characters",
            },
          })}
          label="Product Description"
          additionalStyleInput="w-full max-w-[90rem]"
          error={errors.description}
          placeholder="Product Description"
          additionalStyleWrapper="col-span-1 sm:col-span-2 lg:col-span-3"
          disabled={!isCreatingNewProduct && !editMode}
          currentValue={watch("description")}
        />

        <FormMultipleImages
          registration={register("images", {
            required: "Please upload at least one image",
            validate: {
              isImage: (images) => {
                const filesWithError: string[] = [];
                images.forEach(({ file }) => {
                  if (!file.type.startsWith("image/")) {
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
                  if (file.size > imageMaxSizeMB * 1024 * 1024) {
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
            },
          })}
          label="Product Images"
          errorMessage={errors.images?.message}
          uploadedImages={uploadedImages}
          additionalStyleWrapper="col-span-1 sm:col-span-2 lg:col-span-3 justify-self-start"
          handleAddImages={handleAddImages}
          handleRemoveImage={handleRemoveImage}
          disabled={!isCreatingNewProduct && !editMode}
        />

        {(isCreatingNewProduct || editMode) && (
          <button type="submit" className={`mt-8 ${styleSubmitButton}`}>
            {editMode ? "Update Product" : "Add Product"}
          </button>
        )}
      </form>
    </>
  );
}
