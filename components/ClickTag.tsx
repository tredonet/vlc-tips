export const ClickTag: React.FC<{ text: string; onClick: () => any; highlighted: boolean }> = ({
  text,
  onClick,
  highlighted,
}) => (
  <div className={`${highlighted ? "bg-teal-800" : "bg-teal-600"} px-2 rounded-md m-1 text-white cursor-pointer`} onClick={onClick}>
    {text}
  </div>
);
