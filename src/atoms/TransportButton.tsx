import React, { useCallback, useEffect } from "react";
import { useResizeObserver } from "../hooks";

interface TransportButtonProps {
  Icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  handleBadgePosition: (position: DOMRect) => void;
  transitButtonRef?: React.MutableRefObject<HTMLButtonElement | null>;
}

const TransportButton = ({
  Icon,
  className,
  onClick,
  handleBadgePosition,
  transitButtonRef,
}: TransportButtonProps) => {
  const onResize = useCallback((target: HTMLButtonElement) => {
    // const position = target.getBoundingClientRect();
    // handleBadgePosition(position);
  }, []);

  const buttonRef = useResizeObserver(onResize);

  useEffect(() => {
    if (buttonRef.current && transitButtonRef?.current === null) {
      transitButtonRef.current = buttonRef.current;
    }
  }, [transitButtonRef?.current, buttonRef.current]);
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
};

export default TransportButton;
