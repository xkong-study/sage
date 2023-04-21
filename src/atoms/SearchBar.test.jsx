import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { evalTest as _ } from "../utils/.jest";

describe("SearchBar", () => {
  it(
    "renders the search input and placeholder text",
    _(() => {
      render(<SearchBar placeholder="Search for something" />);
      const input = screen.getByPlaceholderText("Search for something");
      expect(input).toBeInTheDocument();
    })
  );

  it(
    "invokes onSearchChange with the search value when the search input value changes",
    _(() => {
      const onSearchChangeMock = jest.fn();
      render(<SearchBar onSearchChange={onSearchChangeMock} />);
      const input = screen.getByPlaceholderText("Search");
      fireEvent.change(input, { target: { value: "test" } });
      expect(onSearchChangeMock).toHaveBeenCalledWith("test");
    })
  );

  it(
    "clears the search input when the X button is clicked",
    _(() => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText("Search");
      fireEvent.change(input, { target: { value: "test" } });
      const clearButton = screen.getByRole("button", { name: /Clear search/i });
      fireEvent.click(clearButton);
      expect(input).toHaveValue("");
    })
  );

  it(
    "renders the magnifying glass icon when the search input is empty",
    _(() => {
      render(<SearchBar />);
      const magnifyingGlassIcon = screen.getByRole("img", {
        name: /search icon/i,
      });
      expect(magnifyingGlassIcon).toBeInTheDocument();
    })
  );

  it(
    "renders the X mark icon when the search input has text",
    _(() => {
      render(<SearchBar />);
      const input = screen.getByPlaceholderText("Search");
      fireEvent.change(input, { target: { value: "test" } });
      const xMarkIcon = screen.getByRole("img", { name: /clear search/i });
      expect(xMarkIcon).toBeInTheDocument();
    })
  );
});
