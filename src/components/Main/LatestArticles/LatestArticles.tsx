import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../../../helpers/FetchArticles';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import ArticleItem from '../ArticlePreview/ArticlePreview';
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
    fetchArticles('latest', setActiveArticleList, setFullArticleList, setLoading, setError);
  }, []);

  useEffect(() => {
    const filterForString = (filter: string) => {
      return fullArticleList.filter((article) => {
        return article.title.includes(filter) || article.content.includes(filter);
      });
    };

    const filterForTag = (filter: ITag) => {
      return fullArticleList.filter((article) =>
        article?.tags?.some((tag) => tag._id == filter?._id)
      );
    };

    const getFilterArticles = (filter: ITag | string | null) => {
      return typeof filter === 'string'
        ? filterForString(filter as string)
        : filterForTag(filter as ITag);
    };

    filter
      ? setActiveArticleList(getFilterArticles(filter))
      : setActiveArticleList(fullArticleList);
  }, [filter]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="latest-articles-list">
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
