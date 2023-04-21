import { render, screen } from "@testing-library/react";
import Directions from "./Directions";
import { evalTest as _ } from "../utils/.jest.ts";

describe("Directions component", () => {
  test(
    "renders all input fields",
    _(() => {
      render(<Directions />);

      const fromInput = screen.getByPlaceholderText("From position");
      const toInput = screen.getByPlaceholderText("Choose destination");

      expect(fromInput).toBeInTheDocument();
      expect(toInput).toBeInTheDocument();
    })
  );

  test(
    "switches traverse direction when clicked",
    _(() => {
      render(<Directions />);

      const exchangeButton = screen.getByRole("button", {
        "aria-name": "Exchange destinations",
      });
      const fromInput = screen.getByPlaceholderText("From position");
      const toInput = screen.getByPlaceholderText("Choose destination");
      const initialFromInputValue = fromInput.value;

      exchangeButton.click();

      expect(fromInput.value).toBe(
        descriptivePredictionText(
          destinationSearchState[
            DestinationSearchStateKeys.TO_DESTINATION_PREDICTION
          ]
        )
      );
      expect(toInput.value).toBe(initialFromInputValue);
    })
  );
});
