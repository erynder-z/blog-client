import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import { IArticle } from '../../../interfaces/Article';
import { ViewType } from '../../../interfaces/customTypes';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './LatestArticles.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function LatestArticles({ setCurrentView }: Props) {
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchArticleList('latest', setFullArticleList, setLoading, setError);
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
