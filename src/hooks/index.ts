import { useEffect, useLayoutEffect, useRef } from "react";
import {
  NavigateFunction,
  NavigateOptions,
  To,
  useNavigate,
} from "react-router-dom";

export function useResizeObserver<T extends HTMLElement>(
  callback: (target: T, entry: ResizeObserverEntry) => void
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      callback(element, entries[0]);
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [callback, ref]);

  return ref;
}

export const useViewNavigate = (): ((
  to: To | number,
  options?: NavigateOptions | undefined
) => NavigateFunction) => {
  const navigate = useNavigate();
  return (to: To | number, options?: NavigateOptions | undefined) => {
    // Navigate to the new route
    // disable type checking for startViewTransition
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!document.startViewTransition) {
      if (typeof to === "number") {
        return navigate(to);
      }
      return navigate(to, options);
    } else {
      let slideInKeyframes = [
        // keyframes
        { transform: "translateX(100%)" },
        { transform: "translateY(0)" },
      ];
      let slideOutKeyframes = [
        // keyframes
        { transform: "translateX(0)" },
        { transform: "translateX(-100%)" },
      ];
      if (typeof to === "number" && to < 0) {
        slideInKeyframes = [
          // keyframes
          { transform: "translateX(-100%)" },
          { transform: "translateY(0)" },
        ];
        slideOutKeyframes = [
          // keyframes
          { transform: "translateX(0)" },
          { transform: "translateX(100%)" },
        ];
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const transition = document.startViewTransition(() => {
        if (typeof to === "number") {
          return navigate(to);
        }
        return navigate(to, options);
      });
      transition.ready.then(() => {
        document.documentElement.animate(slideOutKeyframes, {
          duration: 500,
          easing: "linear",
          // Specify which pseudo-element to animate
          pseudoElement: "::view-transition-old(root)",
        });
        document.documentElement.animate(slideInKeyframes, {
          duration: 500,
          easing: "linear",
          // Specify which pseudo-element to animate
          pseudoElement: "::view-transition-new(root)",
        });
      });
      return transition.finish;
    }
  };
};

export function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
