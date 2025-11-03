import React from 'react';
import './CommentsPanelTemplate.scss'
import Checkbox_holo from '@re/Checkboxes/Checkbox_holo';
import ICON from '@/assets/comment-dots-solid-full.svg'
import useCommentStore from '@zustand/commentStore';
import Button3D from '@re/Buttons/Button3D';
import CommentWindow from './CommentWindow';
import TextArea3D from '@re/TextArea3D';
import CommentBox3D from '@re/CommentBox3D';


const CommentsPanelTemplate = ({recipeId})=>{

    const {getRecipeCommentsCount,getRecipeComments,addComment,updateComment,deleteComment} = useCommentStore();

    const [commentsCount,setCommentsCount] = React.useState( null);
    const [comments,setComments] = React.useState([]);
    const [showingComments,setShowingComment] = React.useState(false);
    const [showAddCommentWindow,setShowAddCommentWindow] = React.useState(false);

    const [newCommentText,setNewCommentText] = React.useState();

 

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
            console.log(comments)
            setComments(comments);
            setShowingComment(true);
        }
        
    }

    async function onAddComment(){
        const res = await addComment(recipeId,newCommentText);
        if (res.status === 1){
            const comments = await getRecipeComments(recipeId,true);
            setComments(comments);
            setShowAddCommentWindow(false);
            refreshCommentsCount();
        }
        
    }

    const renderComments = comments.map((c,idx)=>
        <CommentBox3D key={idx}
            {...c}
        />
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
                

               {    !showAddCommentWindow && 
                <Button3D className='commentBtn add' onClick={onWriteComment}>
                    Dodaj komentarz  <img src={ICON}/>
                </Button3D>}
            </div>

            {showAddCommentWindow &&
            <div className='commentWritter'>
                <TextArea3D width='100%' height='100px' expandable={true} maxChars={500} 
                    onTextChangeCb={(text)=>setNewCommentText(text)}
                    style={{color:"black"}}
                />
                
                <Button3D className='recipeBtn add img' onClick={onAddComment}>
                    Wyślij!
                </Button3D>
            </div>
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