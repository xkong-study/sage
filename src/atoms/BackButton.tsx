import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

function BackButton({ className, onClick }: BackButtonProps) {
  return (
    <ChevronLeftIcon
      className={classNames(
        "h-8 w-8 border-2 rounded-full p-1 cursor-pointer hover:bg-gray-100",
        className ?? ""
      )}
      onClick={onClick}
    />
  );
}

export default BackButton;
