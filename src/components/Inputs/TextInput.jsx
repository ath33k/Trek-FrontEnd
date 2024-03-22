/* eslint-disable react/prop-types */
export default function TextInput({
  onChange = () => {},
  label,
  placeholder,
  required = true,
  type = "text",
  id = Math.random().toString(36).substring(7),
  ...props
}) {
  return (
    <div className=" w-full">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={label.toLowerCase().split(" ").join("-")}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required={required}
        {...props}
        onChange={onChange}
      />
    </div>
  );
}
