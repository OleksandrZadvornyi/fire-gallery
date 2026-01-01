import { useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { useAuth } from "../hooks/useAuth"; 
import useDeleteImage from "../hooks/useDeleteImage";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  const { user } = useAuth(); 
  const { deleteImage } = useDeleteImage(); 

  const [imgClicked, setImgClicked] = useState(false);
  const [clickedImgUrl, setClickedImgUrl] = useState("");

  const handleDelete = async (e: React.MouseEvent, id: string, imageUrl: string) => {
    e.stopPropagation();
    
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (confirmDelete) {
        await deleteImage(id, imageUrl);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <>
      {!imgClicked && (
        <div className="grid md:grid-cols-3 justify-center gap-4 mt-10">
          {images.map((image) => (
            <div
              key={image.id}
              className="card card-compact w-full bg-base-100 shadow-xl"
            >
              <figure className="max-h-[15rem] cursor-pointer">
                <img
                  src={image.imageUrl}
                  alt="Image"
                  onClick={() => {
                    setImgClicked(true);
                    setClickedImgUrl(image.imageUrl);
                  }}
                  className="w-full h-full object-cover"
                />
                
                {/* 5. Conditional Render: Show delete button ONLY if user owns image */}
                {user?.email === image.userEmail && (
                  <button
                    className="btn btn-error btn-xs absolute bottom-2 right-2 opacity-90"
                    onClick={(e) => handleDelete(e, image.id, image.imageUrl)}
                  >
                    Delete
                  </button>
                )}
              </figure>
              <div className="card-body justify-end">
                <p className="flex-grow-0">Upload by: {image.userEmail}</p>
                <span>Created on: {image.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {imgClicked && (
        <img
          src={clickedImgUrl}
          alt="Clicked Image"
          className="fixed top-[50%] left-[50%] cursor-pointer translate-x-[-50%] translate-y-[-50%] w-[50%] max-h-[100vw]"
          onClick={() => setImgClicked(false)}
        />
      )}
    </>
  );
};

export default ImageGallery;
