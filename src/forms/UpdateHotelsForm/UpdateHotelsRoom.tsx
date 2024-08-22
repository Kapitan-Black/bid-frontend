// import React, { useEffect, useState } from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import UploadImagesInput from "@/components/UploadImagesInput";
// import RemoveButton from "@/components/RemoveButton";
// import { RoomFormData } from "@/types/types";

// interface HotelRoomProps {
//   index: number;
//   onRemove: () => void;
//   onUpdate: (newRoomData: RoomFormData, isUploading: boolean) => void;
//   showRemoveButton: boolean;
// }

// interface RoomData extends RoomFormData {
//   index: number;
// }

// const UpdateHotelsRoom: React.FC<HotelRoomProps> = ({
//   index,
//   onRemove,
//   onUpdate,
//   showRemoveButton,
// }) => {
//   const { control } = useFormContext();
//   const [roomData, setRoomData] = useState<RoomData>({
//     index,
//     roomType: "",
//     images: [],
//   });
//   const [isUploading, setIsUploading] = useState(false); // New state for upload status

//   // useEffect(() => {
//   //   console.log("roomData====", roomData);
//   // }, [roomData]);

//   const receiveDataFromInput = (urls: string[], uploading: boolean) => {
//     setRoomData((prevData) => ({
//       ...prevData,
//       images: urls,
//     }));
//     setIsUploading(uploading);
//   };

//   const handleRoomTypeChange = (roomType: string) => {
//     setRoomData((prevData) => ({
//       ...prevData,
//       roomType: roomType,
//     }));
//   };

//   useEffect(() => {
//     onUpdate(roomData, isUploading);
//   }, [roomData]);

//   return (
//     <div className="bg-amber-100 rounded-lg mt-2 p-2">
//       <div className="flex justify-center sm:mt-4 mt-[-24px]">
//         <UploadImagesInput data={receiveDataFromInput} showImages />
//       </div>
//       <h3>חדר {roomData.index + 1}</h3>
//       <div className="w-[250px]">
//         <Controller
//           control={control}
//           name={`rooms[${index}].roomType`}
//           defaultValue=""
//           render={({ field }) => (
//             <Input
//               {...field}
//               placeholder="Room Type"
//               value={roomData.roomType}
//               onChange={(e) => handleRoomTypeChange(e.target.value)}
//             />
//           )}
//         />
//       </div>
//       {showRemoveButton && (
//         <div className="flex justify-end mt-4">
//           <RemoveButton onRemove={onRemove} text="מחק חדר" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateHotelsRoom;
