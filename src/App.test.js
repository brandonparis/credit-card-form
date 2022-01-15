import { render, screen } from "@testing-library/react";
import Form from "./Form";
import "@testing-library/react";

test("renders the Form component", () => {
  render(<Form />);
  const nameLabel = screen.getByLabelText("Name");
  const creditCardNum = screen.getByLabelText("Credit Card Number");
  const cvv = screen.getByLabelText("CVV");
  const date = screen.getByLabelText("Expiration Date");
  expect(creditCardNum).toBeInTheDocument();
  expect(nameLabel).toBeInTheDocument();
  expect(cvv).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});
