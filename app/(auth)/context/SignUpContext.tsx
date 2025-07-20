import React, { createContext, useContext, useState } from "react";

type SignUpFormType = {
  account_type: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  country: string;
  dob: string;
  email: string;
  password: string;
};

interface SignUpContextType extends SignUpFormType {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  updateForm: (updates: Partial<SignUpFormType>) => void;
  resetForm: () => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [form, setForm] = useState<SignUpFormType>({
    account_type: "personal",
    first_name: "",
    middle_name: "",
    last_name: "",
    phone: "",
    country: "Ghana",
    dob: "",
    email: "",
    password: "",
  });

  const setEmail = (email: string) => setForm((prev) => ({ ...prev, email }));
  const setPassword = (password: string) => setForm((prev) => ({ ...prev, password }));

  const updateForm = (updates: Partial<SignUpFormType>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setForm({
      account_type: "personal",
      first_name: "",
      middle_name: "",
      last_name: "",
      phone: "",
      country: "Ghana",
      dob: "",
      email: "",
      password: "",
    });
  };

  return (
    <SignUpContext.Provider
      value={{
        ...form,
        setEmail,
        setPassword,
        updateForm,
        resetForm,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }
  return context;
};
