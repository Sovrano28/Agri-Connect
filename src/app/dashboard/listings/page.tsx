'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { allListings } from "@/lib/data"
import { useAuth } from "@/lib/contexts";
import Link from 'next/link';

export default function MyListingsPage() {
    const { user } = useAuth();
    const userListings = user ? allListings.filter(l => l.ownerId === user.id) : [];

    if (!user) {
      return <div>Please log in to see your listings.</div>
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold font-headline">My Listings</h1>
                <Button>Add New Listing</Button>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userListings.length > 0 ? userListings.map(listing => (
                        <TableRow key={listing.id}>
                            <TableCell className="font-medium">{listing.title}</TableCell>
                            <TableCell><Badge variant="outline">{listing.type}</Badge></TableCell>
                            <TableCell>{listing.location}</TableCell>
                            <TableCell>₦{listing.price.toLocaleString()}
                                <span className="text-xs text-muted-foreground">
                                    {listing.priceUnit === 'per_day' ? '/day' : '/acre/yr'}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/${listing.type}/${listing.id}`}>View</Link>
                                </Button>
                                <Button variant="outline" size="sm">Edit</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        )) : (
                           <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                You have no listings yet.
                                </TableCell>
                           </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
