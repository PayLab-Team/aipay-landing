import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

export interface BlogMeta {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export function getBlogSlugs(locale: string): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getBlogPost(locale: string, slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    content,
  };
}

export function getAllBlogPosts(locale: string): BlogMeta[] {
  return getBlogSlugs(locale)
    .map((slug) => getBlogPost(locale, slug))
    .filter((p): p is BlogPost => p !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
