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

export default function UploadEquipmentPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!user || user.role !== 'equipment-owner') {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">Only equipment owners can upload equipment listings.</p>
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
      id: `equip${Date.now()}`,
      type: 'equipment',
      title,
      description,
      price: parseFloat(price),
      priceUnit: 'per_day',
      location,
      images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800'],
      ownerId: user.id,
      category,
      condition,
      reviews: [],
      avgRating: 0,
    };

    // Store in localStorage (in a real app, this would be an API call)
    const existingListings = JSON.parse(localStorage.getItem('agri-connect-equipment') || '[]');
    existingListings.push(newListing);
    localStorage.setItem('agri-connect-equipment', JSON.stringify(existingListings));

    toast({
      title: 'Equipment uploaded successfully!',
      description: 'Your equipment listing is now live.',
    });

    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold font-headline mb-6">Upload Equipment</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Equipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., John Deere Tractor 5075E"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your equipment..."
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (₦ per day)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="75000"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tractor">Tractor</SelectItem>
                    <SelectItem value="Harvester">Harvester</SelectItem>
                    <SelectItem value="Planter">Planter</SelectItem>
                    <SelectItem value="Plough">Plough</SelectItem>
                    <SelectItem value="Sprayer">Sprayer</SelectItem>
                    <SelectItem value="Irrigation">Irrigation</SelectItem>
                    <SelectItem value="Processor">Processor</SelectItem>
                    <SelectItem value="Trailer">Trailer</SelectItem>
                    <SelectItem value="Cultivator">Cultivator</SelectItem>
                    <SelectItem value="Rake">Rake</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Kaduna, Kaduna"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
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
              <Button type="submit" className="flex-1">Upload Equipment</Button>
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
