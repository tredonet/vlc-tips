import { ComponentProps } from "react";

export const SecondaryButton: React.FC<ComponentProps<"button">> = ({ children, onClick }) => (
  <button
    {...onClick}
    className="mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-teal-600 focus:ring-2">
    {children}
  </button>
);
