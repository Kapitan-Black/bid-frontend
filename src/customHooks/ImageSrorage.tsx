import { useState, useCallback, useEffect } from "react";
import { useDeleteImage, UploadImages } from "@/api/imageUploadApi";

const useImageStorage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { deleteImage, isSuccess } = useDeleteImage();

  useEffect(() => {
    
    console.log("imageUrls in the imageStorage",imageUrls)
  }, [imageUrls])

  const addImages = useCallback(async (files: FileList) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    const urls = await Promise.all(fileArray.map((file) => UploadImages(file)));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    setIsUploading(false);

    return urls
  }, [imageUrls]);

  // const deleteImages = useCallback(
  //   async (urlToDelete?: string) => {
  //     if (urlToDelete) {
  //       // Delete a specific image
  //       deleteImage(urlToDelete);
  //       setImageUrls((prevUrls) => {
  //         const updatedUrls = prevUrls.filter((url) => url !== urlToDelete);
  //         // Ensure the state is updated before returning
  //         return updatedUrls;
  //       });
  //     } else {
  //       // Delete all images
  //       await Promise.all(imageUrls.map((url) => deleteImage(url)));
  //       setImageUrls([]); // Reset state
  //     }
  //   },
  //   [imageUrls, deleteImage]
  // );
  useEffect(() => {
    if (isSuccess) {
      console.log("success");
    }

  }, [isSuccess])
     
    const deleteImages = useCallback(
      async (urlToDelete?: string) => {
        if (urlToDelete) {
          try {
            console.log("deleteImages called with urlToDelete:", urlToDelete); // Log when function is called

            // Delete a specific image from Cloudinary
             deleteImage(urlToDelete);
         
            // Log before updating state
            console.log("Before deletion, imageUrls:", imageUrls);

            // Update the state to remove the deleted image URL
            setImageUrls((prevUrls) => {
              const updatedUrls = prevUrls.filter((url) => url !== urlToDelete);

              // Log after updating state
              console.log("After deletion, updatedUrls:", updatedUrls);

              return updatedUrls;
            });
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        } else {
          try {
            // Delete all images from Cloudinary
            console.log("Deleting all images");

            await Promise.all(imageUrls.map((url) => deleteImage(url)));

            // Log before clearing state
            console.log("Clearing all images, imageUrls:", imageUrls);

            setImageUrls([]); // Clear the entire state
          } catch (error) {
            console.error("Error deleting all images:", error);
          }
        }
      },
      [imageUrls, deleteImage] // Dependency array ensures function stability
    );

  
  

  return {
    imageUrls,
    addImages,
    deleteImages,
    isUploading,
  };
};

export default useImageStorage;
