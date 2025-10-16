
'use client';
import { notFound } from "next/navigation"
import Image from "next/image"
import { farmlandListings, users } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Trees, User, Droplets, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useEffect, useState } from "react";

type FarmlandDetailPageProps = {
  params: {
    id: string
  }
}

export default function FarmlandDetailPage({ params }: FarmlandDetailPageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
      setIsClient(true);
  }, []);

  const listing = farmlandListings.find(l => l.id === params.id)

  if (!listing) {
    notFound()
  }

  const owner = users.find(u => u.id === listing.ownerId);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="w-full">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              width={800}
              height={600}
              className="w-full object-cover rounded-lg shadow-lg"
              data-ai-hint="farmland aerial view"
            />
          </div>
        </div>
        
        <div>
          <Badge variant="secondary" className="mb-2">
            <Trees className="h-4 w-4 mr-1" />
            Farmland
          </Badge>
          <h1 className="font-headline text-4xl font-bold mb-4">{listing.title}</h1>
          
          <div className="flex items-center gap-4 mb-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{listing.location}</span>
            </div>
            {listing.avgRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent" fill="currentColor" />
                {isClient && <span className="font-bold text-foreground">{listing.avgRating.toFixed(1)}</span>}
                {isClient && <span>({listing.reviews.length} reviews)</span>}
              </div>
            )}
          </div>

          <p className="text-lg text-foreground mb-6">{listing.description}</p>

          <Card className="mb-6 bg-secondary/30">
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="text-primary text-2xl font-bold">₦</div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-bold">{listing.price.toLocaleString()}<span className="font-normal text-sm">/acre/yr</span></p>
                </div>
              </div>
               <div className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-primary"/>
                <div>
                  <p className="text-sm text-muted-foreground">Soil Type</p>
                  <p className="font-bold capitalize">{listing.soilType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {owner && (
            <Card className="mb-6">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={owner.avatar} alt={owner.name} />
                        <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">Owner</p>
                        <p className="font-bold">{owner.name}</p>
                    </div>
                </CardHeader>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Lease This Land
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Calendar
                mode="range"
                className="rounded-md border"
              />
              <Button size="lg" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90">Request to Lease</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
