import React from "react";

export default ({link, show, load, onClick, onLoad}) => {
    return (
    <Card className="shadow border-left-primary video-card" style={show ?{}:{width:0}}>
      <Card.Body className='p-0'>
            <span className="btn-circle btn-danger shadow-sm video-button" 
                        style={{marginLeft:show? '-1.5rem':'-2.2rem', borderRadius:show? '50%':'50% 0 0 50%'}}
                    onClick={onClick}>
                  <i className={"fas fa-sm text-white-50 " + (show? 'fa-angle-right':'fa-angle-left')}/>
            </span>
                        
            {(show || load) && <iframe title='Yt' onLoad={onLoad} frameBorder={0} width='100%' height={120} allowFullScreen={0} src={link} style={{marginBottom:-7}}/>}
      </Card.Body>
   </Card>
    )
}