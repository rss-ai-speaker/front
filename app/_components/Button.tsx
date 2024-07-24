"use client";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const Button = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
      disabled={pending}
    >
      {children}
    </button>
  );
};

export default Button;
