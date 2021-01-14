import React  from 'react';

import Jokes from './jokes';
import Recent from './recent';

export default ({player}) => {
    return (
        <React.Fragment>
            <h1 className="text-gray-800 text-center">Welcome back!</h1>
            <Recent player={player}/>
            <Jokes/>
        </React.Fragment>
    )
};

