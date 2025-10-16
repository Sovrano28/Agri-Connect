'use client';
import { useState } from 'react';
import ListingCard from '@/components/listing-card';
import { farmlandListings } from '@/lib/data';
import type { FarmlandListing } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FarmlandPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [price, setPrice] = useState('all');
  const [size, setSize] = useState('all');

  const locations = ['all', ...Array.from(new Set(farmlandListings.map(l => l.location)))];

  const filteredListings = farmlandListings.filter((listing) => {
    const searchTermMatch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = location === 'all' || listing.location === location;
    
    const priceMatch = price === 'all' || (price === 'low' && listing.price < 150000) || (price === 'high' && listing.price >= 150000);
    const sizeMatch = size === 'all' || (size === 'small' && listing.size < 50) || (size === 'large' && listing.size >= 50);

    return searchTermMatch && locationMatch && priceMatch && sizeMatch;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Farmland Marketplace</h1>
        <p className="text-muted-foreground mt-2">Discover the perfect plot to cultivate your dreams.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 rounded-lg bg-card border">
        <Input
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
          <SelectContent>
            {locations.map(loc => <SelectItem key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger><SelectValue placeholder="Price" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Under ₦150,000/acre/yr</SelectItem>
            <SelectItem value="high">₦150,000+/acre/yr</SelectItem>
          </SelectContent>
        </Select>
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger><SelectValue placeholder="Size" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            <SelectItem value="small">Under 50 acres</SelectItem>
            <SelectItem value="large">50+ acres</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No matching farmland found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
