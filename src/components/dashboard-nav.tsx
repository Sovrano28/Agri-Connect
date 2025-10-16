'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge, List, Calendar, User as UserIcon } from 'lucide-react';
import { useLanguage } from '@/lib/contexts';

const navItems = [
  { href: '/dashboard/listings', label: 'my_listings', icon: List },
  { href: '/dashboard/bookings', label: 'my_bookings', icon: Calendar },
  { href: '/dashboard/profile', label: 'profile', icon: UserIcon },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              pathname === item.href && 'bg-muted text-primary'
            )}
          >
            <Icon className="h-4 w-4" />
            {t(item.label as any)}
          </Link>
        );
      })}
    </nav>
  );
}
