import { Hotel, HotelFormData } from "@/types";
import { useMutation, useQuery, useQueryClient } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateHotel = () => {
  const createHotelRequest = async (hotelFormData: HotelFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(hotelFormData),
    });

    if (!response.ok) {
      throw Error("Failed to create hotel");
    }

    return response.json();
  };

  const {
    mutate: createHotel,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createHotelRequest);

  return {
    createHotel,
    isLoading,
    isSuccess,
    error,
  };
};
//Another small point in naming convention,so react query hook should be with query suffix  useGetHotelsQuery

export const useGetHotels = () => {
  const getHotelsRequest = async (): Promise<Hotel[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get Hotels");
    }

    return response.json();
  };

  const {
    data: hotels,
    isLoading,
    isSuccess,
    error,
  } = useQuery("getHotels", getHotelsRequest);

  return {
    hotels,
    isLoading,
    isSuccess,
    error,
  };
};

// export const useGetHotel = (id:string) => {
//   const getHotelsRequest = async (): Promise<Hotel[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/hotels${id}`, {
//       method: "GET",
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch Hotel");
//     }

//     return response.json();
//   };
//   const { data: hotel, isLoading } = useQuery("getHotel", getHotelsRequest);
//   return {
//     hotel,
//     isLoading,
//   };
// };
const folderName = "Hotels";

export const useDeleteHotel = () => {
  const queryClient = useQueryClient();
  const deleteHotelRequest = async (hotelName: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hotelName, folder: folderName }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete hotel");
    }

    return response.json();
  };

  const {
    mutate: deleteHotel,
    isLoading,
    isSuccess,
    error,
  } = useMutation(deleteHotelRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("getHotels");
    },
  });

  return {
    deleteHotel,
    isLoading,
    isSuccess,
    error,
  };
};
