import { ComponentProps } from "react";
import { Modal as _Modal } from "../components/Modal";
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
        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
        {children}
        <div className="items-center gap-2 mt-3 sm:flex">
          <button
            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
            onClick={onClose}>
            Close
          </button>
        </div>
        </_Modal>
  );
};
