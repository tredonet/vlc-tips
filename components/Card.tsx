import { ComponentProps } from "react";

export const Card: React.FC<ComponentProps<"div"> & { title: string }> = ({ children, className, title }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    <div className="p-4">
      <h2 className="text-gray-900 font-bold text-xl mb-2">{title}</h2>
      <div className="border-t border-gray-200 pt-2">
        <p className="text-gray-700 text-base">{children}</p>
      </div>
    </div>
  </div>
);
