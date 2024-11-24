// utils/inputValidation.ts
export const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "-" || e.key === "E" || e.key === "e" || e.key === ".")  {
      e.preventDefault();
    }
  };
  