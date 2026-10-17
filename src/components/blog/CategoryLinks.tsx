import Link from 'next/link';
import { blogCategories } from '@/lib/blog/blogData';

interface LinkItem {
  label: string;
  href: string;
  current: boolean;
}

function LinkRow({ label, items }: { label: string; items: LinkItem[] }) {
  return (
    <nav aria-label={label} className="border-b border-hairline bg-paper">
      <ul className="mx-auto flex max-w-7xl gap-x-8 overflow-x-auto px-5 sm:px-8 [scrollbar-width:none]">
        {items.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={`flex min-h-14 items-center border-b-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                item.current ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-olive'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Category row under the blog header; on a category page a second row lists its sub-categories.
export default function CategoryLinks({ categoryId, subCategory }: { categoryId?: string; subCategory?: string }) {
  const category = blogCategories.find((c) => c.id === categoryId);
  return (
    <>
      <LinkRow
        label="Blog categories"
        items={[
          { label: 'All posts', href: '/blog', current: !categoryId },
          ...blogCategories.map((c) => ({ label: c.name, href: `/blog/category/${c.id}`, current: c.id === categoryId })),
        ]}
      />
      {category?.subCategories && (
        <LinkRow
          label={`${category.name} topics`}
          items={[
            { label: `All ${category.name}`, href: `/blog/category/${category.id}`, current: !subCategory },
            ...category.subCategories.map((sub) => ({
              label: sub,
              href: `/blog/category/${category.id}?sub=${encodeURIComponent(sub)}`,
              current: sub === subCategory,
            })),
          ]}
        />
      )}
    </>
  );
}
