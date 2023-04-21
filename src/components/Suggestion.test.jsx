import { render, screen, fireEvent } from "@testing-library/react";
import { evalTest as _ } from "../utils/.jest";
import Suggestion from "./Suggestion";

describe("Suggestion", () => {
  it(
    "renders mainText and subText",
    _(() => {
      render(
        <Suggestion
          mainText="Main Text"
          subText="Sub Text"
          handleGoToPrediction={() => {}}
        />
      );

      expect(screen.getByText("Main Text")).toBeInTheDocument();
      expect(screen.getByText("Sub Text")).toBeInTheDocument();
    })
  );

  it(
    "calls handleGoToPrediction on arrow click",
    _(() => {
      const handleGoToPrediction = jest.fn();
      render(
        <Suggestion
          mainText="Main Text"
          handleGoToPrediction={handleGoToPrediction}
        />
      );

      fireEvent.click(screen.getByLabelText("arrow-uturn-right"));

      expect(handleGoToPrediction).toHaveBeenCalledTimes(1);
    })
  );

  it(
    "toggles heart on click",
    _(() => {
      render(
        <Suggestion mainText="Main Text" handleGoToPrediction={() => {}} />
      );

      expect(screen.getByLabelText("heart")).toHaveAttribute("fill", "none");

      fireEvent.click(screen.getByLabelText("heart"));

      expect(screen.getByLabelText("heart")).toHaveAttribute(
        "fill",
        "rgb(219 39 119)"
      );

      fireEvent.click(screen.getByLabelText("heart"));

      expect(screen.getByLabelText("heart")).toHaveAttribute("fill", "none");
    })
  );
});
