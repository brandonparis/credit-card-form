import { render, screen } from "@testing-library/react";
import Form from "./Form";
import "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "./hooks/useForm";

test("it renders the inputs and allows a user to type into them", () => {
  render(<Form />);
  const { result } = renderHook(() =>
    useForm({
      errors: {
        name: null,
        num: null,
        securityCode: null,
        exp: null,
      },
      setErrors: () => {},
    })
  );

  act(() => {
    const event = {
      preventDefault() {},
      target: { value: "Brandon Paris" },
    };
    const numEvent = {
      preventDefault() {},
      target: { value: 340000000000000 },
    };
    const expiryEvent = {
      preventDefault() {},
      target: { value: 340 },
    };
    const dateEvent = {
      preventDefault() {},
      target: { value: "2022-03-12" },
    };
    result.current.handleNameChange(event);
    result.current.handleNumChange(numEvent);
    result.current.handleSecurityCodeChange(expiryEvent);
    result.current.handleExpChange(dateEvent);
  });

  const nameInput = screen.getByPlaceholderText("Name");
  const ccInput = screen.getByPlaceholderText("Credit Card Number");
  const expiryInput = screen.getByPlaceholderText("CVV");
  const dateInput = screen.getByTestId("expiry");
  userEvent.type(nameInput, "Brandon Paris");
  userEvent.type(ccInput, "{3}{4}{0}{0}{0}{0}{0}{0}{0}{0}{0}{0}{0}{0}{0}");
  userEvent.type(expiryInput, "{3}{4}{0}");
  userEvent.type(dateInput, "2022-03-12");

  expect(result.current.formValues.name).toBe("Brandon Paris");
  expect(result.current.formValues.num).toBe(340000000000000);
  expect(result.current.formValues.securityCode).toBe(340);
  expect(result.current.formValues.exp).toBe("2022-03-12");
});

test("it validates the inputs", () => {
  render(<Form />);
  let errors = {
    name: null,
    num: null,
    securityCode: null,
    exp: null,
  };
  const { result } = renderHook(() =>
    useForm({
      errors,
      setErrors: () => {
        return (errors = {
          name: "Not a valid name.",
          num: null,
          securityCode: null,
          exp: null,
        });
      },
    })
  );

  const nameInput = screen.getByPlaceholderText("Name");
  userEvent.type(nameInput, "Brandon_Paris");
  act(() => {
    const event = {
      preventDefault() {},
      target: { value: "Brandon_Paris" },
    };

    result.current.handleNameChange(event);
  });
  expect(errors.name).toBe("Not a valid name.");
  expect(result.current.formValues.name).toBe("Brandon_Paris");
});
