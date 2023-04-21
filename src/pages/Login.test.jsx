import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { evalTest as _ } from "../utils/.jest";

describe("Login component", () => {
  it(
    "renders without errors",
    _(() => {
      render(<Login />);
      expect(screen.getByRole("heading", { name: "SAGE" })).toBeInTheDocument();
    })
  );

  it(
    "updates the email input when the user types",
    _(() => {
      render(<Login />);
      const emailInput = screen.getByPlaceholderText("Email address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");
    })
  );

  it(
    "updates the password input when the user types",
    _(() => {
      render(<Login />);
      const passwordInput = screen.getByPlaceholderText("Password");
      fireEvent.change(passwordInput, { target: { value: "test123" } });
      expect(passwordInput.value).toBe("test123");
    })
  );

  it(
    "calls the submit function when the form is submitted",
    _(() => {
      const handleSubmit = jest.fn();
      render(<Login onSubmit={handleSubmit} />);
      const submitButton = screen.getByRole("button", { name: "Sign in" });
      fireEvent.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    })
  );
});
