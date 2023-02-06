import { format } from 'date-fns';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import CommentsSection from '../CommentsSection/CommentsSection';
import './ArticlePage.css';
import { fetchArticleContent } from '../../../helpers/FetchArticleContent';
import { stripHtml } from 'string-strip-html';
import Prism from 'prismjs';
import '../../../libraries/prism-laserwave.css';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { ViewType } from '../../../interfaces/customTypes';
import BackButton from '../BackButton/BackButton';
import { FaGlasses } from 'react-icons/fa';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function ArticlePage({ setCurrentView }: Props) {
  const params = useParams();
  let navigate = useNavigate();
  const id: string | undefined = params.id;

  const [article, setArticle] = useState<IArticle>();
  const [readingTime, setReadingTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);

  const titleWithoutHTML = article?.title ? stripHtml(article.title).result : '';
  const decodedString = decode(article?.content);

  const getReadingTime = () => {
    const wpm = 250;
    const words = decodedString.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    setReadingTime(time);
  };

  useEffect(() => {
    fetchArticleContent(id, setArticle, setLoading, setError);
  }, [id]);

  useEffect(() => {
    if (refetchTrigger) {
      fetchArticleContent(id, setArticle, setLoading, setError);
    }
  }, [refetchTrigger]);

  useEffect(() => {
    setRefetchTrigger(false);
  }, [refetchTrigger]);

  useEffect(() => {
    Prism.highlightAll();
    getReadingTime();
  }, [decodedString]);

  useEffect(() => {
    setCurrentView('Other');
    localStorage.setItem('currentView', 'Other');
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
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
        <div className="reading_time">
          <FaGlasses /> {readingTime} min
        </div>
        <article className="article-content" aria-label="Article Content">
          {parse(decodedString)}
        </article>
        <BackButton />
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
