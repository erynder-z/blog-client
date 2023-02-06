import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import FilterContext from '../../../contexts/FilterContext';
import { IArticle } from '../../../interfaces/Article';
import { ViewType } from '../../../interfaces/customTypes';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './LatestArticles.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function LatestArticles({ setCurrentView }: Props) {
  const { setFilter } = useContext(FilterContext);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchArticleList('latest', setFullArticleList, setLoading, setError);
    setFilter(null);
    setCurrentView('Latest');
    localStorage.setItem('currentView', 'Latest');
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
  }

  return (
    <main className="latest-articles-list">
      {fullArticleList.length === 0 && <NoArticlePage />}
      {fullArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
