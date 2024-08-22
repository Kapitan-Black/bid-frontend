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
import UploadImagesInput from "@/components/UploadImagesInput";
import { Separator } from "@/components/ui/separator";
import { useDeleteImage } from "@/api/imageUploadApi";
import RemoveButton from "@/components/RemoveButton";
import { HotelFormData, RoomFormData } from "@/types/types";
import useImageStorage from "@/customHooks/ImageSrorage";

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
  console.log("hotelUrls===>>>", hotelUrls.length);
  const [rooms, setRooms] = useState<RoomFormData[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state for upload status

  const handleToggleForm = () => {
    hotelUrls.forEach((url) => deleteImage(url));

    rooms.forEach((room) => {
      room.images.forEach((url) => {
        deleteImage(url);
      });
    });
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
    setRooms((rooms) => [...rooms, { roomType: "", images: [] }]);
  };

  const handleRemoveRoom = async (index: number) => {
    const roomImages = rooms[index].images;
    if (roomImages.length > 0) {
      Promise.all(roomImages.map((url) => deleteImage(url)));
    }
    setRooms((rooms) => rooms.filter((_, i) => i !== index));
  };

  const { deleteImage } = useDeleteImage();
  const { deleteImages } = useImageStorage();

  const handleRemoveImage = async (index: number) => {
    const urlToRemove = hotelUrls[index];

    try {
      deleteImages(urlToRemove);

      setHotelUrls((prevUrls) => {
        const updatedUrls = prevUrls.filter((_, i) => i !== index);
        // console.log("Updated hotelUrls after deletion: ", updatedUrls.length);
        return updatedUrls;
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const receiveDataFromInput = (data: string[], uploading: boolean) => {
    setHotelUrls(data);
    setIsUploading(uploading); // Update upload status
  };

  const handleRoomDataChange = (
    index: number,
    newRoomData: RoomFormData,
    uploading: boolean
  ) => {
    setRooms((currentRooms) =>
      currentRooms.map((room, idx) => (idx === index ? newRoomData : room))
    );
    setIsUploading(uploading);
  };

  const { createHotel, isLoading, isSuccess, error } = useCreateHotel();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = methods.getValues();

    const fullFormData = {
      hotelName: formData.hotelName,
      hotelDescription: formData.hotelDescription,
      images: hotelUrls,
      rooms: rooms.map((room) => ({
        roomType: room.roomType,
        images: room.images,
      })),
    };
    if (fullFormData.hotelName && fullFormData.hotelDescription) {
      createHotel(fullFormData);
      setHotelUrls([]);
      setRooms([]);
      setShowForm(!showForm);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
      <FormProvider {...methods}>
        <button
          type="button"
          onClick={handleToggleForm}
          disabled={showForm}
          className={`p-2 rounded mb-8 ${
            showForm ? "bg-blue-100" : "bg-blue-300 hover:bg-blue-500"
          }`}
        >
          Add Hotel
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
                  showImages={false}
                  data={receiveDataFromInput}
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
                {rooms.map((_, index) => (
                  <HotelRoomForm
                    key={index}
                    index={index}
                    onRemove={() => handleRemoveRoom(index)}
                    onUpdate={(newRoomData, isUploading) =>
                      handleRoomDataChange(index, newRoomData, isUploading)
                    }
                    showRemoveButton={index === rooms.length - 1}
                  />
                ))}
                <Button
                  type="button"
                  onClick={handleAddRoom}
                  className="mt-4 text-xs p-1 h-5"
                >
                  Add Room
                </Button>
              </div>

              <div className="flex justify-center gap-4">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <Button
                    type="submit"
                    className="bg-green-400 hover:bg-green-600"
                    disabled={isUploading} // Disable submit button while images are uploading
                  >
                    Submit
                  </Button>
                )}
              </div>
              <div className="flex justify-end items-center p-2">
                <RemoveButton onRemove={handleToggleForm} text="סגור" />
              </div>
            </form>
          )}
        </div>
      </FormProvider>
    </>
  );
};

export default HotelsForm;
