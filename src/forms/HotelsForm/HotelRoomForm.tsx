import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import RemoveButton from "@/components/RemoveButton";
import { RoomFormData } from "@/types/types";
import HotelUploadImagesInput from "@/components/HotelUploadImagesInput";

interface HotelRoomProps {
  index: number;
  onRemove: () => void;
  onUpdate: (newRoomData: RoomFormData, isUploading: boolean) => void;
  showRemoveButton: boolean;
  setHotelsIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RoomData extends RoomFormData {
  index: number;
}

const HotelRoomForm: React.FC<HotelRoomProps> = ({
  index,
  onRemove,
  onUpdate,
  showRemoveButton,
  setHotelsIsUploading,
}) => {
  const { control } = useFormContext();
  const [roomUrls, setRoomUrls] = useState<string[]>([]);
  const [roomData, setRoomData] = useState<RoomData>({
    index,
    roomType: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false); // New state for upload status

  useEffect(() => {
    setHotelsIsUploading(isUploading);
  }, [isUploading]);

  const receiveIsUploading = (uploading: boolean) => {
    setIsUploading(uploading);
  };

  // useEffect(() => {
  //   console.log("roomData====", roomData);
  // }, [roomData]);

  const handleRoomTypeChange = (roomType: string) => {
    setRoomData((prevData) => ({
      ...prevData,
      roomType: roomType,
    }));
  };

  useEffect(() => {
    setRoomData((prevData) => ({
      ...prevData,
      images: roomUrls,
    }));
  }, [roomUrls]);

  useEffect(() => {
    onUpdate(roomData, isUploading);
  }, [roomData]);

  return (
    <div className="bg-amber-100 rounded-lg mt-2 p-2">
      <div className="flex justify-center sm:mt-4 mt-[-24px]">
        <HotelUploadImagesInput
          imageUrls={roomUrls}
          setImageUrls={setRoomUrls}
          imageUploadState={receiveIsUploading}
          showImages
        />
      </div>
      <h3>חדר {roomData.index + 1}</h3>
      <div className="w-[250px]">
        <Controller
          control={control}
          name={`rooms[${index}].roomType`}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Room Type"
              value={roomData.roomType}
              onChange={(e) => handleRoomTypeChange(e.target.value)}
            />
          )}
        />
      </div>
      {showRemoveButton && (
        <div className="flex justify-end mt-4">
          <RemoveButton onRemove={onRemove} text="מחק חדר" disabled={isUploading} />
        </div>
      )}
    </div>
  );
};

export default HotelRoomForm;
