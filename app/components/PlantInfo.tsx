import React from 'react';
import { PlantResult } from '../types/types';
interface PlantInfoProps {
  result: PlantResult | null;
}

export default function PlantInfo({ result }: PlantInfoProps): JSX.Element | null {
  if (!result) return null;

  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-green-800">
        {result.name}
      </h2>
      <p className="text-green-700">
        <strong>Common Name:</strong> {result.commonName}
      </p>
      <p className="text-green-700">
        <strong>Family:</strong> {result.family}
      </p>
      <p className="text-green-700">
        <strong>Care:</strong> {result.care}
      </p>
    </div>
  );
}