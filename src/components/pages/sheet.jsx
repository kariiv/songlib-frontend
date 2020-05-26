import React from "react";
import '../../assets/scss/css.css'

export default () => {
    return (
        // <div className="card mb-4">
        //     <div className="card-body">
                <div className="sheet-container theme-dark">
                    <div className="sheet-wrapper">

                        <div id="youtube" style={{width: "100%", height: "fit-content"}}/>
                        <div className="sheet">
                            <a href="#" id="song-edit" style={{float: "right", marginLeft: "5px"}}><i className="fa fa-edit"/></a>
                            <span id="pageNumber" style={{float: "right"}}/>

                            <div className="titles">
                                <h3 id="title" className="title">Tere tulemast</h3>
                                <h6 id="artist" className="artist">Pohja Tallinn</h6>
                                <div id="tags-text" className="tags-text">#Eesti #E2P</div>
                                <span id="list1" className="dropdown-check-list hide" tabIndex="100">
                                    <span className="anchor">Tags</span>
                                    <ul id="list-items" className="items"/>
                                </span>
                            </div>
                            <div>
                                <p id="lyrics" className="lyrics">
                                    {`Test a$s t;;;tasd asdaStasdf ef adfsda gsadg adfg 
sdast34egaefad a sda sdd afs dgfsd gsrg wrg srg sr
asd asda sd s`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        //     </div>
        // </div>
    )
}