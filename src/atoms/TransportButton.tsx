import React, { useCallback } from "react";
import useResizeObserver from "../hooks";

interface TransportButtonProps {
  Icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  handleBadgePosition: (position: DOMRect) => void;
}

function TransportButton({
  Icon,
  className,
  onClick,
  handleBadgePosition,
}: TransportButtonProps) {
  const onResize = useCallback((target: HTMLButtonElement) => {
    const position = target.getBoundingClientRect();
    handleBadgePosition(position);
  }, []);

  const buttonRef = useResizeObserver(onResize);

  const handleSelection = () => {
    onClick();
    const currentPos = buttonRef.current?.getBoundingClientRect();
    if (currentPos) handleBadgePosition(currentPos);
  };

  return (
    <button ref={buttonRef} className={className} onClick={handleSelection}>
      {Icon}
    </button>
  );
}

export default TransportButton;
