import { ComponentProps } from "react";

type TipsTitleProps = {
  icon: any;
};

export const TipsTitle: React.FC<ComponentProps<"div"> & TipsTitleProps> = ({ children, icon, ...props }) => (
  <div className="bg-slate-200 mx-4 mb-4 py-1 px-4 sm:px-8 rounded-xl font-patrick text-xl cursor-pointer" {...props}>
    <div className="flex gap-4">
      <img src={icon.src} />
      {children}
    </div>
  </div>
);

export const TipsListContainer: React.FC<ComponentProps<"ul">> = ({ children, className, ...props }) => (
  <ul className={`mx-4 mb-8 bg-neutral-600 rounded-xl text-xl ${className}`} {...props}>
    {children}
  </ul>
);

export const TipsListItem: React.FC<ComponentProps<"li">> = ({ children, className, ...props }) => (
  <li className={`font-patrick text-white pt-1 px-4 ${className}`} {...props}>
    {children}
  </li>
);
