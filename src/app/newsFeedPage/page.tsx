'use client';

import React, { useEffect, useState } from 'react';
import BackButton from '../../components/userComponents/BackButton/page';
import NavBar from '../../components/userComponents/navBar/navBar';
import { NewsRow } from '../../types/types';
import { fetchAllNewsByDate } from '../../supabase/news/queries';
import NewsDisplay from '../../components/userComponents/NewsDisplay/NewsDisplay';


/**
 * @returns news feed page
 */
function App() {
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
    <div className="bg-ivory h-screen">
      <NavBar />
      <div className="p-4">
        <BackButton />
        <h1 className="text-night text-3xl font-bold mt-2 -ml-[1.8px]">
          News Feed
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
  );
}

export default App;
