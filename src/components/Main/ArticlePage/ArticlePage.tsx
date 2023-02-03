import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import CommentsSection from '../CommentsSection/CommentsSection';
import './ArticlePage.css';
import { fetchArticleData } from '../../../helpers/FetchArticleData';
import { stripHtml } from 'string-strip-html';
import Prism from 'prismjs';
import '../../../libraries/prism-laserwave.css';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ArticlePage() {
  const params = useParams();
  let navigate = useNavigate();
  const id: string | undefined = params.id;

  const [article, setArticle] = useState<IArticle>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);

  const titleWithoutHTML = article?.title ? stripHtml(article.title).result : '';
  const decodedString = decode(article?.content);

  const goToPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchArticleData(id, setArticle, setLoading, setError);
  }, [id]);

  useEffect(() => {
    if (refetchTrigger) {
      fetchArticleData(id, setArticle, setLoading, setError);
    }
  }, [refetchTrigger]);

  useEffect(() => {
    setRefetchTrigger(false);
  }, [refetchTrigger]);

  useEffect(() => {
    Prism.highlightAll();
  }, [decodedString]);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <p aria-live="assertive">An error occurred: {error.message}</p>;
  }

  return (
    <main className="article_page" role="main">
      <div className="article_container">
        <header className="article_header" aria-label="Article Header">
          <time className="timestamp" dateTime={new Date(article?.timestamp || '').toString()}>
            {format(new Date(article?.timestamp || ''), 'EEEE, dd. MMMM yyyy')}
          </time>
          <div className="author">by {article?.author?.username}</div>
        </header>
        <h1 className="article_title" aria-label="Article Title">
          {titleWithoutHTML}
        </h1>
        <ul className="tag-list" aria-label="Article Tags">
          {article?.tags?.map((tag: ITag) => (
            <li key={tag._id.toString()} className="tag-list-item">
              {tag.name}
            </li>
          ))}
        </ul>
        <article className="article-content" aria-label="Article Content">
          {parse(decodedString)}
        </article>
        <button className="backBtn" onClick={goToPreviousPage}>
          <FaArrowLeft /> go back
        </button>
        <aside className="comments_section">
          {article && (
            <CommentsSection
              commentList={article.comments}
              setRefetchTrigger={setRefetchTrigger}
              aria-label="Article Comments"
            />
          )}
          {!article && (
            <CommentsSection
              commentList={[]}
              setRefetchTrigger={setRefetchTrigger}
              aria-label="Article Comments"
            />
          )}
        </aside>
      </div>
    </main>
  );
}
