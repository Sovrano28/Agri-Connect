'use client';
import { useAuth, useLanguage } from '@/lib/contexts';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, MapPin } from 'lucide-react';
import { allListings } from '@/lib/data';

export default function MyBookingsPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [bookings, setBookings] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (user) {
            try {
                const storedBookings = JSON.parse(localStorage.getItem('agri-connect-bookings') || '[]');
                const myBookings = storedBookings.filter((b: any) => b.userId === user.id);

                // Enrich bookings with listing data
                const enrichedBookings = myBookings.map((booking: any) => {
                    const listing = allListings.find(l => l.id === booking.listingId);
                    return {
                        ...booking,
                        listing,
                    };
                });

                setBookings(enrichedBookings);
            } catch (error) {
                console.error('Failed to load bookings', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [user]);

    if (!isClient || isLoading) {
        return <div className="container mx-auto py-8 text-center">{t('loading')}</div>;
    }

    if (!user) {
        return (
            <div className="container mx-auto py-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Please log in</h2>
                <p className="text-muted-foreground mb-4">You need to be logged in to view your bookings.</p>
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="container mx-auto py-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No bookings yet</h2>
                <p className="text-muted-foreground mb-6">You haven&apos;t made any bookings yet. Start exploring our listings!</p>
                <Button asChild>
                    <Link href="/farmland">Browse Farmland</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">My Bookings</h1>

            <div className="grid gap-6">
                {bookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="flex">
                                {/* Listing Image */}
                                <div className="w-24 h-24 relative flex-shrink-0">
                                    {booking.listing?.images[0] ? (
                                        <Image
                                            src={booking.listing.images[0]}
                                            alt={booking.listing.title}
                                            fill
                                            className="object-cover rounded-l-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-muted rounded-l-lg flex items-center justify-center">
                                            <MapPin className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* Booking Details */}
                                <div className="flex-1 p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg mb-2">
                                                {booking.listing?.title || 'Unknown Listing'}
                                            </h3>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {isClient ? `${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}` : '...'}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4" />
                                                    <span>₦{booking.totalPrice?.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'}>
                                                {booking.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
