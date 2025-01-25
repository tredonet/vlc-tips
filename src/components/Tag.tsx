type TagType = {
  text: string;
  className?: string;
  onClick?: () => void;
  highlighted?: boolean;
};

export const Tag = ({ text, className = "", onClick, highlighted = false }: TagType) => (
  <div
    onClick={onClick}
    className={`
  ${onClick && "cursor-pointer hover:bg-teal-800"} 
  ${highlighted ? "bg-teal-800" : "bg-teal-600"}
  px-2 rounded-md m-1 text-white 
  ${className}
  `}
  >
    {text}
  </div>
);
