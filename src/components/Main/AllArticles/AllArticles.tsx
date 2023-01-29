import React, { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { fetchArticles } from '../../../helpers/FetchArticles';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import './AllArticles.css';

interface Props {
  filter: ITag | string | null;
}

export default function AllArticles({ filter }: Props) {
  const [activeArticleList, setActiveArticleList] = useState<IArticle[]>([]);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchArticles('all', setActiveArticleList, setFullArticleList, setLoading, setError);
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
      <div className="fetching">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="all-articles-list">
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
