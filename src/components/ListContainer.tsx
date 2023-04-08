import React from "react";
import Suggestion from "./Suggestion";

interface ListContainerProps {
  children: React.ReactNode;
}

export default function ListContainer({ children }: ListContainerProps) {
  const position = [
    "Flower CBD",
    "Hamilton Building",
    "KFC",
    "Xian Noodle",
    "Bar",
  ];
  const suggestions = position.map((item) => {
    return (
      <li key={item} className="px-4 py-4 sm:px-6">
        <Suggestion props={item} key={item} />
      </li>
    );
  });

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {suggestions}
    </ul>
  );
}
