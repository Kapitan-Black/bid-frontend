import { useCallback, useRef } from "react";

const useLongPress = (
  onLongPress: () => void,
  onClick: () => void,
  { delay = 300 } = {}
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const targetRef = useRef<EventTarget | null>(null);

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      targetRef.current = event.target;
      timeoutRef.current = setTimeout(() => {
        onLongPress();
      }, delay);
    },
    [onLongPress, delay]
  );

  const clear = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);

      // Ensure the click toggles the accordion only if clicking on the AccordionTrigger
      if (
        event.target === targetRef.current &&
        targetRef.current instanceof HTMLElement &&
        targetRef.current.closest(".accordion-trigger")
      ) {
        onClick();
      }
    },
    [onClick]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
    onMouseLeave: () => timeoutRef.current && clearTimeout(timeoutRef.current),
    onTouchMove: () => timeoutRef.current && clearTimeout(timeoutRef.current),
  };
};

export default useLongPress;
