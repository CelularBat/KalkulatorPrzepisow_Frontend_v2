/* src/Components/CommentBox3D.jsx */
import React from 'react';
import './CommentBox3D.scss';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CommentBox3D = ({ author, createdAt, text }) => {
  return (
    <div className="CommentBox3D">
      <div className="frame-internal">
        <div className="comment-header">
          <span className="comment-date">{formatDate(createdAt)}</span>
          <span className="comment-author">{author}</span>
        </div>
        <div className="comment-text">{text}</div>
      </div>
    </div>
  );
};

export default CommentBox3D;
