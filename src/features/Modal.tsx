import { ComponentProps } from "react";
import { Modal as _Modal } from "@/components";
export interface ModalProps {
  title: string;
  showModal: boolean;
  onClose: () => void;
  big?: boolean;
}

export const Modal: React.FC<ComponentProps<"div"> & ModalProps> = ({ children, title, showModal, onClose, big = false }) => {
  if (!showModal) return null;
  return (
    <_Modal isOpen={showModal} elevated={10} big={big}>
      <div className="flex justify-between">
        <span className="text-lg font-medium text-gray-800">{title}</span>
        <i className="text-red-500 px-2 py-1  hover:bg-slate-100 cursor-pointer" onClick={onClose}>
          X
        </i>
      </div>
      {children}
    </_Modal>
  );
};
