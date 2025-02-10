import React from "react";

type ButtonProps = {
  onClick?: () => void | Promise<void>;
  text: string;
  disabled?: boolean;
  additionalClass?: string;
};

export const Button = ({ text, onClick, disabled, additionalClass = '' }: ButtonProps) => {
  return (
    <button
      className={`p-3 m-3 drop-shadow-md rounded-md text-base ${additionalClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};