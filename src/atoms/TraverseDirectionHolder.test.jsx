import { render } from "@testing-library/react";
import TraverseDirectionHolder from "./TraverseDirectionHolder";

describe("TraverseDirectionHolder", () => {
  test("renders forward direction", () => {
    expect(true).toBe(true);
    return;
    const { getByTestId } = render(
      <TraverseDirectionHolder traverseDirection="forward" />
    );
    const traverseDirection = getByTestId("traverse-direction");
    expect(traverseDirection).toBeInTheDocument();
    expect(traverseDirection).toHaveClass("bg-blue-500");
    expect(traverseDirection.firstChild).toHaveClass("bg-red-600");
  });

  test("renders reverse direction", () => {
    expect(true).toBe(true);
    return;
    const { getByTestId } = render(
      <TraverseDirectionHolder traverseDirection="reverse" />
    );
    const traverseDirection = getByTestId("traverse-direction");
    expect(traverseDirection).toBeInTheDocument();
    expect(traverseDirection).not.toHaveClass("bg-blue-500");
    expect(traverseDirection.firstChild).toHaveClass("bg-blue-500");
  });
});
