/* src/Components/CommentBox3D.jsx */
import React from 'react';
import './CommentBox3D.scss';
import Button3D from './Buttons/Button3D';

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

const CommentBox3D = ({ author, createdAt, text,_id, _isDeleted,
  showReplyBtn=true, OnReply,
  showDeleteBtn=false,OnDelete,
  style }) => {
  return (
    <div className="CommentBox3D" style={{...style}}>
      <div className="frame-internal">
        <div className="comment-header">
          <span className="comment-date">{formatDate(createdAt)}</span>
          <span className="comment-author">{author}</span>
        </div>
        <div className="comment-text">{text}</div>
        
        <div className='comment-reply'>
        {!_isDeleted && showDeleteBtn &&
          <Button3D className='actionKey red' 
          onClick={() => OnDelete(_id)}>
            X
          </Button3D>
        }

        {!_isDeleted && showReplyBtn && 
          <Button3D className='commentBtn add' 
          style={{width:'15%',minWidth:'fit-content'}}
          onClick={()=>OnReply(_id)}>
            Odpowiedz
          </Button3D>
        }
        
        </div>
        
      </div>
    </div>
  );
};

export default CommentBox3D;
