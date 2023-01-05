import React from 'react';
import format from 'date-fns/format';
import './PostPreview.css';
import { IPost } from '../../../Interfaces/Post';
import { FaArrowRight, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  postData: IPost;
}

export default function PostPreview({ postData }: Props) {
  const { _id, author, title, text, timestamp, image, tags, comments } = postData;

  const getTitleExcerpt = (title: string) => {
    return title.substring(0, 100) + '...';
  };

  const getTextExcerpt = (text: string) => {
    return text.substring(0, 75) + '...';
  };

  return (
    <Link to={`/post/${_id}`} className="post">
      <div className="post-top">
        <div className="post-head">
          <div className="timestamp">{format(new Date(timestamp), 'EEEE, dd. MMMM yyyy')}</div>{' '}
          {/*   <div className="author">by {author?.username}</div> */}
          <h1 className="post-title">{getTitleExcerpt(title)}</h1>
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
