import Image from 'next/image';
import Link from 'next/link';
import ClosingCta from '@/components/layout/ClosingCta';
import { blogCategories, type BlogPost as Post } from '@/lib/blog/blogData';

export default function BlogPost({ post }: { post: Post }) {
  const category = blogCategories.find((c) => c.name === post.category);

  return (
    <>
      <article>
        <header className="bg-stone pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            {category ? (
              <Link
                href={`/blog/category/${category.id}`}
                className="rise-in text-xs font-medium uppercase tracking-[0.2em] text-olive hover:text-olive-deep"
              >
                {post.category}
              </Link>
            ) : (
              <p className="rise-in text-xs font-medium uppercase tracking-[0.2em] text-olive">{post.category}</p>
            )}
            <h1 className="rise-in mt-5 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-light leading-[1.04] text-ink">
              {post.title}
            </h1>
            <p className="mt-8 text-[1.1875rem] leading-[1.7] text-muted">{post.excerpt}</p>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-hairline pt-6 text-sm">
              <div>
                <dt className="sr-only">Author</dt>
                <dd className="text-ink">{post.author}</dd>
                <dd className="text-muted">{post.authorRole}</dd>
              </div>
              <div>
                <dt className="sr-only">Published</dt>
                <dd className="text-ink">{post.date}</dd>
                <dd className="text-muted">{post.readTime} read</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="relative mx-auto aspect-[2/1] max-w-6xl overflow-hidden bg-stone sm:mt-0">
          <Image src={post.image} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        </div>

        <div
          className="prose-editorial mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mx-auto max-w-2xl px-5 pb-24 sm:px-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-olive">Tags</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
          <Link
            href="/blog"
            className="mt-14 inline-flex min-h-12 items-center border-b border-ink pb-1 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
          >
            <span aria-hidden="true" className="mr-2">←</span>Back to blog
          </Link>
        </footer>
      </article>
      <ClosingCta />
    </>
  );
}
