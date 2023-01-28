import React from 'react';
import format from 'date-fns/format';
import { stripHtml } from 'string-strip-html';
import './ArticlePreview.css';
import { IArticle } from '../../../interfaces/Article';
import { FaArrowRight, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  articleData: IArticle;
}

export default function ArticlePreview({ articleData }: Props) {
  const { _id, title, content, timestamp, comments } = articleData;

  const getTitleExcerpt = (title: string) => {
    const stringWithoutHTML = stripHtml(title).result;
    return stringWithoutHTML.length >= 100
      ? stringWithoutHTML.substring(0, 100) + '...'
      : stringWithoutHTML;
  };

  const getTextExcerpt = (text: string) => {
    const stringWithoutHTML = stripHtml(text).result;
    return stringWithoutHTML.length >= 100
      ? stringWithoutHTML.substring(0, 100) + '...'
      : stringWithoutHTML;
  };

  return (
    <Link to={`/article/${_id}`} className="article">
      <div className="layer"></div>
      <div className="article-top">
        <div className="article-head">
          <div className="timestamp">{format(new Date(timestamp), 'EEEE, dd. MMMM yyyy')}</div>{' '}
          <h1 className="article-title">{getTitleExcerpt(title)}</h1>
        </div>
        <p className="article-text">{getTextExcerpt(content)}</p>
      </div>
      <div className="article-bottom">
        {comments.length} <FaRegCommentAlt />
        <div className="read_more">
          <span> Read more</span> <FaArrowRight />
        </div>
      </div>
    </Link>
  );
}
