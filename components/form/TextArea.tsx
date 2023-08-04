type TextAreaProps = {
  field: string;
  value: string;
  rows: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: React.FC<TextAreaProps> = ({ field, value, rows, onChange }) => {
  const key = field.toLowerCase().replace(" ", "_");
  return (
    <>
      <label htmlFor={key} className="block text-sm font-medium text-gray-700">
        {field}
      </label>
      <textarea
        name={key}
        required
        rows={rows}
        id={key}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 border rounded-md"
      />
    </>
  );
};
