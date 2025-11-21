import React from 'react';
import './CommentsPanelTemplate.scss'
import Checkbox_holo from '@re/Checkboxes/Checkbox_holo';
import ICON from '@/assets/comment-dots-solid-full.svg'
import useCommentStore from '@/API/commentStore';
import Button3D from '@re/Buttons/Button3D';
import CommentBox3D from '@re/CommentBox3D';
import CommentWritter from './CommentWritter';
import createCommentsTree from './commentsTreeBuilder';
import { useUserStore } from '@/API/userStore';



const CommentsPanelTemplate = ({recipeId})=>{
    const {G_UserName} = useUserStore()
    const {getRecipeCommentsCount,getRecipeComments,addComment,updateComment,deleteComment} = useCommentStore();

    const [commentsCount,setCommentsCount] = React.useState( null);
    const [comments,setComments] = React.useState([]);
    const [showingComments,setShowingComment] = React.useState(false);
    const [showAddCommentWindow,setShowAddCommentWindow] = React.useState(false);
    const [newCommentText,setNewCommentText] = React.useState();

    const [replyToCommentId, setReplyToCommentId] = React.useState(null);
    const [replyText, setReplyText] = React.useState('');

 

// On render
    React.useEffect( ()=>{
        refreshCommentsCount();
    },[]);

    async function refreshCommentsCount(){
        const count = await getRecipeCommentsCount(recipeId);
        setCommentsCount(count);
    }

    function onWriteComment(){
        setShowAddCommentWindow(true);
        onShowComments(false);
    }

    async function onShowComments(isShowing){
        if (isShowing){
            setShowingComment(false);
        }
        else{
            const comments = await getRecipeComments(recipeId);
            setComments(createCommentsTree(comments));
            setShowingComment(true);
        }
        
    }

    async function onAddComment(){
        const res = await addComment(recipeId,newCommentText);
        if (res.status === 1){
            const comments = await getRecipeComments(recipeId,true);
            setComments(createCommentsTree(comments));
            setShowAddCommentWindow(false);
            refreshCommentsCount();
        } 
    }

    async function onAddReply(_id){
        const res = await addComment(recipeId,replyText,_id);
        if (res.status === 1){
            const comments = await getRecipeComments(recipeId,true);
            setComments(createCommentsTree(comments));
            setReplyToCommentId(-1);
            refreshCommentsCount();
        } 
    }

    async function onDeleteComment(_id){
        console.log("id",_id)
        const res = await deleteComment(_id);
        if (res.status === 1){
            const comments = await getRecipeComments(recipeId,true);
            setComments(createCommentsTree(comments));
            setReplyToCommentId(-1);
            refreshCommentsCount();
        } 
    }

    const renderComments = comments.map((c,idx)=>
        <>
            <CommentBox3D key={idx} showReplyBtn={true} 
            {...c}
            OnReply={(id)=>setReplyToCommentId(id)}
            style={{ marginLeft: c.level * 7 }}
            showDeleteBtn={c.author === G_UserName}
            OnDelete={onDeleteComment}
            />

            {replyToCommentId === c._id &&
                <CommentWritter 
                onTextChangeCb={(text)=>setReplyText(text)}
                onAddComment={()=>onAddReply(c._id)}
                onCancel={()=>{setReplyToCommentId(-1)}}
                />
            }
        </>
    )

    return (
        <div className='CommentsPanelTemplate'>
            <div className='header'>
                { (commentsCount>0)?
                    <Button3D className='commentBtn add' onClick={()=>onShowComments(showingComments)}>
                        {showingComments ? `Ukryj komentarze (${commentsCount})` : `Pokaż komentarze (${commentsCount})`}
                    </Button3D>
                    :
                    <Button3D className='commentBtn disabled' disabled={true}> 
                        {`Pokaż komentarze (0)`}
                    </Button3D>

                }
                

               {!showAddCommentWindow && 
                    <Button3D className='commentBtn add' onClick={onWriteComment}>
                        Dodaj komentarz  <img src={ICON}/>
                    </Button3D>}
            </div>

            {showAddCommentWindow &&     
                <CommentWritter 
                onTextChangeCb={(text)=>setNewCommentText(text)}
                onAddComment={onAddComment}
                onCancel={()=>{setShowAddCommentWindow(false)}}
                />
            }

            { showingComments &&
                <div className='body'>
                    {renderComments}
                </div>
            }
            
        </div>
    );
}

export default  CommentsPanelTemplate;