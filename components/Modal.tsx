import { ComponentProps } from "react";
export interface ModalProps {
  title: string;
  showModal: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ComponentProps<"div"> & ModalProps> = ({ children, title, showModal, onClose }) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={onClose}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
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
        </div>
      </div>
    </div>
  );
};
