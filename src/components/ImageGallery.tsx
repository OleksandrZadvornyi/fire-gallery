import { useState } from "react";
import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");

  const [imgClicked, setImgClicked] = useState(false);
  const [clickedImgUrl, setClickedImgUrl] = useState("");

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
              key={image.imageUrl}
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
                />
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
