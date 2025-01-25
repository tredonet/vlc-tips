import { ComponentProps } from "react";

export const Button: React.FC<ComponentProps<"button">> = ({ children, className, ...props }) => (
  <button className={`py-1 px-4 rounded-xl font-patrick cursor-pointer text-white text-2xl flex ${className}`} {...props}>
    {children}
  </button>
);
