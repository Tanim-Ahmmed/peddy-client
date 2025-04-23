import React from "react";

const Button = ({ name, children }) => {
  return ( 
    <button className="group relative h-12 overflow-hidden rounded-md bg-primary px-6 md:px-8 md:py-2 text-neutral-50 flex justify-between items-center gap-2 hover:cursor-pointer">
    <span className="relative text-[14px] md:text-base z-10">{name}</span>
    <span className="absolute inset-0 overflow-hidden rounded-md">
      <span className="absolute left-[-100%] top-0 w-full h-full bg-indigo-500 transition-all duration-500 ease-in-out group-hover:left-0 group-hover:scale-150"></span>
    </span>
    {children}
  </button>
  );
};

export default Button;
