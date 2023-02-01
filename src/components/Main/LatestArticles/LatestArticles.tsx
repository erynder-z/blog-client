import React, { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
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
    const filterArticles = (filter: ITag | string | null) => {
      let filtered = fullArticleList;

      if (typeof filter === 'string') {
        // search comes from searchbar
        const filterLower = filter.toLowerCase();
        filtered = fullArticleList.filter(
          ({ title, content }) =>
            title.toLowerCase().includes(filterLower) || content.toLowerCase().includes(filterLower)
        );
      } else if (filter) {
        // search comes from tag
        filtered = fullArticleList.filter(({ tags = [] }) =>
          tags.some(({ _id }) => _id === filter._id)
        );
      }

      setActiveArticleList(filtered);
    };

    filterArticles(filter);
  }, [filter, fullArticleList]);

  if (loading) {
    return (
      <div className="fetching" aria-live="polite">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          aria-label="Loading articles"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <p aria-live="assertive">
        An error occurred: <span role="alert">{error.message}</span>
      </p>
    );
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
