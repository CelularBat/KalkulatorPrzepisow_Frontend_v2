import React from 'react';
import './CommentsPanelTemplate.scss'
import Checkbox_holo from '@re/Checkboxes/Checkbox_holo';
import ICON from '@/assets/comment-dots-solid-full.svg'
import useCommentStore from '@zustand/commentStore';
import Button3D from '@re/Buttons/Button3D';

const CommentsPanelTemplate = ({recipeId})=>{

    const {getRecipeCommentsCount} = useCommentStore();
    const [commentsCount,setCommentsCount] = React.useState( null);

    React.useEffect( ()=>{
        (async ()=>{
            const count = await getRecipeCommentsCount(recipeId);
            setCommentsCount(count);
        })()
      
    },[]);

    return (
        <div className='CommentsPanelTemplate'>
            <div className='header'>
                <Button3D>
        
                    {`Pokaż komentarze (${commentsCount})`}
                </Button3D>

                <Checkbox_holo className='comment'>
                    <img src={ICON}/>
                </Checkbox_holo>
            </div>
            
        </div>
    );
}

export default  CommentsPanelTemplate;