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
    <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index === 0 ? (
                <HomeIcon className="h-4 w-4 text-gray-400 mr-2" />
              ) : (
                <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
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