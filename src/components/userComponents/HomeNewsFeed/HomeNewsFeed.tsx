'use client';

import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import { NewsRow } from '../../../types/types';
import NewsDisplay from '../NewsDisplay/NewsDisplay';
import { fetchAllNewsByDate } from '../../../supabase/news/queries';


/**
 * @returns news feed page limited to 3 most recend entries, for home page.
 */
function HomeNewsFeed() {
  const [news, setNews] = useState<NewsRow[]>([]);
  useEffect(() => {
    // Get news
    const getNews = async () => {
      const fetchedNews: NewsRow[] = await fetchAllNewsByDate();
      const topThreeNews = fetchedNews.slice(0, 3);
      setNews(topThreeNews);
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
    <div className="flex flex-row px-2.5 py-20 md:px-56 md:py-28 gap-40
     justify-center items-center justify-start">
      {windowWidth > 768 && (
        <img
        className="object-cover object-center md:w-96 md:h-80 rounded-l"
        src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/HomePage_Raccoons.png"
        alt="background for spotlight"
        />)}
      <div className="w-full">
        <div className="w-full md:w-96 h-5 justify-between items-center flex">
          <h2 className="text-night font-medium">Latest News</h2>
          <Link
            className="b1 text-asparagus inline-flex items-center"
            href="/newsFeedPage"
          >
            See All
            <HiChevronRight className="text-2xl" />
          </Link>
        </div>
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

export default HomeNewsFeed;
