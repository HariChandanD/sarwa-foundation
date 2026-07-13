'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient, isSuperAdmin } from '@/lib/supabase-client';
import {
  LayoutDashboard,
  FileText,
  DollarSign,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const getNavigation = (isSuperAdminUser: boolean) => [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Website Content',
    icon: FileText,
    children: [
      { name: 'Homepage', href: '/admin/dashboard/content/homepage' },
      { name: 'About', href: '/admin/dashboard/content/about' },
      { name: 'Programs', href: '/admin/dashboard/content/programs' },
      { name: 'Rescue Stories', href: '/admin/dashboard/content/stories' },
      { name: 'Gallery', href: '/admin/dashboard/content/gallery' },
      { name: 'Events', href: '/admin/dashboard/content/events' },
      { name: 'News', href: '/admin/dashboard/content/news' },
      { name: 'Contact Info', href: '/admin/dashboard/content/contact' },
      { name: 'Donation Settings', href: '/admin/dashboard/content/donation' },
      { name: 'Footer', href: '/admin/dashboard/content/footer' },
    ],
  },
  {
    name: 'Volunteers',
    href: '/admin/dashboard/volunteers',
    icon: Users,
  },
  {
    name: 'Activity Log',
    href: '/admin/dashboard/activity',
    icon: Activity,
  },
  ...(isSuperAdminUser
    ? [
        {
          name: 'Admin Management',
          href: '/admin/dashboard/admins',
          icon: Shield,
        },
      ]
    : []),
  {
    name: 'Settings',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'Website Content',
  ]);
  const [user, setUser] = useState<any>(null);
  const [isSuperAdminUser, setIsSuperAdminUser] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsSuperAdminUser(user ? isSuperAdmin(user) : false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsSuperAdminUser(session?.user ? isSuperAdmin(session.user) : false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigation = getNavigation(isSuperAdminUser);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children: any[]) =>
    children.some((child) => pathname === child.href);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-gray-200 p-6">
            <Image
              src="/logo.png"
              alt="SARWA"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="text-lg font-bold text-gray-900">SARWA Admin</div>
              <div className="text-xs text-gray-500">Management Portal</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const hasChildren = 'children' in item;
                const isExpanded = expandedItems.includes(item.name);
                const active = hasChildren
                  ? isParentActive(item.children!)
                  : isActive(item.href!);

                return (
                  <li key={item.name}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.name)}
                          className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                            active
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                            {item.children!.map((child) => (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className={`block rounded-lg px-4 py-2 text-sm transition-colors ${
                                    isActive(child.href)
                                      ? 'bg-primary/10 font-medium text-primary'
                                      : 'text-gray-600 hover:bg-gray-100'
                                  }`}
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          active
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-gray-200 p-4">
            <div className="mb-3 rounded-lg bg-gray-50 p-3">
              <div className="text-sm font-medium text-gray-900">
                {user?.user_metadata?.full_name || 'Admin User'}
              </div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 lg:hidden"
            >
              {sidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Website →
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Made with Bob
