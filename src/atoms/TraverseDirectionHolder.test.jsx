import { render } from "@testing-library/react";
import TraverseDirectionHolder from "./TraverseDirectionHolder";
import { evalTest as _ } from "../utils/.jest";

describe("TraverseDirectionHolder", () => {
  test(
    "renders forward direction",
    _(() => {
      const { getByTestId } = render(
        <TraverseDirectionHolder traverseDirection="forward" />
      );
      const traverseDirection = getByTestId("traverse-direction");
      expect(traverseDirection).toBeInTheDocument();
      expect(traverseDirection).toHaveClass("bg-blue-500");
      expect(traverseDirection.firstChild).toHaveClass("bg-red-600");
    })
  );

  test(
    "renders reverse direction",
    _(() => {
      const { getByTestId } = render(
        <TraverseDirectionHolder traverseDirection="reverse" />
      );
      const traverseDirection = getByTestId("traverse-direction");
      expect(traverseDirection).toBeInTheDocument();
      expect(traverseDirection).not.toHaveClass("bg-blue-500");
      expect(traverseDirection.firstChild).toHaveClass("bg-blue-500");
    })
  );
});
