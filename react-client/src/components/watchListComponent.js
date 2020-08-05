import React from 'react';
import { Button  } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderItem({item}){
    return(
        <>
        your watchlist
        </>
    );

}
function RenderWatchList({watchlist}){
    return watchlist.map((item) => {
        return <RenderItem item ={item} />
    })
}

function Renderdetails({auth, watchlist}){
    if(auth.isAuthenticated){
        return(
            <div>
                <h2>Hello {auth.user.username}, Here is your watchlist</h2>
                <RenderWatchList watchlist= {watchlist} />
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

function RenderWatchList({auth, watchlist}){
    return(
        <div className="container">
            <div className="row">
                <Renderdetails auth = {auth} watchlist = {watchlist}/>
            </div>
        </div>
    );
}
export default RenderWatchList;