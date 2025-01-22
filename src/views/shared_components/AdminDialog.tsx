import { Dialog, DialogPanel } from "@headlessui/react";

export interface AdminDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  additionalStyle?: string;
}

export default function AdminDialog({
  children,
  isOpen,
  onClose,
  additionalStyle,
}: AdminDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[60]">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/65">
        <DialogPanel
          className={`space-y-4 border-8 rounded-[3rem] border-sky-100 bg-sky-700 p-10 text-sky-100 ${additionalStyle}`}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
