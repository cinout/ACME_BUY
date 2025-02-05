import { Dialog, DialogPanel } from "@headlessui/react";

export interface AdminDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  additionalStyle?: string;
  disableClose?: boolean;
  header: string;
}

export default function AdminDialog({
  children,
  isOpen,
  onClose,
  additionalStyle,
  header,
  disableClose = false,
}: AdminDialogProps) {
  function onDisableClose() {
    // do nothing
  }
  return (
    <Dialog
      open={isOpen}
      onClose={disableClose ? onDisableClose : onClose}
      className="relative z-[60]"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/65">
        <DialogPanel
          className={`max-h-full border-8 rounded-[3rem] border-sky-100 bg-sky-700 pb-8 overflow-hidden ${additionalStyle}`}
        >
          <div className="flex justify-center mb-8 py-2 font-medium text-sky-700 bg-sky-100">
            {header}
          </div>
          <div className="text-sky-100 px-8">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
