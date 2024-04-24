'use client';

import React, { useEffect, useState } from 'react';
import BackButton from '../../components/userComponents/BackButton/BackButton';
import NavBar from '../../components/userComponents/navBar/navBar';
import { NewsRow } from '../../types/types';
import { fetchAllNewsByDate } from '../../supabase/news/queries';
import NewsDisplay from '../../components/userComponents/NewsDisplay/NewsDisplay';
import Footer from '../../components/userComponents/Footer/Footer';

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

  return (
    <div className="bg-ivory">
      <NavBar />
      <div className="p-4">
        <BackButton />
        <h1 className="text-night text-3xl font-bold mt-2 -ml-[1.8px]">News</h1>
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
      <Footer />
    </div>
  );
}
