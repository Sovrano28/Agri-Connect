'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function UploadFarmlandPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!user || user.role !== 'landowner') {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">Only landowners can upload farmland listings.</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new listing
    const newListing = {
      id: `farm${Date.now()}`,
      type: 'farmland',
      title,
      description,
      price: parseFloat(price),
      priceUnit: 'per_acre_per_year',
      location,
      images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
      ownerId: user.id,
      size: parseFloat(size),
      soilType,
      reviews: [],
      avgRating: 0,
    };

    // Store in localStorage (in a real app, this would be an API call)
    const existingListings = JSON.parse(localStorage.getItem('agri-connect-farmland') || '[]');
    existingListings.push(newListing);
    localStorage.setItem('agri-connect-farmland', JSON.stringify(existingListings));

    toast({
      title: 'Farmland uploaded successfully!',
      description: 'Your farmland listing is now live.',
    });

    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6">Upload Farmland</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Farmland Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Fertile 50-Acre Farmland"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your farmland..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₦ per acre/year)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="150000"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="size">Size (acres)</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="50"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Ibadan, Oyo"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Loamy">Loamy</SelectItem>
                  <SelectItem value="Sandy Loam">Sandy Loam</SelectItem>
                  <SelectItem value="Clay">Clay</SelectItem>
                  <SelectItem value="Clay Loam">Clay Loam</SelectItem>
                  <SelectItem value="Sandy">Sandy</SelectItem>
                  <SelectItem value="Laterite">Laterite</SelectItem>
                  <SelectItem value="Swampy">Swampy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to use a default image
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">Upload Farmland</Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
