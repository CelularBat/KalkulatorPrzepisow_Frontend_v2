import React from 'react';
import clsx from 'clsx'; 
import './TextArea3D.scss';

const TextArea3D = ({ initialText,initialTextUpdater,onTextChangeCb, width = '300px', height='150px', expandable=true, maxChars=500, className = '', style, ...rest }) => {

  const combinedClasses = clsx('TextArea3D', className);
/* In this component textContent isn't controlled by React (it was too messy with jumping pointer), but it's not a problem.
    text state is only used to calculate text.length and send it to parent. 

    Initial text value is passed as initialText, but it can't be used as controllable state
*/
  const [ text,setText] = React.useState("");
  const [maxLenLock,setMaxLenLock] = React.useState(false);

  const innerFrame_Ref = React.useRef(null);
  React.useEffect( ()=>{
    if (initialText === undefined) return;
    innerFrame_Ref.current.innerText = initialText;
  },[initialTextUpdater]);

  const handleInput = (e) => {
    let content = e.target.innerText;
    setText(content);
    if (onTextChangeCb){
        content = content.replace(/\n{3,}/g, '\n\n'); //trimming additional new lines
        content = content.slice(0, maxChars);
        onTextChangeCb(content);
    } 
    if (text.length >= maxChars-1){
        setMaxLenLock(true);
    }
    else{
        if(maxLenLock) setMaxLenLock(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    let paste = e.clipboardData.getData("text/plain");
    
    paste = paste.slice(0, maxChars - text.length );
    console.log(paste);
    document.execCommand("insertText", false, paste);
  };

  const handleKeyDown = (e) => {
    // zablokuj wpisywanie, gdy osiągnięto limit, z wyjątkiem klawiszy nawigacyjnych i kasowania
    if (maxLenLock &&
    !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        if (!(text.length >= maxChars-1)) setMaxLenLock(false);
    }
  };

  return (
    <div className={combinedClasses} 
    style={{
        width,
        ...(expandable ? { minHeight: height } : { height: height }),
        ...style
      }}
    {...rest}
    >
       
        <div className="frame-internal" ref={innerFrame_Ref}
            contentEditable={"plaintext-only"}
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            style={{
                ...(expandable ? {} : { overflow: 'hidden', height }),
              }}
           
        >
        
        </div> 

        <div className='chars-counter' 
        style={(maxLenLock? {color:'red',fontWeight:600}:{})}
        >
                {`${text.length}/${maxChars}`}
        </div>
      
    </div>
  );
};

export default TextArea3D;
