'use client';
import { useState } from 'react';
import ListingCard from '@/components/listing-card';
import { equipmentListings } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [category, setCategory] = useState('all');

  const locations = ['all', ...Array.from(new Set(equipmentListings.map(l => l.location)))];
  const categories = ['all', ...Array.from(new Set(equipmentListings.map(l => l.category)))];

  const filteredListings = equipmentListings.filter((listing) => {
    return (
      (listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (location === 'all' || listing.location === location) &&
      (category === 'all' || listing.category === category)
    );
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Equipment Marketplace</h1>
        <p className="text-muted-foreground mt-2">Find the right tools and machinery for your agricultural needs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 rounded-lg bg-card border">
        <Input
          placeholder="Search by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-1"
        />
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
          <SelectContent>
            {locations.map(loc => <SelectItem key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            {categories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>)}
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
          <p className="text-lg text-muted-foreground">No matching equipment found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
