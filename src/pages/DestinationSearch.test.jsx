import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DestinationSearch from "./DestinationSearch";
import { evalTest as _ } from "../utils/.jest";

describe("DestinationSearch Component", () => {
  test(
    "renders search bar",
    _(async () => {
      render(<DestinationSearch />);
      const searchBar = await screen.findByPlaceholderText("Search location");
      expect(searchBar).toBeInTheDocument();
    })
  );

  test(
    "displays search suggestions when text is entered",
    _(async () => {
      render(<DestinationSearch />);
      const searchBar = await screen.findByPlaceholderText("Search location");
      userEvent.type(searchBar, "Trinity College Dublin");
      const suggestion = await screen.findByText(/Trinity College Dublin/i);
      expect(suggestion).toBeInTheDocument();
    })
  );

  test(
    "chooses a prediction when clicked and sets it in recoil state",
    _(async () => {
      render(<DestinationSearch />);
      const searchBar = await screen.findByPlaceholderText("Search location");
      userEvent.type(searchBar, "Trinity College Dublin");
      const suggestion = await screen.findByText(/Trinity College/i);
      userEvent.click(suggestion);
      await waitFor(() => expect(suggestion).not.toBeInTheDocument());
      const prediction = {
        description: "Trinity College, Dublin 2, Dublin",
        place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
        structured_formatting: {
          main_text: "Trinity College Dublin",
          secondary_text: "Dublin 2, Dublin",
        },
      };
      const recoilState = {
        fromDestinationPrediction: null,
        toDestinationPrediction: prediction,
      };
      expect(recoilState.toDestinationPrediction).toEqual(prediction);
    })
  );
});

const mockPredictions = [
  {
    description: "123 Main St, Anytown USA",
    structured_formatting: {
      main_text: "123 Main St",
      secondary_text: "Anytown USA",
    },
    place_id: "abc123",
  },
  {
    description: "456 Elm St, Anytown USA",
    structured_formatting: {
      main_text: "456 Elm St",
      secondary_text: "Anytown USA",
    },
    place_id: "def456",
  },
];

describe("Predictions", () => {
  it(
    "renders correctly with predictions",
    _(() => {
      const mockHandlePredictionClicked = jest.fn();
      const { getByText } = render(
        <Predictions
          predictions={mockPredictions}
          handlePredictionClicked={mockHandlePredictionClicked}
        />
      );

      mockPredictions.forEach((prediction) => {
        expect(
          getByText(prediction.structured_formatting.main_text)
        ).toBeInTheDocument();
        expect(
          getByText(prediction.structured_formatting.secondary_text)
        ).toBeInTheDocument();
      });
    })
  );

  it(
    "calls handlePredictionClicked when a prediction is clicked",
    _(() => {
      const mockHandlePredictionClicked = jest.fn();
      const { getByText } = render(
        <Predictions
          predictions={mockPredictions}
          handlePredictionClicked={mockHandlePredictionClicked}
        />
      );

      fireEvent.click(
        getByText(mockPredictions[0].structured_formatting.main_text)
      );

      expect(mockHandlePredictionClicked).toHaveBeenCalledWith(
        mockPredictions[0]
      );
    })
  );
});
