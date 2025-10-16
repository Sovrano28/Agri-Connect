import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Trees, Tractor } from 'lucide-react';
import type { AnyListing } from '@/lib/types';

type ListingCardProps = {
  listing: AnyListing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const isFarmland = listing.type === 'farmland';
  const detailUrl = `/${listing.type}/${listing.id}`;

  const renderPrice = () => {
    if (isFarmland) {
      return (
        <span className="font-semibold text-lg">
          ₦{listing.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/acre/year</span>
        </span>
      );
    }
    return (
      <span className="font-semibold text-lg">
        ₦{listing.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/day</span>
      </span>
    );
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Link href={detailUrl}>
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={400}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={isFarmland ? "farmland aerial view" : "tractor farm"}
          />
        </Link>
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
        >
          {isFarmland ? <Trees className="mr-1 h-3 w-3" /> : <Tractor className="mr-1 h-3 w-3" />}
          {listing.type}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2 leading-tight h-14 hover:text-primary">
          <Link href={detailUrl}>{listing.title}</Link>
        </CardTitle>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{listing.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-secondary/30">
        <div className="flex items-center gap-1 text-primary">
          {renderPrice()}
        </div>
        {listing.avgRating > 0 && (
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 text-accent" fill="currentColor" />
            <span className="font-bold text-foreground">{listing.avgRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({listing.reviews.length})</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
