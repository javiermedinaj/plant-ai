'use client';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';

interface PlantResult {
  commonName: string;
  care: string;
}

export default function Home(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<PlantResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const cleanImage = (): void => {
    setSelectedImage(null);
    setResult(null);
  };

  const identifyPlant = async (): Promise<void> => {
    if (!selectedImage) return;

    setLoading(true);

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];

        const res = await fetch('/api/identify-plants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64data }),
        });

        if (res.ok) {
          const data = await res.json();
          setResult(data);
        } else {
          console.error('Error identifying plant');
        }

        setLoading(false);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error processing image:', error);
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source
          src="https://res.cloudinary.com/dubr40tiq/video/upload/v1725840091/plants.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta la etiqueta de video.
      </video>

      <div className="relative z-10 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-50 mt-16">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Plant Identifier</h1>
        
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

        {selectedImage && (
          <div className="mb-8">
            <Image src={selectedImage} alt="Selected plant" width={300} height={300} className="mx-auto rounded-lg" />
            <button
              onClick={identifyPlant}
              disabled={loading}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              {loading ? 'Identifying...' : 'Identify Plant'}
            </button>
          </div>
        )}

        {result && (
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">{result.commonName}</h2>
            <p className="text-green-700"><strong>Care:</strong> {result.care}</p>
          </div>
        )}
        <button onClick={cleanImage} className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out">Clean Image</button>
      </div>
    </main>
  );
}