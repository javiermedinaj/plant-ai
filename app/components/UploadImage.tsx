import React, { ChangeEvent } from 'react';


interface UploadImageProps {
    handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function UploadImage({ handleImageUpload }: UploadImageProps): JSX.Element {
    return (
      <div className="mb-8">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Upload a plant image
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100"
        />
      </div>
    );
  }
  