import React from 'react';
import { Button, Card,CardBody,CardImg, CardTitle,CardSubtitle  } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderItem({item}){
    return(
        <>
            <div>
           
           <Card height="700px" >
               <CardImg height="500px" src={item.attributes.posterImage.original} alt="poster" />
               <CardBody >
                   <CardTitle styl={{fontSize: '25px'}}>{item.attributes.canonicalTitle}</CardTitle>
                   <CardSubtitle className="text-muted" style={{fontSize: '12px'}}>Episode: {item.attributes.episodeCount}/ Age rating: {item.attributes.ageRatingGuide}</CardSubtitle>
                   
               </CardBody>
           </Card>
          
       </div>
        </>
    );

}
function Renderwatchlist({watchlist}){
    return watchlist.data.map((item) => {
        return <RenderItem item ={item} />
    })
}

function Renderdetails({auth, watchlist}){
    console.log(watchlist," watchlist component");
    // if(auth.isAuthenticated){
    //     if(watchlist.data.length > 0 )
    //    {    
           
    //        return(
    //             <div>
    //                 <h2>Hello {auth.user.username}, Here is your watchlist</h2>
    //                 <Renderwatchlist watchlist= {watchlist} />
    //             </div>
    //         );
    //     }
    //     else{
    //         return(
    //             <div>
    //                 Loading Watchlist
    //             </div>
    //         );
    //     }
    // }
    // else{
    //     return(
    //         <div style={{textAlign: 'center'}}>

    //             <h1>Looks like you are not logged in!</h1>
    //             <Link to="/home">
    //                 <Button className="btn btn-info">Click to go to home-page</Button>
    //             </Link>
    //         </div>
    //     );
    // }
}

function RenderWatchList({auth, watchList}){
   
    return(

        <div className="container">
            <div className="row">
                <Renderdetails auth = {auth} watchlist = {watchList}/>
            </div>
        </div>
    );
}
export default RenderWatchList;