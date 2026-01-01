import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase/config";

const useDeleteImage = () => {
  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      // 1. Delete the record from Firestore
      await deleteDoc(doc(db, "images", id));

      // 2. Delete the file from Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return { deleteImage };
};

export default useDeleteImage;