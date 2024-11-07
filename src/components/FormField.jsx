// FormField.js
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormField = ({ name, label, validationSchema, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: validationSchema.safeParse("").success
            ? undefined
            : "This field is required",
        }}
        render={({ field }) => (
          <input
            {...field}
            {...props}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors[name] ? "border-red-500" : ""
            }`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FormField;
