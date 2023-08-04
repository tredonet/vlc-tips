type InputProps = {
  label?: boolean;
  field: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({ field, value, onChange, label = true }) => {
  const key = field.toLowerCase().replace(" ", "_");
  return (
    <>
      {label && (
        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
          {field}
        </label>
      )}
      <input
        type="text"
        name={key}
        id={key}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 border rounded-md h-6 leading-4"
      />
    </>
  );
};
