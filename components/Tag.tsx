export const Tag: React.FC<{ text: string, className?: string }> = ({ text, className = "" }) => (
  <div className={`bg-teal-600 px-2 rounded-md m-1 text-white ${className}`}>{text}</div>
);
