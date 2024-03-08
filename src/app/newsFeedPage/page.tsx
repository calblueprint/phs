'use client';

import React, { useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import NavBar from '../../components/userComponents/navBar/navBar';
import { NewsRow } from '../../types/types';
import { fetchAllNewsByDate } from '../../supabase/news/queries';
import NewsDisplay from '../../components/userComponents/NewsDisplay/NewsDisplay';

/**
 * used as an onClick which goes back to previous page 
 */
/**
 * @param evt on click of button
 */
function goBack(evt: React.SyntheticEvent) {
  // ignore the native anchor action
  evt.preventDefault();

  window.history.back();
}

/**
 * @returns back button
 */
function BackButton() {
  return (
    <button type="button" onClick={goBack} className="text-scary-forest">
      {' '}
      <IoIosArrowRoundBack size={40} />
    </button>
  );
}

/**
 * @returns The news feed page
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
        <h1 className="text-night text-3xl font-bold mt-2">News Feed</h1>
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
