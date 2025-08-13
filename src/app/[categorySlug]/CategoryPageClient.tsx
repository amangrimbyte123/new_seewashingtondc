'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Components
import CategoryHeader from '@/components/categories/CategoryHeader';
import SubcategoryButtons from '@/components/categories/SubcategoryButtons';
import ListingFilters from '@/components/listings/ListingFilters';
import ListingGrid from '@/components/listings/ListingGrid';

// Types
import { Place } from '@/lib/types';

interface CategoryPageClientProps {
  initialCategory: any;
  initialSubcategories: any[];
  initialPlaces: Place[];
  categorySlug: string;
}

export default function CategoryPageClient({
  initialCategory,
  initialSubcategories,
  initialPlaces,
  categorySlug
}: CategoryPageClientProps) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(initialPlaces);
  const [category] = useState(initialCategory);
  const [allSubcategories] = useState(initialSubcategories);

  // Update filtered places when places change
  useEffect(() => {
    setFilteredPlaces(places);
  }, [places]);

  const handleFilterChange = (filters: {
    price: string[];
    rating: number | null;
    amenities: string[];
  }) => {
    let filtered = [...places];

    // Apply price filter
    if (filters.price.length > 0) {
      filtered = filtered.filter(place => 
        place.price_range && filters.price.includes(place.price_range)
      );
    }

    // Apply rating filter
    if (filters.rating !== null) {
      filtered = filtered.filter(place => 
        place.rating && place.rating >= filters.rating!
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(place => 
        filters.amenities.every(amenity => 
          place.amenities?.some(a => a.name === amenity)
        )
      );
    }

    setFilteredPlaces(filtered);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8 animate-bounce">
            <svg
              className="mx-auto h-24 w-24 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CategoryHeader 
        title={category.name}
        description={`Explore ${category.name} in Washington DC`}
        imageUrl={category.image_url}
      />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition">Home</Link>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-gray-500">/</span>
              <span className="text-gray-600">{category.name}</span>
            </li>
          </ol>
        </nav>
      </div>
      
      {/* Related subcategories */}
      {allSubcategories.length > 0 && (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium mb-3 inline-block">Explore</span>
            <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl">Discover more categories in this section</p>
          </div>
          <SubcategoryButtons subcategories={allSubcategories} categorySlug={categorySlug} />
        </section>
      )}
      
      {/* Listings section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-3 inline-block">Places</span>
          <h2 className="text-3xl font-bold mb-2">{filteredPlaces.length} Places in {category.name}</h2>
          <p className="text-lg text-gray-600 max-w-2xl">Browse through our curated selection of places</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <ListingFilters onFilterChange={handleFilterChange} />
          </div>
          
          <div className="w-full lg:w-3/4">
            <ListingGrid places={filteredPlaces} />
          </div>
        </div>
      </section>
    </div>
  );
} 