import React from 'react';
import { IComment } from '../../../Interfaces/Comment';
import Comment from './Comment/Comment';
import { FaRegCommentAlt } from 'react-icons/fa';
import './CommentsSection.css';

interface Props {
  commentList: IComment[];
}

export default function CommentsSection({ commentList }: Props) {
  if (commentList.length == 0) {
    return (
      <div className="comment-section">
        <h2>No Comments</h2>
        <button className="add-comment-button">
          Add comment <FaRegCommentAlt />
        </button>
      </div>
    );
  } else {
    return (
      <div className="comment-section">
        <h2>{commentList.length} Comments</h2>

        <button className="add-comment-button">
          Add comment <FaRegCommentAlt />
        </button>
        {commentList?.map((comment) => (
          <div key={comment._id.toString()}>
            <Comment commentData={comment} />
          </div>
        ))}
      </div>
    );
  }
}
