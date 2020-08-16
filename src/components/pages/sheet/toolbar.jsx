import React, { useState } from "react";
import copy from 'copy-to-clipboard';
import {Row, Col} from 'react-bootstrap';
import '../../../assets/scss/sheet-toolbar.scss'

export const EditToolbar = ({onDelete, onLeave, onSave}) => {
    return (
         <span className='flying-button text-center'>
            {onDelete && 
               <span className="btn-circle btn-sm btn-danger shadow-sm mb-2" onClick={onDelete}>
                  <i className="fas fa-trash fa-sm text-white-50"/>
               </span>}
               
            <span className="btn-circle btn-warning shadow-sm mb-2" onClick={onLeave}>
               <i className="fas fa-door-open fa-sm text-white-50"/>
            </span>
            
            <span className="btn-circle btn-lg btn-success shadow-sm" onClick={onSave}>
               <i className="fas fa-check fa-sm text-white-50"/>
            </span>
         </span>
    )
}


export const SheetToolbar = ({onEdit, onFontIn, onFontOut, onFontReset, onScroll, copyText, fontSize, autoscroll}) => {
    return (
        <span className='flying-button text-center'>
            <CopyButton text={copyText}/>
            
            <span className="btn-circle btn-warning shadow-sm mb-2" onClick={onEdit}>
               <i className="fas fa-edit fa-sm text-white-50"/>
            </span>
            
            <span>
                  <span className="btn-circle btn-success shadow-sm mb-2" 
                      style={{borderRadius:'50% 0 0 50%'}}
                      onClick={onFontIn}>
                        <i className="fas fa-plus fa-sm text-white-50"/>
                  </span>
                  
                  <span className='bg-success text-white-50 p-2 shadow-sm' onClick={onFontReset}>{fontSize}</span>
                  
                  <span className="btn-circle btn-success shadow-sm mb-2" 
                      style={{borderRadius:'0 50% 50% 0'}}
                      onClick={onFontOut}>
                        <i className="fas fa-minus fa-sm text-white-50"/>
                  </span>
            </span>
            
            <span className={"btn btn-icon-split " + (autoscroll? 'btn-success':'btn-primary')} onClick={onScroll}>
                  <span className='icon text-white-50'>
                        <i className="fas fa-angle-down fa-sm text-white-50"/>
                  </span>
                  
                  <span className='text'>Autoscroll</span>
            </span>
      </span>
    )
}


export const NavToolbar = ({prev, next, rand, down, up, text}) => {
   const {now, total, level} = text;
   return (
      <Row className='mb-2'>
         <Col className='text-left align-self-start pl-1 pr-0'>
            <span className="btn-circle btn-primary shadow-sm" onClick={prev}>
               <i className="fas fa-angle-left fa-sm text-white-50"/>
            </span>
                        
            <strong className='text-black mr-1 ml-1' onClick={rand}>{now}/{total}</strong>
                        
            <span className="btn-circle btn-primary shadow-sm" onClick={next}>
               <i className="fas fa-angle-right fa-sm text-white-50"/>
            </span>

            <span className="btn-circle btn-sm btn-info shadow-sm ml-3" onClick={down}>
               <i className="fas fa-angle-down fa-sm text-white-50"/>
            </span>
                        
            <strong className='text-black mr-1 ml-1'>{level}</strong>
                        
            <span className="btn-circle btn-sm btn-info shadow-sm" onClick={up}>
               <i className="fas fa-angle-up fa-sm text-white-50"/>
            </span>
         </Col>
      </Row>
   )
}

const CopyButton = ({text}) => {
   const [copied, setCopy] = useState(false)
   return (
      <span className="btn-circle btn-sm btn-danger shadow-sm mb-2" onClick={() => { 
            copy(text);
            setCopy(true);
            setTimeout(() => setCopy(false),1700);
                  }}>
         {!copied && <i className="fas fa-clipboard fa-sm text-white-50"/>}
         {copied && <i className="fas fa-check fa-sm text-white-50"/>}
      </span>
   )
}