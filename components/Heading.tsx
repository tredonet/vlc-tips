import { ComponentProps } from "react";

export const Heading: React.FC<ComponentProps<"div">> = ({ children, className }) => (
  <div className={`${className} text-slate-200 text-lg font-mono`}>{children}</div>
);
