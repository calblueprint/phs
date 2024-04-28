'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BackButton from '../../components/userComponents/BackButton/page';
import NavBar from '../../components/userComponents/navBar/navBar';
import { NewsRow } from '../../types/types';
import { fetchAllNewsByDate } from '../../supabase/news/queries';
import NewsDisplay from '../../components/userComponents/NewsDisplay/NewsDisplay';

/**
 * @returns news feed page
 */
export default function App() {
  const [news, setNews] = useState<NewsRow[]>([]);
  useEffect(() => {
    // Get news
    const getNews = async () => {
      const fetchedNews: NewsRow[] = await fetchAllNewsByDate();
      setNews(fetchedNews);
    };
    getNews();
  }, [news]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-ivory">
      <NavBar />
      {windowWidth < 1024 && (
        <div>
          <div className="p-4">
            <BackButton />
            <h1 className="text-night text-3xl font-bold mt-2 -ml-[1.8px]">
              News
            </h1>
            <ul>
              {news.map(article => (
                <NewsDisplay
                  key={article.updated_at}
                  id={article.id}
                  contentLink={article.content_link}
                  createdAt={article.created_at}
                  title={article.title}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      {windowWidth >= 1024 && (
        <div>
          <div className="ml-[400px] mt-[120px]">
            <p className="text-night">
              {' '}
              <Link href="/" className="text-scary-forest hover:underline">
                {' '}
                Home{' '}
              </Link>{' '}
              / News{' '}
            </p>
            <h1 className="text-night text-4xl font-bold mt-6">News</h1>
            <div>
              <ul className="ml-[21.875rem] ">
                {news.map(article => (
                  <NewsDisplay
                    key={article.updated_at}
                    id={article.id}
                    contentLink={article.content_link}
                    createdAt={article.created_at}
                    title={article.title}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
