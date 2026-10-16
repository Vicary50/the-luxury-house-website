'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let name = segment;
      
      // Custom naming for specific routes
      switch (segment) {
        case 'activities':
          name = 'Activities & Dining';
          break;
        case 'booking':
          name = 'Book Your Stay';
          break;
        case 'info':
          name = 'Property Information';
          break;
        case 'blog':
          name = 'Blog';
          break;
        case 'terms':
          name = 'Terms & Conditions';
          break;
        case 'privacy-policy':
          name = 'Privacy Policy';
          break;
        case 'cookie-policy':
          name = 'Cookie Policy';
          break;
        case 'category':
          // Skip adding 'category' to breadcrumbs, will be handled by next segment
          return;
        default:
          // Format segment names (kebab-case to Title Case)
          name = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }
      
      // For blog category pages
      if (pathSegments[index - 1] === 'category' && pathSegments[index - 2] === 'blog') {
        name = `${name} Articles`;
      }
      
      breadcrumbs.push({
        name,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="border-b border-hairline bg-stone print:hidden" aria-label="Breadcrumb">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index === 0 ? (
                <HomeIcon className="h-4 w-4 text-muted mr-2" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-muted mx-2" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-ink" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted transition-colors duration-300 hover:text-olive"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}