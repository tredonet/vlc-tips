import { ComponentProps } from "react";

export const Button: React.FC<ComponentProps<"div">> = ({ children, className, ...props }) => (
    <div className={`mx-4 mb-4 py-1 rounded-xl font-patrick cursor-pointer text-white text-2xl flex ${className}`} {...props}>
      {children}
  </div>
);
