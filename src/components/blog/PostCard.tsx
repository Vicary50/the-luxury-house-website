import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog/blogData';

// lead = the wide first card on the blog index (photo left, text right on desktop).
export default function PostCard({ post, lead = false }: { post: BlogPost; lead?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`group block ${lead ? 'lg:grid lg:grid-cols-12 lg:items-center lg:gap-16' : ''}`}>
      <div className={`relative aspect-[3/2] overflow-hidden bg-stone ${lead ? 'lg:col-span-7' : ''}`}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes={lead ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>
      <div className={lead ? 'mt-8 lg:col-span-5 lg:mt-0' : 'mt-6'}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-olive">{post.category}</p>
        <h2 className={`mt-3 font-display leading-tight text-ink transition-colors duration-300 group-hover:text-olive ${lead ? 'text-[clamp(2rem,3.5vw,3rem)] font-light' : 'text-[1.75rem]'}`}>
          {post.title}
        </h2>
        <p className={`mt-3 text-muted ${lead ? 'text-[1.0625rem] leading-[1.75]' : 'line-clamp-3 leading-[1.7]'}`}>{post.excerpt}</p>
        <p className="mt-4 text-sm text-muted">
          {post.date} <span aria-hidden="true">·</span> {post.readTime} read
        </p>
      </div>
    </Link>
  );
}
