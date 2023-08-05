import { ComponentProps } from "react";

export const PrimaryButton: React.FC<ComponentProps<"button">> = ({ children, color, onClick }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-600 hover:bg-${color}-500 ext-sm font-medium  text-white mt-2 p-2.5 flex-1 rounded-md outline-none border ring-offset-2 ring-${color}-600 focus:ring-2`}>
    {children}
  </button>
);
