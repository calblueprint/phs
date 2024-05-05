'use client';

import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Link from 'next/link';
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

  return (
    <div className="bg-ivory h-full px-3 py-20">
      <div className="w-full h-5 justify-between items-center inline-flex">
        <h2 className="text-night font-medium">Latest News</h2>
        <Link
          className="b1 text-asparagus inline-flex items-center"
          href="/news"
        >
          See All
          <HiChevronRight className="text-2xl" />
        </Link>
      </div>
      {/* <div className="w-full h-7 justify-start items-center gap-12 inline-flex bg-red-500">
            <h2 className="w-full text-neutral-700 text-2xl font-semibold font-['Lato']">
                Latest News
            </h2>
            <Link
            className="b1 text-asparagus inline-flex items-center mr-4"
            href="/virtual-tours"
            >
                See All
                <HiChevronRight className="text-2xl" />
            </Link>
        </div> */}
      {/* <h2 className="text-night font-semibold mt-2"> Latest News </h2> */}
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
  );
}

export default HomeNewsFeed;
