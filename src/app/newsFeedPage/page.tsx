'use client';

import React, { useEffect, useState} from 'react';
import NavBar from '../../components/userComponents/navBar/navBar';
import { NewsRow } from '../../types/types';
import { fetchAllNewsByDate } from '../../supabase/news/queries';
import NewsDisplay from '../../components/userComponents/NewsDisplay/NewsDisplay'
import { IoIosArrowRoundBack } from "react-icons/io";

function goBack(evt: React.SyntheticEvent) {
  // ignore the native anchor action
  evt.preventDefault();

  history.back();
}

const BackButton = () => {
  return (
    <button style={{backgroundColor: '#4b711d'}} onClick={goBack}>  <IoIosArrowRoundBack size={40}/></button>
  );
};

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
    <div style={{ backgroundColor: '#ebf0e4', height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '16px' }}>
        <BackButton/>
        <h1 style={{ color: '#333333', fontSize: '2rem', fontWeight: 700 }}> 
          News Feed
        </h1>
        <ul>
          {news.map((article) => (
            <NewsDisplay 
              key={article.updated_at} 
              id={article.id} 
              content_link={article.content_link}  
              created_at={article.created_at} 
              title={article.title} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
