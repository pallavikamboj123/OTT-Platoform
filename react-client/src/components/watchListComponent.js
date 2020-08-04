import React from 'react';
import { Button  } from 'reactstrap';
import {Link} from 'react-router-dom';


function Renderdetails({auth}){
    if(auth.isAuthenticated){
        return(
            <div>
                you are authenticated.
            </div>
        );
    }
    else{
        return(
            <div style={{textAlign: 'center'}}>

                <h1>Looks like you are not logged in!</h1>
                <Link to="/home">
                    <Button className="btn btn-info">Click to go to home-page</Button>
                </Link>
            </div>
        );
    }
}

function RenderWatchList({auth}){
    return(
        <div className="container">
            <div className="row">
                <Renderdetails auth = {auth} />
            </div>
        </div>
    );
}
export default RenderWatchList;