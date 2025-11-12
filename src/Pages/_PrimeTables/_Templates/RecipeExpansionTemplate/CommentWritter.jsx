/* src/Components/ReplyBox.jsx */
import React from 'react';
import TextArea3D from '@re/TextArea3D';
import Button3D from '@re/Buttons/Button3D';



const CommentWritter = ({ onTextChangeCb, onAddComment, onCancel, maxChars = 500 }) => {
    return (
        <div className='CommentWritter' style={{display:'flex',flexDirection:'row',gap:'10px'}}>
            <TextArea3D
                width='100%'
                height='100px'
                expandable={true}
                maxChars={maxChars}
                onTextChangeCb={onTextChangeCb}
                style={{ color: "black" }}
            />
            <div style={{display:'flex',flexDirection:'column', gap:'5px'}}>
                <Button3D className='recipeBtn add sqr' onClick={onAddComment}>
                    Wyślij!
                </Button3D>
                <Button3D className='recipeBtn clear small' onClick={onCancel}>
                    Anuluj
                </Button3D>
            </div>
            
        </div>
    );
}

export default CommentWritter;
