'use client';
import { useAuth, useLanguage } from '@/lib/contexts';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List, Calendar, User as UserIcon } from 'lucide-react';
import { bookings, allListings } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return <div>{t('loading')}</div>;
  }
  
  if (!user) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Please log in</h2>
        <p className="text-muted-foreground">You need to be logged in to view the dashboard.</p>
        <Button asChild className="mt-4">
            <Link href="/login">Login</Link>
        </Button>
      </div>
    )
  }

  const userListings = allListings.filter(l => l.ownerId === user.id);
  const userBookings = bookings.filter(b => b.userId === user.id);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold font-headline">{t('welcome')}, {user.name}!</h1>
          <p className="text-sm text-muted-foreground capitalize">{user.role.replace('-', ' ')}</p>
        </div>
      </div>
      <p className="text-muted-foreground mb-8">Here's a summary of your activity on Agri-Connect.</p>
      
      {(user.role === 'landowner' || user.role === 'equipment-owner') && (
        <div className="mb-6">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href={user.role === 'landowner' ? '/dashboard/upload-farmland' : '/dashboard/upload-equipment'}>
              {user.role === 'landowner' ? t('upload_farmland') : t('upload_equipment')}
            </Link>
          </Button>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('my_listings')}</CardTitle>
            <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userListings.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('active_listings')}
            </p>
            <Button size="sm" variant="outline" className="mt-4" asChild>
                <Link href="/dashboard/listings">{t('manage_listings')}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('my_bookings')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userBookings.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('upcoming_bookings')}
            </p>
             <Button size="sm" variant="outline" className="mt-4" asChild>
                <Link href="/dashboard/bookings">{t('view_bookings')}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('profile')}</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user.role}</div>
            <p className="text-xs text-muted-foreground">
              {t('your_role')}
            </p>
             <Button size="sm" variant="outline" className="mt-4" asChild>
                <Link href="/dashboard/profile">{t('update_profile')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
