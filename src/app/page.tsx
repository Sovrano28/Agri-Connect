'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { farmlandListings, equipmentListings } from '@/lib/data';
import ListingCard from '@/components/listing-card';
import { useLanguage } from '@/lib/contexts';

export default function Home() {
  const { t } = useLanguage();
  const featuredFarms = farmlandListings.slice(0, 2);
  const featuredEquipment = equipmentListings.slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600"
          alt="Lush farmland"
          fill
          className="object-cover"
          priority
          data-ai-hint="african farm landscape"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white shadow-lg">
            {t('hero_title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl">
            {t('hero_subtitle')}
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/farmland">{t('explore_farmland')}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/equipment">{t('rent_equipment')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
              {t('one_stop_hub')}
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {t('hero_description')}
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            {t('featured_listings')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredFarms.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            {featuredEquipment.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <Link href="/farmland">{t('view_all_listings')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
