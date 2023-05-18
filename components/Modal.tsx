import { ComponentProps } from "react";
export interface ModalProps {
  title: string;
  showModal: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ComponentProps<"div"> & ModalProps> = ({ children, title, showModal, onClose }) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-xl opacity-100 z-10 ">
        <h4 className="text-lg font-medium text-gray-800">{title}</h4>
        <p className="mt-2 text-[15px] leading-relaxed text-gray-500">{children}</p>
        <div className="items-center gap-2 mt-3 sm:flex">
          <button
            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
            onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
