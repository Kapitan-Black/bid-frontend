import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  TransferCardFields,
  Hotel,
  Room,
  HotelCardFields,
  FlightCardFields,
  FormFields,
} from "../../../types/types";
import SortableList from "./SortableList";
import FormActions from "./FormActions";
import { useCreateMainBidForm, useGetMainBidForms } from "@/api/MainFormApi";
import { formSchema } from "../../mainBidForm/ZodSchema"
import { SeparatorUrls } from "@/config/separatorUrls";



const MainBidForm: React.FC = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { items: [] },
  });

  
    
    const [selectedImageUrl, setSelectedImageUrl] = useState(
      SeparatorUrls[0].url
    );


  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [hotelData, setHotelData] = useState<
    { selectedHotel: Hotel | null; selectedRooms: Room[] }[]
    >([]);
  
  
  
    console.log("hotelData", hotelData);

  const handleHotelDataChange = (
    index: number,
    data: { selectedHotel: Hotel | null; selectedRooms: Room[] }
  ) => {
    setHotelData((prevData) => {
      const newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const handleHotelRemove = (index: number) => {
    setHotelData((prevData) => prevData.filter((_, i) => i !== index));
    remove(index);
  };

  const addHotel = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    append({
      id: uuidv4(),
      type: "hotel",
      hotelName: "",
      checkInDate: today,
      checkOutDate: tomorrow,
      hotelDescription: "",
      images: [],
      rooms: [],
      sum: 0,
    } as HotelCardFields);

  };

  const addTransfer = () => {
    append({
      id: uuidv4(),
      type: "transfer",
      transferDescription: "",
      transferDate: new Date(),
      departureTime: "00:00",
      arrivalTime: "00:00",
      from: "",
      to: "",
      passengerComposition: "",
      agentComments: "",
      sum: 0,
    } as TransferCardFields);
  };

  const addFlight = () => {
    append({
      id: uuidv4(),
      type: "flight",
      flightDescription: "",
      departureDate: new Date(),
      arrivalDate: new Date(),
      flightNumber: "",
      airline: "",
      departureAirport: "",
      arrivalAirport: "",
      stopsNumber: 0,
      stopoverAirport1: "",
      stopoverAirport2: "",
      stopoverAirport3: "",
      stopover1Time: "00:00",
      stopover2Time: "00:00",
      stopover3Time: "00:00",
      flightTime: "00:00",
      landingTime: "00:00",

      numberOfAdults: 0,
      numberOfChildren: 0,
      numberOfBabies: 0,
      priceForAdult: 0,
      priceForChild: 0,
      priceForBaby: 0,
      agentComments: "",
    } as FlightCardFields);
  };

  const addImageComponent = () => {
      const selectedImage = SeparatorUrls.find(image => image.url === selectedImageUrl);
    append({
      id: uuidv4(),
      type: "image",
      imageUrl: selectedImageUrl,
      description: selectedImage ? selectedImage.description : "",
    });
  };

  const { createForm, isLoading, isSuccess, error } = useCreateMainBidForm();
  const {data} = useGetMainBidForms()

  const handleSumbmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = form.getValues();

    const formExist = data?.some((form) => form.formName === formData.formName)

    if (formExist) {
      console.error(`A form with the name ${formData.formName} is already exist`)
      toast.error(`כבר קיימת במערכת "${formData.formName}" הצאה עם השם`)
      return
    }

    const hotelDataArray = formData.items.map((item, index) => {
      if (item.type === "hotel") {
        const hotelDataEntry = hotelData[index];
        if (hotelDataEntry) {
            return {
              ...item,
              hotelName: hotelDataEntry.selectedHotel?.hotelName,
              hotelDescription: hotelDataEntry.selectedHotel?.hotelDescription,
              images: hotelDataEntry.selectedHotel?.images,
              
              rooms: hotelDataEntry.selectedRooms.map((room) => ({
                roomType: room.roomType,
                images: room.images,
                nightPrice: room.nightPrice,
                numberOfRooms: room.numberOfRooms,
              })),
            };
        }
      
      }
      return item;
    });

    const idArray = formData.items.map((item) => item.id);

    const payload = {
      formName: formData.formName,
      hotel: hotelDataArray.filter((item) => item.type === "hotel") || [],
      transfer: formData.items.filter((item) => item.type === "transfer") || [],
      flight: formData.items.filter((item) => item.type === "flight") || [],
      image: formData.items.filter((item) => item.type === "image") || [],
      idArray,
    };
    // console.log(payload)
    createForm(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Form updated");
    }
    if (error) {
      toast.error("Failed to update form");
    }
  }, [isSuccess, error]);

  // console.log(form.getValues().items)

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSumbmit}>
        <div className="flex flex-row-reverse justify-center mb-12">
          <label htmlFor="formName">:שם ההצעה</label>
          <input
            dir="rtl"
            id={"formName"}
            className="border border-black"
            {...form.register("formName")}
          />
        </div>

        <SortableList 
          fields={fields}
          move={move}
          handleHotelRemove={handleHotelRemove}
          handleHotelDataChange={handleHotelDataChange}
          remove={remove}
        />

        <FormActions
          addHotel={addHotel}
          addTransfer={addTransfer}
          addFlight={addFlight}
                  addImageComponent={addImageComponent}
                  selectedImageUrl={selectedImageUrl}
                  setSelectedImageUrl={setSelectedImageUrl}
        />

        <div className="space-x-8 mt-10">
          <button
            type="submit"
            className="bg-green-300 rounded hover:bg-green-500 p-2"
          >
            {isLoading ? "Submitting..." : "שמור"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MainBidForm;
