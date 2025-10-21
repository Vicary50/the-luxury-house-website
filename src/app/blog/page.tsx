import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryNavigation from '@/components/blog/CategoryNavigation';
import BlogHero from '@/components/blog/BlogHero';
import TrendingSidebar from '@/components/blog/TrendingSidebar';
import PopularPosts from '@/components/blog/PopularPosts';
import AllArticles from '@/components/blog/AllArticles';

export const metadata = {
  title: 'Blog | The Luxury House - Luxury Holiday Insights & Travel Tips',
  description: 'Discover luxury travel insights, holiday tips, and local experiences at The Luxury House. Your guide to unforgettable luxury getaways.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CategoryNavigation />
      
      <main>
        {/* Hero Section with Featured Article and Trending Sidebar */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
              <div className="xl:col-span-2">
                <BlogHero />
              </div>
              <div className="xl:col-span-1">
                <TrendingSidebar />
              </div>
            </div>
          </div>
        </section>

        {/* Most Popular Posts */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PopularPosts />
          </div>
        </section>

        {/* All Articles */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AllArticles />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}