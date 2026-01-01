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
        <div className="columns-1 md:columns-3 gap-4 mt-10 mx-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="card card-compact w-full bg-base-100 shadow-xl group break-inside-avoid mb-4"
            >
              <figure className="cursor-pointer relative">
                <img
                  src={image.imageUrl}
                  alt="Image"
                  onClick={() => {
                    setImgClicked(true);
                    setClickedImgUrl(image.imageUrl);
                  }}
                  className="w-full rounded-t-xl"
                />
                
                {/* 5. Conditional Render: Show delete button ONLY if user owns image */}
                {user?.email === image.userEmail && (
                  <button
                    className="btn btn-error btn-xs absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => handleDelete(e, image.id, image.imageUrl)}
                  >
                    Delete
                  </button>
                )}
              </figure>
              <div className="card-body">
                <p className="text-sm">Upload by: {image.userEmail}</p>
                <span className="text-xs text-gray-500">
                  {image.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {imgClicked && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setImgClicked(false)}
        >
             <img
              src={clickedImgUrl}
              alt="Clicked Image"
              className="max-w-[90vw] max-h-[90vh] object-contain cursor-pointer"
            />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
