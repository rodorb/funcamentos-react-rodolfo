import classNames from 'classnames';

import './TextArea.css';
import  { useEffect, useRef } from 'react';

const Textarea = ({ className, ...props }) => {
  const textAreaRef = useRef(null);//se usa para mantener la referencia, da igual cuiantas veces se renderice
  const rendersRef = useRef(0);
  // console.log(textAreaRef);

  useEffect(() => {
  console.log(textAreaRef);
  textAreaRef.current.focus();    
  }, []);

  useEffect(()=>{
    rendersRef.current++;
  });

  console.log('render', rendersRef.current);


  return (
  <div className={classNames('textarea', className)}>
    <textarea ref={textAreaRef} {...props} className="textarea-input" />
  </div>
)};

export default Textarea;
