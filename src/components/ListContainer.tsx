import React from "react";

interface ListContainerProps {
  children: React.ReactNode[];
}

export default function ListContainer({ children }: ListContainerProps) {
  return (
    // <div className="overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" className="divide-y divide-gray-200">
      {children.map((child, index) => (
        <li key={index} className="px-4 py-4 sm:px-6">
          {child}
        </li>
      ))}
    </ul>
    // </div>
  );
}
