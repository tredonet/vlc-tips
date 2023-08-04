import { ComponentProps } from "react";

export const Modal: React.FC<ComponentProps<"div"> & { isOpen: boolean; elevated?: number; big?: boolean }> = ({
  children,
  isOpen,
  elevated,
  big = false,
}) => {
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${elevated && `z-${elevated}`}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={`bg-white p-6 rounded shadow-xl opacity-100 z-10 ${
          big && "fixed inset-4 sm:inset-12 flex flex-col"
        }`}>
        {children}
      </div>
    </div>
  );
};
