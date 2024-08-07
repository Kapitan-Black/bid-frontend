import { Hotel } from "@/types";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMainBidForm = () => {
  const createMainBidForm = async (
    formData: any
  ): Promise<Hotel> => {
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



