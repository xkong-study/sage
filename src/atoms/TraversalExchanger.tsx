import { ArrowsUpDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import { classNames } from "../utils";

interface TraversalExchangerProps {
  className?: string;
  onClick: () => void;
}

function TraversalExchanger({ className, onClick }: TraversalExchangerProps) {
  return (
    <ArrowsUpDownIcon
      className={classNames("h-6 w-6", className ?? "")}
      onClick={onClick}
    />
  );
}

export default TraversalExchanger;
