import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryNavigation from '@/components/blog/CategoryNavigation';
import CategoryHero from '@/components/blog/CategoryHero';
import CategoryPosts from '@/components/blog/CategoryPosts';
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
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryNavigation />
      
      <main>
        <CategoryHero 
          category={category} 
          subCategory={sub}
          postCount={filteredPosts.length}
        />
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CategoryPosts 
              posts={filteredPosts} 
              category={category}
              subCategory={sub}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}