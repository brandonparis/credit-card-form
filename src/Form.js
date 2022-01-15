import styled from "styled-components";
import { useState } from "react";
import useForm from "./hooks/useForm";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  > form {
    --shadow-color: 286deg 36% 62%;
    margin: 0 auto;
    max-width: 65ch;
    width: 65ch;
    box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.29),
      0.8px 1.5px 1.9px -0.8px hsl(var(--shadow-color) / 0.29),
      1.9px 3.7px 4.7px -1.7px hsl(var(--shadow-color) / 0.29),
      4.5px 9.1px 11.4px -2.5px hsl(var(--shadow-color) / 0.29);
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;

    > h2 {
      color: #0f172a;
      font-size: 1.5rem;
      padding: 2rem;
    }

    > label {
      width: 24rem;
      color: #0f172a;
    }
  }
`;

const FormInput = styled.input`
  --shadow-color: 215deg 19% 35%;
  border-radius: 4px;
  border: none;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  width: 24rem;
  color: #0f172a;
  height: 3rem;
  padding: 5px 1rem;
`;

const Button = styled.button`
  --shadow-color: 215deg 19% 35%;
  margin-top: 2rem;
  border-radius: 4px;
  padding: 10px 28px;
  font-size: 12px;
  border: none;
  background: #64748b;
  color: #fff;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
    0.8px 1.6px 2px -0.8px hsl(var(--shadow-color) / 0.36),
    2.1px 4.1px 5.2px -1.7px hsl(var(--shadow-color) / 0.36),
    5px 10px 12.6px -2.5px hsl(var(--shadow-color) / 0.36);
  cursor: pointer;
  :hover {
    filter: brightness(0.4);
  }
  :disabled {
    background: #9ca3af;
    pointer-events: none;
  }
`;

const Error = styled.div`
  color: #b91c1c;
  font-weight: 600;
  font-size: 14px;
  padding-top: 0.5rem;
`;

export default function Form() {
  const [errors, setErrors] = useState({
    name: null,
    num: null,
    securityCode: null,
    exp: null,
  });

  const {
    formValues,
    handleNameChange,
    handleNumChange,
    handleExpChange,
    handleSubmit,
    handleSecurityCodeChange,
  } = useForm({
    errors,
    setErrors,
  });

  const { name, num, securityCode, exp } = formValues;

  return (
    <AppContainer>
      <form data-testid="cc-form" onSubmit={handleSubmit}>
        <h2>Enter your credit card information</h2>
        <label htmlFor="name">
          Name
          <FormInput
            onChange={handleNameChange}
            value={name}
            type="text"
            id="name"
            placeholder="Name"
          />
          {errors.name && <Error>{errors.name}</Error>}
        </label>
        <label htmlFor="ccNum">
          Credit Card Number
          <FormInput
            onChange={handleNumChange}
            value={num}
            type="text"
            id="ccNum"
            placeholder="Credit Card Number"
          />
          {errors.num && <Error>{errors.num}</Error>}
        </label>
        <label htmlFor="cvv">
          CVV
          <FormInput
            onChange={handleSecurityCodeChange}
            value={securityCode}
            type="text"
            id="cvv"
            placeholder="CVV"
          />
          {errors.securityCode && <Error>{errors.securityCode}</Error>}
        </label>
        <label htmlFor="expiry">
          Expiration Date
          <FormInput
            id="expiry"
            data-testid="expiry"
            onChange={handleExpChange}
            value={exp}
            type="date"
          />
          {errors.exp && <Error>{errors.exp}</Error>}
        </label>
        <Button
          disabled={
            Object.values(errors).some((i) => i) ||
            Object.values(formValues).some((i) => !i)
          }
          type="submit"
        >
          Submit
        </Button>
      </form>
    </AppContainer>
  );
}
