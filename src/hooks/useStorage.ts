import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

const useStorage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const startUpload = (file: File) => {
    if (!file) {
      return;
    }

    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];
    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
        toast.error("Upload failed! ❌");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProgress(progress);

        await addDoc(collection(db, "images"), {
          imageUrl: downloadURL,
          createdAt: serverTimestamp(),
          userEmail: user?.email,
        });

        toast.success("Image uploaded successfully! 🎉");

        // Reset progress after a delay so the bar disappears cleanly
        setTimeout(() => setProgress(0), 1000);
      }
    );
  };

  return { progress, error, startUpload };
};

export default useStorage;
