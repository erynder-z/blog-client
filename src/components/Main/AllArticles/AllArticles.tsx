import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import FilterContext from '../../../contexts/FilterContext';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import { IArticle } from '../../../interfaces/Article';
import { ViewType } from '../../../interfaces/customTypes';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './AllArticles.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function AllArticles({ setCurrentView }: Props) {
  const { setFilter } = useContext(FilterContext);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchArticleList('all', setFullArticleList, setLoading, setError);
    setFilter(null);
    setCurrentView('All');
    localStorage.setItem('currentView', 'All');
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
  }

  return (
    <main className="all-articles-list">
      {fullArticleList.length === 0 && <NoArticlePage />}
      {fullArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
