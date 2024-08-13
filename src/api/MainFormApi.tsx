import { MainBidServerResponse } from "@/types/mainBidFormResponse";
import { Hotel } from "../types/types";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { error } from "console";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMainBidForm = () => {
  const createMainBidForm = async (formData: any): Promise<Hotel> => {
    const response = await fetch(`${API_BASE_URL}/api/main-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update the mainForm");
    }
    return response.json();
  };

  const {
    mutateAsync: createForm,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMainBidForm);

  return {
    createForm,
    isLoading,
    isSuccess,
    error,
  };
};

export const useGetMainBidForms = () => {
  const getMainBidFormsRequest = async (): Promise<MainBidServerResponse[]> => {
    const response = await fetch(`${API_BASE_URL}/api/main-form`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get forms");
    }

    return response.json();
  };

  const { data, isLoading, isSuccess, error } = useQuery(
    "getMainBidForms",
    getMainBidFormsRequest
  );

  return {
    data,
    isLoading,
    isSuccess,
    error,
  };
};

// export const useGetSpecificForm = async (formName: string) => {
//   const [form, setForm] = useState<MainBidServerResponse>();
//   useEffect(() => {
//     fetch(`${API_BASE_URL}/api/main-form/${formName}`)
//       .then((response) => response.json())
//       .then((data) => setForm(data))
//       .catch((error) => console.log(error, "Error"));
//   }, []);

//   return form
// };

