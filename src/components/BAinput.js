import React from 'react';

export default function BAInput(props) {
  const { label, onChange, type, value } = props;
  
  return (
    <input
      className="p-3 border-2 border-teal-700 focus:border-teal-100 w-full outline-none rounded"
      placeholder={label}
      value={value}
      onChange={onChange}
      type={type || "text"}
    />
  );
}
