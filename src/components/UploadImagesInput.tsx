// import React, { useEffect, useRef, useState } from "react";
// import { Input } from "@/components/ui/input";
// import useImageStorage from "@/customHooks/ImageSrorage";
// import SmallCarousel from "./SmallCarousel";
// import RemoveButton from "./RemoveButton";

// interface Props {
//   data: (urls: string[], isUploading: boolean) => void; 
//   showImages?: boolean;
// }

// const UploadImagesInput: React.FC<Props> = ({ showImages, data }) => {
//   const { imageUrls, addImages, deleteImages, isUploading } = useImageStorage();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [inputKey, setInputKey] = useState(Date.now());



//   // console.log("UploadImagesInput=====>>", imageUrls.length);

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files.length) {
//       await addImages(event.target.files);
//     }
//   };



//   const handleDeleteImages = () => {
//     setInputKey(Date.now());
//     deleteImages();
//     data([], false); // Update data function call
//   };

//   useEffect(() => {
//     data(imageUrls, isUploading); // Update data function call
//   }, [imageUrls, isUploading]);

//   return (
//     <div className="mt-4">
//       {showImages && (
//         <div className="flex justify-center">
//           <div className="w-[280px] sm:w-[400px] md:w-[550px] lg:w-[800px] xl:w-[1100px] mb-8">
//             <SmallCarousel
//               images={imageUrls}
//               slidesToShow={imageUrls.length > 2 ? 3 : 1}
//               responsive={[
//                 {
//                   breakpoint: 768,
//                   settings: {
//                     slidesToShow: 1,
//                   },
//                 },
//               ]}
//             />
//           </div>
//         </div>
//       )}
//       <div className="flex justify-center">
//         <p>({imageUrls.length} תמונות)</p>
//       </div>
//       <div className="flex justify-center">
//         <Input
//           type="file"
//           ref={fileInputRef}
//           key={inputKey}
//           multiple
//           onChange={handleFileChange}
//           className="flex justify-center w-[150px] sm:w-full"
//         />
//       </div>
//       <div className="flex justify-center mt-4">
       
//         <RemoveButton onRemove={handleDeleteImages} text="מחק תמונות"/>
//       </div>
//     </div>
//   );
// };

// export default UploadImagesInput;
