import React from 'react';
import './CommentWindow.scss';

const CommentWindow = ()=>{
    const [commentText,setCommentText] = React.useState("");

    return (
        <div className="CommentWindow">
            <textarea className='commentArea'
                value = {commentText}
                onChange = {(e)=>setCommentText(e.target.value)}
                > 

            </textarea>
        </div>
    )
}

export default CommentWindow;