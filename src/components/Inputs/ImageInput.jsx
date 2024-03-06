/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
export default function ImageInput({
  onChange = () => {},
  onImageChange = () => {},
  placeholder = "Click here to upload",
  description = "PNG, JPG",
  required = true,
  id = Math.random().toString(36).substring(7),
  ...props
}) {
  const [images, setImages] = useState([]);

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full py-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <AiOutlineCloudUpload className="w-12 h-12 text-gray-400 dark:text-gray-300" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">{placeholder}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <input
          {...props}
          id={id}
          name={id}
          type="file"
          accept="image/*"
          className="hidden"
          required={required}
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files);
            setImages(files);
            onChange(e);
            onImageChange(files);
          }}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap justify-center w-full">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md border-red-500 border-2 border-dashed"
              />
            ))}
          </div>
        )}
      </label>
    </div>
  );
}
