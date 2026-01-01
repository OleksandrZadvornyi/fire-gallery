import { useCallback, useState } from "react";
import useStorage from "../hooks/useStorage";
import { useDropzone } from "react-dropzone";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { startUpload, progress } = useStorage();

  // Configure the Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    }, // Only accept images
    multiple: false // Only allow one file at a time
  });

  const handleSubmitFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      startUpload(selectedFile);
    }
    setSelectedFile(null);
  };

  return (
    <div className="text-center mt-10">
      <form
        onSubmit={handleSubmitFunction}
        className="flex items-center flex-col gap-8"
      >
        {/* The Dropzone Area */}
        <div
          {...getRootProps()}
          className={`
            w-full max-w-lg p-10 border-2 border-dashed rounded-xl cursor-pointer transition-colors
            flex flex-col items-center justify-center gap-2
            ${isDragActive
              ? "border-primary bg-primary/10 text-primary" // Style when dragging over
              : "border-base-content/20 hover:border-primary hover:bg-base-200" // Normal style
            }
          `}
        >
          <input {...getInputProps()} />

          {/* Conditional UI inside the box */}
          {selectedFile ? (
            // If file is selected, show name
            <div className="flex flex-col items-center">
              <span className="text-xl">📄</span>
              <p className="font-bold mt-2">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          ) : (
            // If no file, show prompt
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="font-semibold">Drag & drop an image here</p>
              <p className="text-sm opacity-60">or click to select files</p>
            </>
          )}
        </div>

        {/* The Upload Button (Only visible when file is selected or uploading) */}
        {/* We disable the button if no file is selected OR if upload is in progress */}
        <button
          type="submit"
          className={`btn btn-primary gap-2 w-full max-w-xs ${Boolean(progress) && "loading"}`}
          disabled={!selectedFile || Boolean(progress)}
        >
          Upload 🚀
        </button>

        {/* Simple text progress */}
        {Boolean(progress) && <span className="text-xs">Uploading: {Math.round(progress)}%</span>}

      </form>
    </div>
  );
};

export default UploadForm;