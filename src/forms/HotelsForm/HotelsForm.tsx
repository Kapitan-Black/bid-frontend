import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ImageCarousel from "@/components/ImageCarousel";
import { useCreateHotel } from "@/api/HotelsFormApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import HotelRoomForm from "./HotelRoomForm";
import { Separator } from "@/components/ui/separator";
import { UploadImages } from "@/api/imageUploadApi";
import RemoveButton from "@/components/RemoveButton";
import { HotelFormData, RoomFormData } from "@/types/types";
import UploadImagesInput from "@/components/UploadImagesInput";
import { v4 as uuidv4 } from "uuid";

const hotelSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  hotelDescription: z.string().min(1, "Hotel description is required"),
  images: z.array(z.string()).optional(),

  rooms: z.array(
    z.object({
      roomType: z.string().min(1),
      images: z.array(z.string()).optional(),
    })
  ),
});

const HotelsForm = () => {
  const methods = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {},
  });

  const [hotelUrls, setHotelUrls] = useState<string[]>([]);
  console.log("hotelUrls===>>>", hotelUrls);
  const [rooms, setRooms] = useState<RoomFormData[]>([]);
  console.log("rooms===>>>", rooms);
  const [showForm, setShowForm] = React.useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleToggleForm = () => {
    setHotelUrls([]);
    setRooms([]);

    methods.reset({
      hotelName: "",
      hotelDescription: "",
      rooms: [],
    });
    setShowForm(!showForm);
  };

  const handleAddRoom = () => {
    setRooms((rooms) => [...rooms, { id: uuidv4(), roomType: "", images: [] }]);
  };

  const handleRemoveRoom = async (id: string) => {
    setRooms((rooms) => rooms.filter((room) => room.id !== id));
  };

  const handleRemoveImage = async (index: number) => {
    setHotelUrls((prevUrls) => {
      const updatedUrls = prevUrls.filter((_, i) => i !== index);
      return updatedUrls;
    });
  };

  const handleRoomDataChange = (index: number, newRoomData: RoomFormData) => {
    setRooms((currentRooms) =>
      currentRooms.map((room, idx) => (idx === index ? newRoomData : room))
    );
  };

  const { createHotel, isLoading, isSuccess, error } = useCreateHotel();

  const uploadImagesToCloudinary = async (
    base64Images: string[]
  ): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    setIsUploading(true);

    for (const base64Image of base64Images) {
      try {
        const response = await fetch(base64Image);
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });

        const url = await UploadImages(file);
        uploadedUrls.push(url);
      } catch (err) {
        toast.error("Image upload failed. Please try again.");
        throw err;
      }
    }
    setIsUploading(false);

    return uploadedUrls;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = methods.getValues();

    try {
      if (formData.hotelName && formData.hotelDescription) {
        setIsUploading(true);

        const cloudinaryHotelUrls = await uploadImagesToCloudinary(hotelUrls);

        const cloudinaryRoomUrls = await Promise.all(
          rooms.map(async (room) => {
            const uploadedRoomImages = await uploadImagesToCloudinary(
              room.images
            );
            return { ...room, images: uploadedRoomImages };
          })
        );

        const fullFormData = {
          hotelName: formData.hotelName,
          hotelDescription: formData.hotelDescription,
          images: cloudinaryHotelUrls,
          rooms: cloudinaryRoomUrls,
        };

        createHotel(fullFormData);
        setHotelUrls([]);
        setRooms([]);
        setShowForm(!showForm);
        localStorage.removeItem("images");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("הבית מלון עודכן במערכת");
    }
    if (error) {
      toast.error("עדכון הבית מלון נכשל");
    }
  }, [isSuccess, error]);

  return (
    <>
      {isUploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
          <LoadingButton />
        </div>
      )}
      <FormProvider {...methods}>
        <button
          type="button"
          onClick={handleToggleForm}
          disabled={showForm}
          className={`p-2 rounded mb-8 ${
            showForm ? "bg-blue-100" : "bg-blue-300 hover:bg-blue-500"
          }`}
        >
          להוסיף בית מלון
        </button>
        <div className="sm:container bg-gray-100 rounded-lg">
          <div className="flex justify-center">
            {showForm && hotelUrls.length > 0 && (
              <ImageCarousel
                handleRemoveImage={handleRemoveImage}
                images={hotelUrls}
                showDeleteButtons
              />
            )}
          </div>

          {showForm && (
            <form dir="rtl" onSubmit={handleSubmit}>
              <div className="flex justify-center mt-8 mb-4">
                <UploadImagesInput
                  imageUrls={hotelUrls}
                  setImageUrls={setHotelUrls}
                  showImages={false}
                />
              </div>

              <div className="flex flex-col gap-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <h2 className="sm:text-2xl">שם הבית מלון:</h2>
                  <input
                    {...methods.register("hotelName")}
                    className="border text-sm sm:text-xl"
                  />
                </div>

                <div className="">
                  <h3 className="sm:text-xl">תיאור הבית מלון:</h3>
                  <textarea
                    {...methods.register("hotelDescription")}
                    className="border h-[100px] w-full text-sm  sm:text-xl"
                  />
                </div>
              </div>

              <Separator className="mt-8" />

              <div>
                {rooms.map((room, index) => (
                  <HotelRoomForm
                    key={room.id}
                    index={index}
                    id={room.id}
                    onRemove={() => handleRemoveRoom(room.id)}
                    onUpdate={(newRoomData) =>
                      handleRoomDataChange(index, newRoomData)
                    }
                    setHotelsIsUploading={setIsUploading}
                  />
                ))}
                <Button
                  type="button"
                  onClick={handleAddRoom}
                  className="mt-4 text-xs p-1 h-5 hover:bg-gray-500"
                >
                  להוסיף חדר
                </Button>
              </div>

              <div className="flex justify-center gap-4">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <Button
                    type="submit"
                    className="bg-green-400 hover:bg-green-500 hover:text-white text-black"
                    disabled={isUploading}
                  >
                    שמור בית מלון
                  </Button>
                )}
              </div>
              <div className="flex justify-end items-center p-2">
                <RemoveButton
                  onRemove={handleToggleForm}
                  text="סגור"
                  disabled={isUploading}
                />
              </div>
            </form>
          )}
        </div>
      </FormProvider>
    </>
  );
};

export default HotelsForm;
