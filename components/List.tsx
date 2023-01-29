import { ComponentProps } from "react";

export const List: React.FC<ComponentProps<"div"> & { title: string; open: boolean; onClick: any }> = ({
  children,
  title,
  open,
  onClick,
}) => {
  return (
    <ul className="bg-gray-600 rounded-3xl text-gray-900">
      <li onClick={onClick}>{title}</li>
      {open && children}
    </ul>
  );
};

export const ListItem: React.FC<{
  title: string;
  description: any;
  open: boolean;
  onClick: any;
}> = ({ title, description, open, onClick }) => {
  return (
    <>
      <li className={`py-1 cursor-pointer`} onClick={onClick}>
        {title}
      </li>
      {open && description}
    </>
  );
};
