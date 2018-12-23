import React, { useState } from 'react';
import styled from '@emotion/styled';


const ReeychApp = (props) => {
    const [state, setState] = useState({
        data: "~shrug~"
    })

    return (
        <div id={`reeych-root`}>
            {state.data}
            {props.spaceId}
        </div>
    )
}

export default ReeychApp;