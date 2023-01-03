import React from 'react';
import format from 'date-fns/format';
import './PostItem.css';
import { IPost } from '../../../Interfaces/Post';
import { FaArrowRight, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  postData: IPost;
}

export default function PostItem({ postData }: Props) {
  const { _id, author, title, text, timestamp, image, tags, comments } = postData;

  const getTextExcerpt = (text: string) => {
    return text.substring(0, 40) + '...';
  };

  return (
    <Link to={`/post/${_id}`} className="post">
      <div className="post-top">
        <div className="post-head">
          <div className="timestamp">{format(new Date(timestamp), 'EEEE, dd. MMMM yyyy')}</div>
          <h1 className="post-title">{title}</h1>
          <div className="author">by {author?.username}</div>
        </div>
        <p className="post-text">{getTextExcerpt(text)}</p>
      </div>
      <div className="post-bottom">
        {comments.length} <FaRegCommentAlt />
        <div className="read_more">
          Read more <FaArrowRight />
        </div>
      </div>
    </Link>
  );
}
