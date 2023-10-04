import React from 'react';

export default function BAButton(props) {
  const { label, onClick } = props;
  
  return (
    <button
      onClick={onClick}
      className="Signupbutton"
    >
      {label}
    </button>
  );
}