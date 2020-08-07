import React from 'react';
import { Button, Card,CardBody,CardImg, CardTitle,CardSubtitle  } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderItem({item,removeWatchList}){


    function handleOnClick(animeId){
       removeWatchList(animeId);
    }

    return(
        <>
            <div >
           
           <Card height="700px" >
               <CardImg height="500px" src={item.attributes.posterImage.original} alt="poster" />
               <CardBody >
                   <CardTitle styl={{fontSize: '25px'}}>{item.attributes.canonicalTitle}</CardTitle>
                   <CardSubtitle className="text-muted" style={{fontSize: '12px'}}>Episode: {item.attributes.episodeCount}/ Age rating: {item.attributes.ageRatingGuide}</CardSubtitle>
                   <Button value = {item.id} onClick={e => handleOnClick(e.target.value)} className="btn btn-danger mt-2 mb-2">Remove from watchlist</Button>
               </CardBody>
           </Card>
          
       </div>
        </>
    );

}
function Renderwatchlist({watchList,removeWatchList}){
    return watchList.map((item) => {
        return(
            <div className="col-12 col-sm-2 col-md-4 mb-5" key={item.id}>
                <RenderItem item ={item} removeWatchList={removeWatchList}/>
            </div> 
            
        );
    })
}

function Renderdetails({auth, watchList, loading, removeWatchList}){
  
    if(auth.isAuthenticated){
        if(!loading)
        {
            if(watchList.length > 0 )
       {    
           
           return(
                <div>
                    <h2 className="mb-5">Hello {auth.user.username}, Here is your watchlist</h2>
                    <div className="row">
                        <Renderwatchlist watchList= {watchList} removeWatchList={removeWatchList}/>  
                    </div>
                    
                </div>
            );
        }
        else{
            return(
                <div>
                   There is nothing in your watchlist
                </div>
            );
        }
    }
    else{
        return(
            <div>
                Loading Watchlist
            </div>
        );
    }
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

function RenderWatchList({auth, watchList, loading, removeWatchList}){
   
    return(

        <div className="container">
           
                <Renderdetails auth = {auth} watchList = {watchList} loading= {loading} removeWatchList={removeWatchList}/>
          
        </div>
    );
}
export default RenderWatchList;