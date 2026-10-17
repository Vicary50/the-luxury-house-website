import PageHeader from '@/components/layout/PageHeader';
import ScrollReveal from '@/components/layout/ScrollReveal';
import CategoryLinks from '@/components/blog/CategoryLinks';
import PostCard from '@/components/blog/PostCard';
import { blogPosts } from '@/lib/blog/blogData';

export const metadata = {
  title: 'Blog | The Luxury House - Luxury Holiday Insights & Travel Tips',
  description: 'Discover luxury travel insights, holiday tips, and local experiences at The Luxury House. Your guide to unforgettable luxury getaways.',
};

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lead = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post !== lead);

  return (
    <main>
      <PageHeader
        eyebrow="Blog"
        title="Plans, ideas"
        titleItalic="and the area around the house."
        intro={<p>Discover luxury travel insights, holiday tips, and local experiences at The Luxury House.</p>}
      />
      <CategoryLinks />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div data-reveal>
          <PostCard post={lead} lead />
        </div>

        <ul className="mt-24 grid gap-x-8 gap-y-16 border-t border-hairline pt-16 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.id} data-reveal>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
      <ScrollReveal />
    </main>
  );
}
