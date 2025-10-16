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
import { bookings } from "@/lib/data"
import { useAuth } from "@/lib/contexts";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function MyBookingsPage() {
    const { user } = useAuth();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const userBookings = user ? bookings.filter(b => b.userId === user.id) : [];

    if (!user) {
      return <div>Please log in to see your bookings.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-6">My Bookings</h1>
             <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Listing</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {userBookings.length > 0 ? userBookings.map(booking => (
                            <TableRow key={booking.id}>
                                <TableCell className="font-medium">{booking.listingTitle}</TableCell>
                                <TableCell>
                                    {isClient ? `${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}` : '...'}
                                </TableCell>
                                <TableCell>₦{booking.totalPrice.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}>
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">Details</Button>
                                </TableCell>
                            </TableRow>
                         )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                You have no bookings yet.
                                </TableCell>
                           </TableRow>
                         )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
