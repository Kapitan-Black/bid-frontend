import { useState, useCallback } from "react";
import { useDeleteImage, UploadImages } from "@/api/imageUploadApi";


const useImageStorage = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false); 
  const { deleteImage } = useDeleteImage();

  const addImages = useCallback(async (files: FileList) => {
    setIsUploading(true); // Set uploading state to true
    const fileArray = Array.from(files);
    const urls = await Promise.all(fileArray.map((file) => UploadImages(file)));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
    setIsUploading(false); // Set uploading state to false
  }, []);

  const deleteImages = useCallback(async () => {
    await Promise.all(imageUrls.map((url) => deleteImage(url)));
    setImageUrls([]);
  }, [imageUrls, deleteImage]);

  const clearImages = useCallback(() => {
    setImageUrls([]);
  }, []);

  return { imageUrls, addImages, deleteImages, clearImages, isUploading };
};

export default useImageStorage;
