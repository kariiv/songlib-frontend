import React from "react";

export default () => {
    return (
        <div className="controls">
            <a id="show-sidebar" className="btn btn-sm home-btn" style={{color: '#000'}}>
                <i className="fas fa-bars"/>
            </a>

            <div className="controls-box main-triggers">
            <span style={{display: 'block'}}>
                <div>
                    <span id="playlist">-</span>
                </div>
                <div>
                    <button type="button" id="player-prev"><i className="fa fa-arrow-left"/></button>
                    <button type="button" id="player-rand">Rand</button>
                    <button type="button" id="player-next"><i className="fa fa-arrow-right"/></button>
                </div>
            </span>
                <span className="devider"/>
                <div>
                    <div>
                        <span>Transpose:</span>
                    </div>
                    <button type="button" id="player-trans-down">
                        <i className="fa fa-arrow-down"/>
                    </button>

                    <span id="transpose">0</span>

                    <button type="button" id="player-trans-up">
                        <i className="fa fa-arrow-up"/>
                    </button>
                </div>
            </div>
        </div>
    )
}