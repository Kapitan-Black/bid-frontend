import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImagesInput from "@/components/UploadImagesInput";
import { RoomFormData } from "@/types";
import RemoveButton from "@/components/RemoveButton";




interface HotelRoomProps {
  index: number;
  onRemove: () => void;
  onUpdate: (newRoomData: RoomFormData, isUploading: boolean) => void;
  showRemoveButton: boolean
}

interface RoomData extends RoomFormData {
  index: number;
}

const HotelRoomForm: React.FC<HotelRoomProps> = ({ index, onRemove, onUpdate, showRemoveButton }) => {
  const { control } = useFormContext();
  const [roomData, setRoomData] = useState<RoomData>({
    index,
    roomType: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false); // New state for upload status


  // useEffect(() => {
  //   console.log("roomData====", roomData);
  // }, [roomData]);

  const receiveDataFromInput = (urls: string[], uploading: boolean) => {
    setRoomData((prevData) => ({
      ...prevData,
      images: urls,
    }));
    setIsUploading(uploading)
  };

  const handleRoomTypeChange = (roomType: string) => {
    setRoomData((prevData) => ({
      ...prevData,
      roomType: roomType,
    }));
  };

  useEffect(() => {
    onUpdate(roomData, isUploading);
  }, [roomData]);

  return (
    <div className="bg-amber-100 rounded-lg mt-8 p-2">
      <div className="flex justify-center mt-4">
        <UploadImagesInput data={receiveDataFromInput} showImages />
      </div>
      <h3>Room {roomData.index + 1}</h3>
      <div className="w-[250px]">
        <Controller
          control={control}
          name={`rooms[${index}].roomType`}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Room Type"
              value={roomData.roomType} // Controlled value
              onChange={(e) => handleRoomTypeChange(e.target.value)}
            />
          )}
        />
      </div>
      {showRemoveButton && (
        <div className="flex justify-end">
        
          <RemoveButton onRemove={onRemove} text="מחק חדר"/>
        </div>
      )}
    </div>
  );
};

export default HotelRoomForm;


