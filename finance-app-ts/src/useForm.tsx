import { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  id: number;
  amount: string;
  category: string;
  description: string;
  is_income: number;
  date: string;
};

export const useForm = (initialState: FormData) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };
  const resetForm = () => setFormData(initialState);

  return { formData, handleInputChange, resetForm, setFormData };
};
