import React, {Component} from 'react';
import { Card, CardImg, Button} from 'reactstrap';
import '../css/animeDetail.css';

import RenderReview from './renderReviewComponent';
import RenderEpisodes from './renderEpisodeComponent';
import { Link } from 'react-router-dom';




class AnimeDetail extends Component{
    constructor(props){
        super(props);
    }
   
    render(){
       
        var episodes = this.props.animeContent.episodes.data;
        var reviews = this.props.animeContent.reviews.data;
        var streamingLinks = this.props.animeContent.streamingLinks.data;
        if(reviews){
            if(reviews.length > 3){
                reviews = reviews.slice(0,3);
            }
             
             
        }
        const anime=  this.props.anime;
      
        return(
            <div >
                <div  >
                    <div className="animeDetail" style={{backgroundImage:` linear-gradient(to right bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${anime.attributes.coverImage.original})`}}> 
                        <div  style={{height: "300px"}}></div>
                        <div className="animeContainer ">
                            <div className="container-fluid">
                                <div className="row mt-5">
                                    <div className="col-12 col-md-4 mt-3">
                                        <Card >
                                            <CardImg src={anime.attributes.posterImage.original} alt="anime poster" />
                                        </Card>
                                    </div>
                               
                                <div className="col col-md-8">
                              
                                <div className="container-fluid" id="main-content">
                                    <div className="row justify-content-center">
                                        <div className="col mt-4 mb-2">
                                            <h1 style={{color:' #f32227', fontWeight: 'bold'}}>
                                                {anime.attributes.canonicalTitle}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="row mt-1 mb-1">
                                        <div className="col-12 col-md-6 ">
                                            <p >Favourite Count: <span style={{fontWeight: 'bold'}}>{anime.attributes.favoritesCount}</span></p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <p >Average Count: <span style={{fontWeight: 'bold'}}>{anime.attributes.averageRating}</span></p>
                                        </div>
                                        
                                    </div>
                                    <div className="row mt-1 mb-1">
                                        <div className="col-12 col-md-6 ">
                                            <p >Start Date: <span style={{fontWeight: 'bold'}}>{anime.attributes.startDate}</span></p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <p >End Date: <span style={{fontWeight: 'bold'}}>{anime.attributes.endDate}</span></p>
                                        </div>
                                        
                                    </div>
                                    <div className="row mt-1 mb-1">
                                        <div className="col-12 col-md-6 ">
                                            <p >Status: <span style={{fontWeight: 'bold'}}>{anime.attributes.status}</span></p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* <Link to="/watchlist" > */}
                                                <Button className="btn" style={{background: '#f32227'}}>Add to List</Button>
                                            {/* </Link> */}
                                            
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div id="synopsis">
                                    <div className="container-fluid">
                                        <div className="row mt-3 mb-3">
                                            <div className="col-12">
                                                <h3>Synopsis</h3>
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>{anime.attributes.synopsis}</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                      
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="row mt-5">
                            <RenderReview reviews = {reviews}/>
                        </div>
                        <div>
                            <RenderEpisodes episodes ={episodes} streamingLinks = {streamingLinks} />
                        </div>
                        </div>
                        
                       
                       
                        
                    
                </div>
            </div>
            
        );
    }
}

export default AnimeDetail;