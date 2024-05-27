'use client';

import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
import { NewsRow } from '../../../../types/types';
import NewsDisplay from '../../NewsDisplay/NewsDisplay';
import { fetchAllNewsByDate } from '../../../../supabase/news/queries';
import { useWebDeviceDetection } from '../../../../context/WindowWidthContext/WindowWidthContext';

/**
 * @returns news feed page limited to 3 most recend entries, for home page.
 */
function HomeNewsFeed() {
  const isWebDevice = useWebDeviceDetection();
  const [news, setNews] = useState<NewsRow[]>([]);

  useEffect(() => {
    // Get news
    const getNews = async () => {
      const fetchedNews: NewsRow[] = await fetchAllNewsByDate();
      const topThreeNews = fetchedNews.slice(0, 3);
      setNews(topThreeNews);
    };
    getNews();
  }, []);

  return (
    <div
      className="w-full flex flex-row px-2.5 py-20 web:px-56 web:py-28 gap-40
     justify-center items-center"
    >
      {isWebDevice && (
        <img
          className="object-cover object-center w-96 h-80 rounded-l"
          src="https://qkkuacqtcsfjbnzmxmhk.supabase.co/storage/v1/object/public/images/HomePage_Raccoons.png"
          alt="background for spotlight"
        />
      )}
      <div className="w-full">
        <div className="w-full web:w-96 h-5 justify-between items-center flex">
          <h2 className="text-night font-medium">Latest News</h2>
          <Link
            className="b1 inline-flex items-center
            text-asparagus hover:text-hunter-green focus:text-hunter-green"
            href="/news"
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
