import { UploadImages, useDeleteImage } from "@/api/imageUploadApi";
import { createContext, ReactNode, useState } from "react";


interface ImageStorageContextType {
  imageUrls: string[];
  addImages: (files: File[]) => Promise<void>;
  deleteImages: () => Promise<void>;
}

const ImageStorageContext = createContext<ImageStorageContextType | null>(null);

interface ImageStorageProviderProps {
  children: ReactNode;
}

const ImageStorageProvider: React.FC<ImageStorageProviderProps> = ({
  children,
}) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const {deleteImage} = useDeleteImage()

  const addImages = async (files: File[]) => {
    // Mocked upload logic; replace with your actual upload logic
    const fileArray = Array.from(files);
    const urls = await Promise.all(fileArray.map((file) => UploadImages(file)));
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

    const deleteImages = async () => {
          await Promise.all(imageUrls.map((url) => deleteImage(url)));

    setImageUrls([]);
  };

  return (
    <ImageStorageContext.Provider
      value={{ imageUrls, addImages, deleteImages }}
    >
      {children}
    </ImageStorageContext.Provider>
  );
};

export default { ImageStorageProvider, ImageStorageContext };
