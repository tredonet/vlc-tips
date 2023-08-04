import { TipKind } from "types";

type DropDownProps = {
  field: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: TipKind[];
};

export const DropDown: React.FC<DropDownProps> = ({ field, value, onChange, options }) => {
  const key = field.toLowerCase().replace(" ", "_");
  return (
    <>
      <label htmlFor={key} className="block text-sm font-medium text-gray-700">
        {field}
      </label>
      <select
        name={key}
        id={key}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="mt-1 py-2 px-1 focus:ring-teal-500 focus:teal-teal-500 block w-full sm:text-sm border-gray-300 rounded-md">
        {options.map((option: TipKind) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
