import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { evalTest as _ } from "../utils/.jest";

describe("Navigation component", () => {
  it(
    "renders without errors",
    _(() => {
      render(<Navigation />);
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    })
  );

  it(
    "renders map element",
    _(() => {
      render(<Navigation />);
      expect(screen.getByTestId("map")).toBeInTheDocument();
    })
  );

  it(
    "renders suggestions list",
    _(async () => {
      render(<Navigation />);
      const suggestionsList = await screen.findByRole("list");
      expect(suggestionsList).toBeInTheDocument();
      expect(suggestionsList.children.length).toBeGreaterThan(0);
    })
  );
});
