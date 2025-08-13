"use client";

import Image from 'next/image';

interface StaticMapProps {
  className?: string;
}

export default function StaticMap({ className = '' }: StaticMapProps) {
  return (
    <div className={`w-full h-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center ${className}`}>
      <div className="relative w-full h-full">
        <Image
          src="https://maps.googleapis.com/maps/api/staticmap?center=38.8937545,-77.014576&zoom=12&size=600x400&scale=2&markers=color:red%7C38.8937545,-77.014576&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
          alt="Washington DC Map"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 p-3 rounded-lg shadow-md">
            <h3 className="font-bold text-lg">Washington DC</h3>
            <p className="text-sm text-gray-600">38.8937545, -77.014576</p>
          </div>
        </div>
      </div>
    </div>
  );
} 