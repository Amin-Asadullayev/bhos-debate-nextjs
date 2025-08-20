import { NextResponse } from 'next/server';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from '@/lib/firebase';
function urlEntry(loc, lastmod) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

export async function GET() {
  const db = getDatabase(app);
  const blogsSnap = await get(ref(db, 'blogs'));
  const newsSnap = await get(ref(db, 'news'));
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;

  let urls = '';

  if (blogsSnap.exists()) {
    const blogs = blogsSnap.val();
    urls += Object.keys(blogs)
      .map(id => {
        const lastmod = blogs[id].date
          ? new Date(blogs[id].date).toISOString()
          : new Date().toISOString();
        return urlEntry(`${baseUrl}/blog/${id}`, lastmod);
      })
      .join('');
  }

  if (newsSnap.exists()) {
    const news = newsSnap.val();
    urls += Object.keys(news)
      .map(id => {
        const lastmod = news[id].date
          ? new Date(news[id].date).toISOString()
          : new Date().toISOString();
        return urlEntry(`${baseUrl}/news/${id}`, lastmod);
      })
      .join('');
  }

  const staticUrls = `
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
