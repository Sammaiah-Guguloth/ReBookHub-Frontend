import React from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

const FileUploadDropBox = ({ files, setFiles, isCover = false }) => {
  const onDrop = (acceptedFiles) => {
    const filteredFiles = acceptedFiles.filter(file =>
      ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
    );

    const previewFiles = filteredFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    if (isCover) {
      setFiles(previewFiles[0] || null); // Allow only one cover image
    } else {
      setFiles(prevFiles => [...prevFiles, ...previewFiles]); // Multiple true images
    }
  };

  const removeFile = (index) => {
    if (isCover) {
      setFiles(null);
    } else {
      setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
          isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <AiOutlineCloudUpload className="text-6xl  mb-4 text-validated-green" />
          {isDragActive ? (
            <p className="text-lg font-medium text-green-500">Drop the files here ...</p>
          ) : (
            <p className="text-lg font-medium text-gray-500">Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {files && (Array.isArray(files) ? files : [files]).map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.preview}
              alt="Uploaded preview"
              className="w-20 h-20 object-cover rounded-md shadow-md"
            />
            <button
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
              onClick={() => removeFile(index)}
            >
              <AiOutlineClose />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadDropBox;
