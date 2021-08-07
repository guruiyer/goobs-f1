import './App.less';
import React from 'react';
import { useParams, withRouter } from "react-router";

export const RaceDetails = (props) => {
    const params = useParams()      
    return ( 
        <div>
            {params.id}
        </div>
    );
}

export default withRouter(RaceDetails);

