import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase/config";
import toast from "react-hot-toast";

const useDeleteImage = () => {
  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      await deleteDoc(doc(db, "images", id));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      toast.success("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  return { deleteImage };
};

export default useDeleteImage;