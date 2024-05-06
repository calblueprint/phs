'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BackButton from '../../components/userComponents/BackButton/page';
import NavBar from '../../components/userComponents/navBar/navBar';
import { NewsRow } from '../../types/types';
import { fetchAllNewsByDate } from '../../supabase/news/queries';
import NewsDisplay from '../../components/userComponents/NewsDisplay/NewsDisplay';

/**
 * @description queries from the news table in supabase and fetches all the news rows to display
 * @returns news feed page by querying from the news table in supabase
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
    <div className="bg-ivory h-full">
      <NavBar />
      {windowWidth < 1024 && (
        <div>
          <div className="p-4">
            <BackButton />
            <h1 className="text-night text-3xl font-bold mt-2 -ml-[.113rem]">
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
          <div className="flex">
            <div className="w-[50%] text-night px-[10rem] pt-[7.5rem] bg-mint-cream flex flex-col items-center">
              <div>
                <p className="text-night">
                  {' '}
                  <Link href="/" className="text-scary-forest hover:underline">
                    {' '}
                    Home{' '}
                  </Link>{' '}
                  / News{' '}
                </p>
                <h1 className="text-night text-4xl font-bold pt-6">News</h1>
                <p className="pt-[2rem] text-night w-[311px]">
                  {' '}
                  PLACEHOLDER: Take a virtual sneak peek behind the scenes at
                  our Wildlife Care Center. Here you will find outside
                  enclosures where sick, injured, and orphaned wildlife
                  recuperate and acclimate before being released back into their
                  natural habitat.{' '}
                </p>
              </div>
            </div>
            <div className="w-[50%]  px-[10rem] pt-[7.5rem] flex justify-center">
              <ul className="pt-[4rem] m-auto">
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
