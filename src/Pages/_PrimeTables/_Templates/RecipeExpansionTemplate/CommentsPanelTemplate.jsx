import React from 'react';
import './CommentsPanelTemplate.scss'
import Checkbox_holo from '@re/Checkboxes/Checkbox_holo';
import ICON from '@/assets/comment-dots-solid-full.svg'
import useCommentStore from '@zustand/commentStore';
import Button3D from '@re/Buttons/Button3D';
import CommentWindow from './CommentWindow';

const CommentsPanelTemplate = ({recipeId})=>{

    const {getRecipeCommentsCount,getRecipeComments,addComment,updateComment,deleteComment} = useCommentStore();

    const [commentsCount,setCommentsCount] = React.useState( null);
    const [comments,setComments] = React.useState([]);
    const [showComments,setShowComments] = React.useState(false);
    const [showAddCommentWindow,setShowAddCommentWindow] = React.useState(false);

 

    React.useEffect( ()=>{
        (async ()=>{
            const count = await getRecipeCommentsCount(recipeId);
            setCommentsCount(count);
        })()
      
    },[]);

    function onWriteComment(){
        setShowAddCommentWindow(true);
        onShowComments();
    }

    async function onShowComments(){
        const comments = await getRecipeComments(recipeId);
        setComments(comments);
    }

    async function onAddComment(){
        setShowAddCommentWindow(false);
    }

    return (
        <div className='CommentsPanelTemplate'>
            <div className='header'>
                { (commentsCount>0)?
                    <Button3D className='commentBtn add' onClick={onShowComments}>
                        {`Pokaż komentarze (${commentsCount})`}
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
                <CommentWindow />
                
                <Button3D className='recipeBtn add img' onClick={onAddComment}>
                    Opublikuj!
                </Button3D>
            </div>
            }

            { showComments &&
            <div className='body'>

            </div>
            }
            
        </div>
    );
}

export default  CommentsPanelTemplate;