import React from "react";
export const Message = ({
  label,
  name,
  value,
  placeholder,
  error = "",
  onChange = () => {},
  ...rest
}) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold inline-block">{label}</label>
      <textarea
        className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rest
      ></textarea>
      {error && <span className="text-subMain italic text-xs">{error}</span>}
    </div>
  );
};

export const Select = ({
  label,
  name,
  value,
  options,
  error = "",
  onChange = () => {},
  ...rest
}) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
        onChange={onChange}
        name={name}
        value={value}
        rest
      >
        {options.map((o, i) => (
          <option key={i} value={o.value} selected={value === o.value}>
            {o.title}
          </option>
        ))}
      </select>
      {error && <span className="text-subMain italic text-xs">{error}</span>}
    </>
  );
};

export const Input = ({
  label,
  name,
  placeholder,
  type,
  bg,
  onChange = () => {},
  error = "",
  value = "",
  ...rest
}) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        rest
        className={`w-full mt-2 p-5 text-sm border border-border rounded text-white ${
          bg ? "bg-main" : "bg-dry"
        }`}
      />
      {error && <span className="text-subMain italic text-xs">{error}</span>}
    </div>
  );
};
