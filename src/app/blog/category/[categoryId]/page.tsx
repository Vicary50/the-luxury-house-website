import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import ScrollReveal from '@/components/layout/ScrollReveal';
import CategoryLinks from '@/components/blog/CategoryLinks';
import PostCard from '@/components/blog/PostCard';
import { blogCategories, getBlogPostsByCategory } from '@/lib/blog/blogData';

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    sub?: string;
  }>;
}

export function generateStaticParams() {
  return blogCategories.map((category) => ({
    categoryId: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const category = blogCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return {
      title: 'Category Not Found | The Luxury House Blog',
    };
  }

  return {
    title: `${category.name} | The Luxury House Blog`,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categoryId } = await params;
  const { sub } = await searchParams;
  const category = blogCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    notFound();
  }

  const posts = getBlogPostsByCategory(category.name);
  const filteredPosts = sub 
    ? posts.filter(post => post.subCategory === sub)
    : posts;

  return (
    <main>
      <PageHeader
        eyebrow={sub ? category.name : 'Blog'}
        title={sub ?? category.name}
        intro={
          <p>
            {sub ? `Explore our ${sub.toLowerCase()} articles in ${category.name.toLowerCase()}` : category.description}.{' '}
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}.
          </p>
        }
      />
      <CategoryLinks categoryId={category.id} subCategory={sub} />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {filteredPosts.length > 0 ? (
          <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <li key={post.id} data-reveal>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.05] text-ink">No articles found.</h2>
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-muted">We&apos;re working on adding more content to this category. Check back soon!</p>
            <Link
              href="/blog"
              className="mt-10 inline-flex min-h-12 items-center border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
            >
              See all posts
            </Link>
          </div>
        )}
      </div>
      <ScrollReveal />
    </main>
  );
}
