import { useState, useMemo, useCallback } from "react";

const debounceFn = (func) => {
  let debounced;
  return function () {
    clearTimeout(debounced);
    debounced = setTimeout(() => {
      func.apply(this, arguments);
    }, 1500);
  };
};

export default function useForm({ errors, setErrors }) {
  const [formValues, setFormValues] = useState({
    name: "",
    num: "",
    securityCode: "",
    exp: "",
  });

  const handleNameValidation = useCallback(
    (val) => {
      let regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
      if (val && !regex.test(val)) {
        setErrors((prev) => {
          return {
            ...prev,
            name: "Not a valid name.",
          };
        });
      }
    },
    [setErrors]
  );

  const handleNumValidation = useCallback(
    (val) => {
      let visaRegex = /^4[0-9]{12}$/;
      let amexRegex = /^3[47][0-9]{13}$/;
      if (val && !(visaRegex.test(val) || amexRegex.test(val))) {
        setErrors((prev) => {
          return {
            ...prev,
            num: "Not a valid credit card number. Accepted cards are Visa and American Express.",
          };
        });
      }
    },
    [setErrors]
  );

  const handleSecurityCodeValidation = useCallback(
    (val) => {
      let visaRegex = /[0-9]{3}$/;
      let amexRegex = /[0-9]{4}$/;
      if (val && !(visaRegex.test(val) || amexRegex.test(val))) {
        setErrors((prev) => {
          return {
            ...prev,
            securityCode: "Not a valid security code.",
          };
        });
      }
    },
    [setErrors]
  );

  const handleValidateDate = useCallback(
    (val) => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      if (val && new Date(val) <= date) {
        setErrors((prev) => {
          return {
            ...prev,
            exp: "Not a valid expiration date. Date must be at least 1 month into the future",
          };
        });
      }
    },
    [setErrors]
  );

  const debounceName = useMemo(
    () => debounceFn((val) => handleNameValidation(val)),
    [handleNameValidation]
  );

  const debounceNum = useMemo(
    () => debounceFn((val) => handleNumValidation(val)),
    [handleNumValidation]
  );

  const debounceSecurityCode = useMemo(
    () => debounceFn((val) => handleSecurityCodeValidation(val)),
    [handleSecurityCodeValidation]
  );

  const debounceExpDate = useMemo(
    () => debounceFn((val) => handleValidateDate(val)),
    [handleValidateDate]
  );

  const handleNameChange = useCallback(
    (e) => {
      let { value } = e.target;
      setErrors((prev) => {
        return {
          ...prev,
          name: "",
        };
      });
      setFormValues((prev) => {
        return { ...prev, name: value };
      });
      debounceName(value);
    },
    [debounceName, setErrors]
  );

  const handleNumChange = useCallback(
    (e) => {
      let { value } = e.target;
      setErrors((prev) => {
        return {
          ...prev,
          num: null,
        };
      });
      setFormValues((prev) => {
        return { ...prev, num: value };
      });
      debounceNum(value);
    },
    [debounceNum, setErrors]
  );

  const handleSecurityCodeChange = useCallback(
    (e) => {
      let { value } = e.target;
      setErrors((prev) => {
        return {
          ...prev,
          securityCode: null,
        };
      });
      setFormValues((prev) => {
        return { ...prev, securityCode: value };
      });
      debounceSecurityCode(value);
    },
    [debounceSecurityCode, setErrors]
  );

  const handleExpChange = useCallback(
    (e) => {
      let { value } = e.target;
      setErrors((prev) => {
        return {
          ...prev,
          exp: null,
        };
      });
      setFormValues((prev) => {
        return { ...prev, exp: value };
      });
      debounceExpDate(value);
    },
    [setErrors, debounceExpDate]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Success!");
  };

  return {
    handleExpChange,
    handleSubmit,
    handleNameChange,
    handleSecurityCodeChange,
    handleNumChange,
    formValues,
  };
}
