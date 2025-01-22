import AdminDialog from "@/views/shared_components/AdminDialog";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";

interface NewCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewCategoryDialog({
  isOpen,
  setIsOpen,
}: NewCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("");
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    // TODO: also need to warn user if they upload non-image type file
    if (files?.[0]) {
      const file = files[0];
      setFile(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      // TODO: alter user that file needs to be uploaded
    }

    // TODO: create an entry in the backedn, and also udpate in the frontend
    onCloseDialog();
  }

  function onCloseDialog() {
    setCategoryName("");
    setFile(undefined);
    setIsOpen(false);
  }

  return (
    <AdminDialog isOpen={isOpen} onClose={onCloseDialog}>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="name" className="mr-4 font-semibold w-1/2">
            New Category Name:
          </label>
          <input
            type="text"
            id="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-sky-100 text-sky-700 px-2 w-44 rounded-md"
            autoComplete="on"
            required
          />
        </div>

        {/* Image */}
        {/* TODO: verify the uploaded file type, must be legit image type */}
        <div className="flex items-center mt-4">
          <label htmlFor="image" className="font-semibold w-1/2">
            Upload an image:
          </label>

          <input
            type="file"
            name="image"
            id="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col justify-center items-center">
            <div
              className="flex justify-center items-center w-28 h-28 bg-sky-100 rounded-2xl text-sky-700 cursor-pointer"
              onClick={handleClick}
            >
              {file?.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-[inherit] h-[inherit] rounded-[inherit]"
                />
              ) : (
                <FaImage className="text-2xl" />
              )}
            </div>
            <div className="text-sm w-44">{file?.name}</div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-between mt-10 items-center">
          <div
            className="cursor-pointer bg-sky-900 px-3 py-1 rounded-full border-2  border-sky-100 hover:bg-sky-800 transition"
            onClick={onCloseDialog}
          >
            Cancel
          </div>

          <button
            type="submit"
            className="bg-aqua-forest-600 px-3 py-1 rounded-full border-2  border-sky-100 hover:bg-aqua-forest-500 transition"
          >
            Create
          </button>
        </div>
      </form>
    </AdminDialog>
  );
}
