import React, { useEffect, useState } from 'react';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import { filterArticles } from '../../../helpers/FilterArticles';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './LatestArticles.css';

interface Props {
  filter: ITag | string | null;
}

export default function LatestArticles({ filter }: Props) {
  const [activeArticleList, setActiveArticleList] = useState<IArticle[]>([]);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchArticleList('latest', setActiveArticleList, setFullArticleList, setLoading, setError);
  }, []);

  useEffect(() => {
    filterArticles(filter, fullArticleList, setActiveArticleList);
  }, [filter, fullArticleList]);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return (
      /*   <p aria-live="assertive">
        An error occurred: <span role="alert">{error.message}</span>
      </p> */
      <NotFoundPage />
    );
  }

  return (
    <main className="latest-articles-list">
      {activeArticleList.length === 0 && <NoArticlePage filter={filter} />}
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
